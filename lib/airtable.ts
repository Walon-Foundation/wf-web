const BASE_URL = 'https://api.airtable.com/v0';

export async function createAirtableRecord(
  fields: Record<string, string>
): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_NAME ?? 'Bookings';

  if (!apiKey || !baseId) return;

  await fetch(`${BASE_URL}/${baseId}/${encodeURIComponent(tableId)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields }] }),
  });
}
