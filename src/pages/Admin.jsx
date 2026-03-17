import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, X, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const EMPTY_JOB = {
  title: '', company: '', location: '', salary_min: '', salary_max: '',
  currency: 'GBP', category: 'ai_ml', type: 'permanent',
  description: '', tags: '', is_active: true, remote: false,
};

const categoryLabels = {
  ai_ml: 'AI & ML', low_code: 'Low-Code', automation: 'Automation', integration: 'Integration',
};

function JobForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title || !form.company || !form.location) {
      toast.error('Title, company and location are required.');
      return;
    }
    onSave({
      ...form,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
      tags: typeof form.tags === 'string'
        ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : form.tags,
    });
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Job Title *</label>
          <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Senior ML Engineer" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Company *</label>
          <Input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Location *</label>
          <Input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="London, UK" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Category</label>
          <Select value={form.category} onValueChange={(v) => set('category', v)}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ai_ml">AI & ML</SelectItem>
              <SelectItem value="low_code">Low-Code</SelectItem>
              <SelectItem value="automation">Automation</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Salary Min (£)</label>
          <Input type="number" value={form.salary_min} onChange={(e) => set('salary_min', e.target.value)} placeholder="60000" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Salary Max (£)</label>
          <Input type="number" value={form.salary_max} onChange={(e) => set('salary_max', e.target.value)} placeholder="90000" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Type</label>
          <Select value={form.type} onValueChange={(v) => set('type', v)}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="permanent">Permanent</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Currency</label>
          <Select value={form.currency} onValueChange={(v) => set('currency', v)}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="GBP">GBP £</SelectItem>
              <SelectItem value="USD">USD $</SelectItem>
              <SelectItem value="EUR">EUR €</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Tags (comma-separated)</label>
        <Input
          value={typeof form.tags === 'string' ? form.tags : (form.tags || []).join(', ')}
          onChange={(e) => set('tags', e.target.value)}
          placeholder="Python, TensorFlow, AWS"
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div>
        <label className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-1">Description</label>
        <Textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Role overview..." className="bg-white/5 border-white/10 text-white min-h-[80px]" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <button type="button" onClick={() => set('is_active', !form.is_active)}>
            {form.is_active
              ? <ToggleRight size={28} className="text-purple-400" />
              : <ToggleLeft size={28} className="text-gray-500" />}
          </button>
          <span className="text-sm text-gray-300">Active</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <button type="button" onClick={() => set('remote', !form.remote)}>
            {form.remote
              ? <ToggleRight size={28} className="text-emerald-400" />
              : <ToggleLeft size={28} className="text-gray-500" />}
          </button>
          <span className="text-sm text-gray-300">Remote</span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={handleSave} className="bg-gradient-to-r from-[#600080] to-[#411078] text-white font-semibold">
          <Check size={16} className="mr-2" /> Save Role
        </Button>
        <Button variant="outline" onClick={onCancel} className="border-white/10 text-gray-300 hover:bg-white/5">
          <X size={16} className="mr-2" /> Cancel
        </Button>
      </div>
    </div>
  );
}

export default function Admin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null); // null | 'new' | job object
  const [tab, setTab] = useState('jobs'); // 'jobs' | 'cvs'

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => base44.entities.JobListing.list('-created_date', 100),
  });

  const { data: cvs = [], isLoading: cvsLoading } = useQuery({
    queryKey: ['admin-cvs'],
    queryFn: () => base44.entities.CVSubmission.list('-created_date', 100),
  });

  const createJob = useMutation({
    mutationFn: (data) => base44.entities.JobListing.create(data),
    onSuccess: () => { qc.invalidateQueries(['admin-jobs']); setEditing(null); toast.success('Role created!'); },
  });

  const updateJob = useMutation({
    mutationFn: ({ id, data }) => base44.entities.JobListing.update(id, data),
    onSuccess: () => { qc.invalidateQueries(['admin-jobs']); setEditing(null); toast.success('Role updated!'); },
  });

  const deleteJob = useMutation({
    mutationFn: (id) => base44.entities.JobListing.delete(id),
    onSuccess: () => { qc.invalidateQueries(['admin-jobs']); toast.success('Role deleted.'); },
  });

  const updateCV = useMutation({
    mutationFn: ({ id, data }) => base44.entities.CVSubmission.update(id, data),
    onSuccess: () => qc.invalidateQueries(['admin-cvs']),
  });

  const handleSave = (data) => {
    if (editing === 'new') createJob.mutate(data);
    else updateJob.mutate({ id: editing.id, data });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a6df8162e4bf59fb404b3c/fbc477b2b_28T_Purple-b4975b67.png"
              alt="28 Talent"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Admin Panel</h1>
              <p className="font-mono text-[10px] text-purple-400 tracking-wider">28 TALENT · BOAT</p>
            </div>
          </div>
          <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors font-mono">← Back to site</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[{ key: 'jobs', label: `Open Roles (${jobs.length})` }, { key: 'cvs', label: `CV Submissions (${cvs.length})` }].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.key
                  ? 'bg-gradient-to-r from-[#600080] to-[#411078] text-white'
                  : 'text-gray-400 hover:text-white border border-white/10 hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* JOBS TAB */}
        {tab === 'jobs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Job Listings</h2>
              {editing === null && (
                <Button
                  onClick={() => setEditing('new')}
                  className="bg-gradient-to-r from-[#600080] to-[#411078] text-white font-semibold"
                >
                  <Plus size={16} className="mr-2" /> Add Role
                </Button>
              )}
            </div>

            {editing === 'new' && (
              <JobForm initial={EMPTY_JOB} onSave={handleSave} onCancel={() => setEditing(null)} />
            )}

            {jobsLoading ? (
              <div className="space-y-3">{Array(3).fill(0).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/[0.03] animate-pulse" />)}</div>
            ) : (
              jobs.map((job) => (
                <div key={job.id}>
                  {editing?.id === job.id ? (
                    <JobForm
                      initial={{ ...job, tags: (job.tags || []).join(', ') }}
                      onSave={handleSave}
                      onCancel={() => setEditing(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${job.is_active ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{job.title}</p>
                          <p className="text-xs text-gray-500">{job.company} · {job.location}</p>
                        </div>
                        <Badge className="hidden sm:inline-flex bg-white/5 text-gray-400 border-white/10 font-mono text-[10px]">
                          {categoryLabels[job.category]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <button
                          onClick={() => setEditing(job)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => { if (window.confirm('Delete this role?')) deleteJob.mutate(job.id); }}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* CVS TAB */}
        {tab === 'cvs' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">CV Submissions</h2>
            {cvsLoading ? (
              <div className="space-y-3">{Array(3).fill(0).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/[0.03] animate-pulse" />)}</div>
            ) : cvs.length === 0 ? (
              <p className="text-gray-500 font-mono text-sm">No submissions yet.</p>
            ) : (
              cvs.map((cv) => (
                <div key={cv.id} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{cv.full_name}</p>
                      <p className="text-xs text-gray-500">{cv.email}{cv.phone ? ` · ${cv.phone}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Select
                        value={cv.status || 'new'}
                        onValueChange={(v) => updateCV.mutate({ id: cv.id, data: { status: v } })}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      {cv.file_url && (
                        <a
                          href={cv.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 font-mono underline underline-offset-2"
                        >
                          View CV
                        </a>
                      )}
                    </div>
                  </div>
                  {cv.message && <p className="text-xs text-gray-400 italic">"{cv.message}"</p>}
                  <p className="font-mono text-[10px] text-gray-600">
                    {new Date(cv.created_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
