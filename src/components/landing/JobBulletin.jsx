import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Banknote, Clock, Briefcase, ArrowUpRight, Wifi } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const categories = [
  { key: 'all', label: 'All Roles' },
  { key: 'ai_ml', label: 'AI & ML' },
  { key: 'low_code', label: 'Low-Code' },
  { key: 'automation', label: 'Automation' },
  { key: 'integration', label: 'Integration' },
];

const categoryLabels = {
  ai_ml: 'AI & ML',
  low_code: 'Low-Code',
  automation: 'Automation',
  integration: 'Integration',
};

const categoryColors = {
  ai_ml: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300',
  low_code: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300',
  automation: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-300',
  integration: 'from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-300',
};

function formatSalary(min, max, currency) {
  const sym = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
  const fmtNum = (n) => n >= 1000 ? `${Math.round(n / 1000)}k` : n;
  if (min && max) return `${sym}${fmtNum(min)} – ${sym}${fmtNum(max)}`;
  if (min) return `From ${sym}${fmtNum(min)}`;
  if (max) return `Up to ${sym}${fmtNum(max)}`;
  return 'Competitive';
}

function JobCard({ job, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative p-6 rounded-2xl gradient-card transition-all duration-500 hover:translate-y-[-2px] cursor-pointer"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#600080]/5 to-[#411078]/10" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border bg-gradient-to-r ${categoryColors[job.category]}`}>
                {categoryLabels[job.category]}
              </span>
              {job.remote && (
                <span className="flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Wifi size={10} /> Remote
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-1">{job.company}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#600080]/20">
            <ArrowUpRight size={14} className="text-purple-400" />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-500" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Banknote size={14} className="text-gray-500" />
            {formatSalary(job.salary_min, job.salary_max, job.currency)}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={14} className="text-gray-500" />
            <span className="capitalize">{job.type}</span>
          </span>
        </div>

        {/* Tags */}
        {job.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {job.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function JobBulletin() {
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => base44.entities.JobListing.filter({ is_active: true }),
  });

  const filtered = activeFilter === 'all'
    ? jobs
    : jobs.filter((j) => j.category === activeFilter);

  return (
    <section id="jobs" className="relative py-32 bg-black">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#600080]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-[0.3em] uppercase block mb-4">
            Opportunities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Open <span className="gradient-text">Roles</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Curated BOAT positions at top-tier companies. Your next career move starts here.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`font-mono text-xs px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeFilter === cat.key
                  ? 'bg-gradient-to-r from-[#600080] to-[#411078] border-[#600080]/50 text-white shadow-lg shadow-purple-500/15'
                  : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-white/[0.02]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Job grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="font-mono text-sm">No roles found in this category.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
