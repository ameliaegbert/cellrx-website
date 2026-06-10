import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { visualizer } from "rollup-plugin-visualizer";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing storage key");
          return;
        }
        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!forgeBaseUrl || !forgeKey) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Storage proxy not configured");
          return;
        }
        try {
          const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
          forgeUrl.searchParams.set("path", key);
          const forgeResp = await fetch(forgeUrl, {
            headers: { Authorization: `Bearer ${forgeKey}` },
          });
          if (!forgeResp.ok) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Storage backend error");
            return;
          }
          const { url } = (await forgeResp.json()) as { url: string };
          if (!url) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Empty signed URL");
            return;
          }
          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector(), vitePluginStorageProxy(),
  // Bundle analyzer — generates stats.html in dist/ after `pnpm build`
  // Only runs during build, not dev server
  ...(process.env.ANALYZE === 'true' ? [visualizer({ open: false, filename: 'dist/stats.html', gzipSize: true })] : []),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Target modern browsers — avoids legacy JS polyfills (saves ~8KB, fixes Lighthouse legacy-javascript audit)
    // Covers 95%+ of users: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
    target: ["chrome90", "firefox90", "safari15", "edge90"],
    // Merge all CSS into one file — prevents Vite from creating separate CSS chunks
    // (e.g. vendor-markdown.css) that get injected as render-blocking <link> tags on every page
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Stable chunk names — allows us to reference them in index.html for preloading
        chunkFileNames: (chunkInfo) => {
          // Give page chunks stable names based on their source file
          if (chunkInfo.facadeModuleId?.includes("/pages/")) {
            const name = chunkInfo.facadeModuleId.split("/pages/")[1].replace(/\.tsx?$/, "");
            return `pages/${name}-[hash].js`;
          }
          return "assets/[name]-[hash].js";
        },
        // Manual chunk splitting for better caching and smaller initial bundle
        manualChunks(id) {
          // ——————————————————————————————————————————————————————————————————————
          // STRATEGY: Only split truly shared, stable vendor code into named chunks.
          // recharts and streamdown are NOT split — they stay inside their lazy page
          // chunks (Dashboard, BlogPost) so they are NEVER preloaded on the homepage.
          // ——————————————————————————————————————————————————————————————————————

          // React core — changes rarely, cached longest
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // Routing
          if (id.includes("node_modules/wouter")) {
            return "vendor-router";
          }
          // tRPC + React Query — only needed when the app boots (always loaded)
          if (
            id.includes("node_modules/@trpc/") ||
            id.includes("node_modules/@tanstack/react-query") ||
            id.includes("node_modules/superjson")
          ) {
            return "vendor-trpc";
          }
          // UI utilities — tiny class helpers used everywhere
          if (
            id.includes("node_modules/class-variance-authority") ||
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/tailwind-merge")
          ) {
            return "vendor-ui-utils";
          }
          // Icons — large, separate for cache granularity
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          // recharts stays in Dashboard chunk — NOT a named chunk
          // streamdown stays in BlogPost chunk — NOT a named chunk
          // Everything else: let Rollup decide (default splitting)
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
