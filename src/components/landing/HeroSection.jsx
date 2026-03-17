import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#600080]/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#411078]/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#600080]/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#600080]/30 bg-[#600080]/10 mb-8"
        >
          <Zap size={14} className="text-purple-400" />
          <span className="font-mono text-xs text-purple-300 tracking-wider uppercase">
            Specialist BOAT Recruitment
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6"
        >
          Business
          <br />
          <span className="gradient-text">Orchestration</span>
          <br />
          & Automation
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-4"
        >
          We connect exceptional talent with forward-thinking companies in
          <span className="text-white font-semibold"> AI, Low-Code, Automation </span>
          and <span className="text-white font-semibold">Integration Technologies</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-mono text-sm text-purple-400/70 tracking-wider mb-12"
        >
          BOAT — Business Orchestration & Automation Technologies
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.querySelector('#jobs')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-[#600080] to-[#411078] text-white font-bold text-base rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            Browse Open Roles
          </button>
          <button
            onClick={() => document.querySelector('#cv-upload')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/15 text-white font-semibold text-base rounded-xl hover:bg-white/5 hover:border-white/25 transition-all duration-300 w-full sm:w-auto"
          >
            Submit Your CV
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-70 transition-opacity"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
            <ArrowDown size={16} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
