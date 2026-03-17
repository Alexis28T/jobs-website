import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a6df8162e4bf59fb404b3c/fbc477b2b_28T_Purple-b4975b67.png"
              alt="28 Talent"
              className="w-8 h-8 object-contain"
            />
            <div>
              <span className="text-white font-bold text-sm">28 Talent</span>
              <span className="font-mono text-[9px] text-gray-500 ml-2 tracking-wider">BOAT RECRUITMENT</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['Services', 'Jobs', 'Submit CV', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => {
                  const id = link.toLowerCase().replace(' ', '-').replace('submit-cv', 'cv-upload');
                  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-[11px] text-gray-600">
            © {new Date().getFullYear()} 28 Talent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
