import { ImageResponse } from 'next/og';
import data from '@/data/locations.json';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

type Props = { params: { region: string; city: string } };

export default function TwitterImage({ params }: Props) {
  const match = findCity(params.region, params.city);
  const cityName = match?.city.name ?? 'Zone';
  const deptName = match?.department.name ?? 'Services à domicile';

  const title = `RCP Multiservices`;
  const subtitle = `Services à domicile à ${cityName}`;
  const line = deptName;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0B4EB3',
          backgroundImage:
            'radial-gradient(1200px 600px at 100% 0%, rgba(255,255,255,0.12), transparent), radial-gradient(800px 400px at 0% 100%, rgba(255,255,255,0.08), transparent)',
          color: 'white',
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
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
            gap: 22,
            padding: 80,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1 }}>{title}</div>
          <div style={{ fontSize: 44, opacity: 0.95 }}>{subtitle}</div>
          <div style={{ fontSize: 30, opacity: 0.9 }}>{line}</div>
          <div style={{ marginTop: 12, fontSize: 22, opacity: 0.82 }}>
            Aide • Ménage • Jardinage • Accompagnement
          </div>
          <div style={{ marginTop: 8, fontSize: 20, opacity: 0.78 }}>
            www.rcp-multiservices.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

function findCity(regionKey: string, citySlug: string) {
  for (const region of (data as any).regions) {
    if (region.key !== regionKey) continue;
    for (const department of region.departments) {
      for (const city of department.cities) {
        if (city.slug === citySlug) {
          return { region, department, city };
        }
      }
    }
  }
  return null;
}