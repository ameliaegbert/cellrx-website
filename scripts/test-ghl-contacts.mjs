import 'dotenv/config';

const apiKey = process.env.GHL_API_KEY;
const locationId = process.env.GHL_LOCATION_ID;

// GHL v2 contacts API - paginate and filter by dateAdded client-side
async function getAllRecentContacts(daysBack = 30) {
  const cutoff = Date.now() - daysBack * 24 * 60 * 60 * 1000;
  let page = 1;
  let recentCount = 0;
  let totalFetched = 0;
  let keepGoing = true;

  while (keepGoing) {
    const url = `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=100&sortBy=date_added&page=${page}`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-07-28' },
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json();
    const contacts = data?.contacts ?? [];
    if (contacts.length === 0) break;

    for (const c of contacts) {
      const added = new Date(c.dateAdded).getTime();
      if (added >= cutoff) {
        recentCount++;
        console.log(` + ${c.firstName || ''} ${c.lastName || ''} | ${c.dateAdded} | source: ${c.source || 'none'}`);
      } else {
        keepGoing = false; // contacts are sorted oldest first, so once we hit old ones we can stop
        break;
      }
    }
    totalFetched += contacts.length;
    page++;
    if (totalFetched >= (data?.meta?.total ?? 0)) break;
  }

  console.log(`\nTotal contacts in CRM: ${(await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`, { headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-07-28' } }).then(r => r.json()))?.meta?.total}`);
  console.log(`New contacts in last ${daysBack} days: ${recentCount}`);
}

console.log('=== New contacts last 30 days ===');
await getAllRecentContacts(30).catch(e => console.log('FAIL:', e.message));
