
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QR({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, { width: 56 });
    }
  }, [text]);
  return <canvas ref={canvasRef} />;
}
