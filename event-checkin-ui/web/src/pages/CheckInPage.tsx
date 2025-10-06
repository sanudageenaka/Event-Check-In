import React, { useState } from 'react';
import { api } from '../lib/api';
import  BarcodeScannerComponent  from 'react-qr-barcode-scanner';

export default function CheckInPage() {
  const [manualRef, setManualRef] = useState('');
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(ref: string) {
    setError(null);
    setMessage(null);
    try {
      const res = await api('/checkin', {
        method: 'POST',
        body: JSON.stringify({ reference: ref }),
      });
      setMessage(`✅ Checked in: ${res.reference} (${res.type}) at ${new Date(res.checkedInAt).toLocaleTimeString()}`);
      setLastScan(ref);
    } catch (e: any) {
      setError(`❌ ${e.message}`);
    }
  }

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>Check-In</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 12 }}>
          <h3>Scan QR Code</h3>
          <p className="muted">Allow camera permission. Hold a QR with the ticket reference.</p>

          <div style={{ width: '100%', maxWidth: 520 }}>
            <BarcodeScannerComponent
              width={520}
              height={360}
              facingMode="environment"
              onUpdate={(err, result) => {
                // result may be a ZXing Result object; support both .getText() and .text
                const text =
                  (result && ((result as any).getText ? (result as any).getText() : (result as any).text)) || '';
                if (text && text !== lastScan) {
                  submit(text);
                }
                // ignore transient init errors
              }}
            />
          </div>
        </div>

        <div className="card" style={{ padding: 12 }}>
          <h3>Type Reference Manually</h3>
          <input
            value={manualRef}
            onChange={(e) => setManualRef(e.target.value)}
            placeholder="Paste or type ticket reference"
            style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}
          />
          <button className="btn" onClick={() => submit(manualRef)} disabled={!manualRef}>
            Check In
          </button>
        </div>
      </div>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      {error && <p style={{ marginTop: 12, color: 'crimson' }}>{error}</p>}
    </div>
  );
}
