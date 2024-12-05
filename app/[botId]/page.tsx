'use client';
import Script from 'next/script';
import { use } from 'react';

const MODES = ['Fullpage', 'Livechat', 'Native'];

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ botId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { botId } = use(params);
  const { mode = 'Fullpage' } = use(searchParams);

  return (
    <Script
      type="module"
      src="https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs"
      onLoad={() => {
        if (MODES.includes(mode)) {
          //@ts-ignore
          new window.Landbot[mode]({
            configUrl: `https://storage.googleapis.com/landbot.pro/v3/${botId}/index.json`,
          });
        }
      }}
    />
  );
}
