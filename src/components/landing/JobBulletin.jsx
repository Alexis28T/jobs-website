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
