import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Simple dynamic Open Graph image (no external assets)
export default function OpengraphImage() {
  const title = 'RCP Multiservices';
  const subtitle = "Services à domicile — Île‑de‑France & Normandie";

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0B4EB3', // blue-700 like
          backgroundImage:
            'radial-gradient(1200px 600px at 100% 0%, rgba(255,255,255,0.12), transparent), radial-gradient(800px 400px at 0% 100%, rgba(255,255,255,0.08), transparent)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 40,
            borderRadius: 24,
            border: '2px solid rgba(255,255,255,0.15)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            padding: 80,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -1 }}>{title}</div>
          <div style={{ fontSize: 36, opacity: 0.92 }}>{subtitle}</div>
          <div style={{ marginTop: 8, fontSize: 26, opacity: 0.85 }}>
            Aide à domicile • Ménage • Jardinage • Accompagnement
          </div>
          <div style={{ marginTop: 20, fontSize: 22, opacity: 0.8 }}>
            www.rcp-multiservices.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}