import React, { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    // Set favicon
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a6df8162e4bf59fb404b3c/fbc477b2b_28T_Purple-b4975b67.png';
    document.getElementsByTagName('head')[0].appendChild(link);

    // Set page title
    document.title = '28 Talent | BOAT Recruitment';
  }, []);

  return <>{children}</>;
}
