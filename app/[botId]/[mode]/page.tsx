'use client';
import Script from 'next/script';
import { use } from 'react';

const MODES = ['Fullpage', 'Livechat', 'Native'];

export default function Page({ params }: { params: Promise<{ botId: string; mode: string }> }) {
  const { botId, mode = 'Fullpage' } = use(params);

  return (
    <Script
      type="module"
      src="https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs"
      crossOrigin="anonymous"
      onLoad={() => {
        if (MODES.includes(mode)) {
          //@ts-expect-error: Landbot instance
          new window.Landbot[mode]({
            configUrl: `https://storage.googleapis.com/landbot.pro/v3/${botId}/index.json`,
          });
        }
      }}
    />
  );
}
