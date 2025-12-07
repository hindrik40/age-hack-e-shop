'use client';

export default function DebugImages() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Debug: Kvinnobilder</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 16 }}>Ung</h2>
          <img src="/images/young.svg" alt="Ung kvinna" style={{ width: '100%', height: 240, objectFit: 'cover', border: '1px solid #ccc', borderRadius: 12 }} />
        </div>
        <div>
          <h2 style={{ fontSize: 16 }}>Medelålder</h2>
          <img src="/images/middle.svg" alt="Medelålders kvinna" style={{ width: '100%', height: 240, objectFit: 'cover', border: '1px solid #ccc', borderRadius: 12 }} />
        </div>
        <div>
          <h2 style={{ fontSize: 16 }}>Senior</h2>
          <img src="/images/senior.svg" alt="Senior kvinna" style={{ width: '100%', height: 240, objectFit: 'cover', border: '1px solid #ccc', borderRadius: 12 }} />
        </div>
      </div>
      <p style={{ marginTop: 16, color: '#555' }}>Om du inte ser bilderna här är problemet med statiska filer eller filvägar.</p>
    </div>
  );
}