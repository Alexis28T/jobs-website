import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, X, Mail, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function CVUploadSection() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (f) => {
    setFileError('');
    if (!ALLOWED_TYPES.includes(f.type)) {
      setFileError('Please upload a PDF or Word document.');
      return false;
    }
    if (f.size > MAX_SIZE) {
      setFileError('File must be under 5MB.');
      return false;
    }
    return true;
  };

  const handleFile = (f) => {
    if (validateFile(f)) {
      setFile(f);
      setFileError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email) {
      toast.error('Please fill in your name and email.');
      return;
    }
    setSubmitting(true);

    let file_url = '';
    if (file) {
      const res = await base44.integrations.Core.UploadFile({ file });
      file_url = res.file_url;
    }

    await base44.entities.CVSubmission.create({
      ...formData,
      file_url,
    });

    await base44.integrations.Core.SendEmail({
      to: 'peter@28-talent.com',
      subject: `New CV Submission – ${formData.full_name}`,
      body: `A new CV has been submitted via the 28 Talent website.\n\nName: ${formData.full_name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message || 'No message provided'}\n\n${file_url ? `CV Download: ${file_url}` : 'No file uploaded'}`,
    });

    setSubmitted(true);
    setSubmitting(false);
    toast.success('CV submitted successfully!');
  };

  if (submitted) {
    return (
      <section id="cv-upload" className="relative py-32 bg-black">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#600080]/30 to-transparent" />
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#600080] to-[#411078] flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={36} className="text-white" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Thank You!</h3>
            <p className="text-gray-400 text-lg mb-8">
              Your CV has been received. Our team will review it and be in touch soon.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFile(null); setFormData({ full_name: '', email: '', phone: '', message: '' }); }}
              className="px-6 py-3 border border-white/15 text-white rounded-xl hover:bg-white/5 transition-colors font-medium"
            >
              Submit Another
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="cv-upload" className="relative py-32 bg-black">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#600080]/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-[0.3em] uppercase block mb-4">
            Join Our Network
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Submit Your <span className="gradient-text">CV</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Upload your CV and let us match you with the perfect BOAT role. We'll be in touch within 48 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Upload area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
              dragOver
                ? 'border-[#600080] bg-[#600080]/10'
                : file
                ? 'border-green-500/30 bg-green-500/5'
                : fileError
                ? 'border-red-500/30 bg-red-500/5'
                : 'border-white/10 bg-white/[0.02] hover:border-[#600080]/40 hover:bg-[#600080]/5'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText size={24} className="text-green-400" />
                <span className="text-white font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#600080]/20 to-[#411078]/20 flex items-center justify-center mx-auto mb-4">
                  <Upload size={28} className="text-purple-400" />
                </div>
                <p className="text-white font-semibold mb-1">
                  Drag & drop your CV here
                </p>
                <p className="text-gray-500 text-sm">
                  or <span className="text-purple-400 underline underline-offset-2">click to browse</span>
                </p>
                <p className="font-mono text-[11px] text-gray-600 mt-3">
                  PDF or Word • Max 5MB
                </p>
              </>
            )}
            {fileError && (
              <div className="flex items-center justify-center gap-2 mt-3 text-red-400 text-sm">
                <AlertCircle size={14} />
                {fileError}
              </div>
            )}
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">Name *</label>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
                className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-[#600080]"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-[#600080]"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7XXX XXXXXX"
                className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-[#600080]"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">Send Directly</label>
              <a
                href="mailto:peter@28-talent.com"
                className="flex items-center gap-2 h-12 px-4 rounded-xl border border-white/10 bg-white/[0.03] text-purple-400 hover:bg-[#600080]/10 hover:border-[#600080]/30 transition-all"
              >
                <Mail size={16} />
                <span className="text-sm">peter@28-talent.com</span>
              </a>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">Message</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your experience and what you're looking for..."
              className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-[#600080] min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-14 bg-gradient-to-r from-[#600080] to-[#411078] text-white font-bold text-base rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Your CV'}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
