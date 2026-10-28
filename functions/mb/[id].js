const ALLOWED = new Set([
  '6f1b308f-112c-4690-8fab-486bd6e5abcd',
  '76006360-1bf6-4c73-ae7d-986c6fcb7be7',
  '9841cb62-3e42-4c5d-acdd-ed6b3da1d3f3',
  '44bd6515-814a-49fb-a0ce-ce169587fe79',
  '2145aa50-a36e-402f-8f18-51e54fd329e2',
  '6b811f27-b5db-43ef-b0e1-db06de37d627',
  'e205fce9-3b3c-4f30-b6e8-02559ac43aa4',
  'c8ae5479-db8e-499c-84a4-29d3bcf73745',
  '7d9b3c18-3be0-4862-afed-c85307f62673',
  'ea279495-ea79-4802-a43c-7cfec8350eb5',
  '9126c381-ae08-4f31-bc4a-cb97ab65aa33',
  'bc7eb357-8b8b-4ea2-ba72-d47134cf8a42'
]);

export async function onRequestGet({ params }) {
  const id = String(params.id || '').replace(/\.csv$/, '');
  if (!ALLOWED.has(id)) return new Response('Not allowed', { status: 403 });
  const upstream = await fetch(`https://analytics.riden.app/public/question/${id}.csv`, {
    cf: { cacheTtl: 0, cacheEverything: false },
    headers: { 'Accept': 'text/csv' }
  });
  if (!upstream.ok) return new Response(`Metabase returned ${upstream.status}`, { status: 502 });
  return new Response(await upstream.text(), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}
