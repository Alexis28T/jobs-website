import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Blocks, Cog, Network } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Recruiting data scientists, ML engineers, NLP specialists, and AI architects who build intelligent systems that transform business operations.',
    tags: ['Data Science', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
  },
  {
    icon: Blocks,
    title: 'Low-Code / No-Code',
    description: 'Sourcing platform experts in Power Platform, Mendix, OutSystems, and Bubble who accelerate digital transformation through rapid application development.',
    tags: ['Power Platform', 'Mendix', 'OutSystems', 'Bubble', 'Appian'],
  },
  {
    icon: Cog,
    title: 'Business Process Automation',
    description: 'Finding RPA developers, process consultants, and automation architects who streamline workflows with UiPath, Blue Prism, and Automation Anywhere.',
    tags: ['RPA', 'UiPath', 'Blue Prism', 'Process Mining', 'Workflow'],
  },
  {
    icon: Network,
    title: 'Integration & Orchestration',
    description: 'Connecting companies with MuleSoft, Boomi, and Workato specialists who build seamless integrations across complex enterprise ecosystems.',
    tags: ['MuleSoft', 'Boomi', 'Workato', 'API Design', 'iPaaS'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 bg-black">
      {/* Subtle gradient backdrop */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#600080]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#600080]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-purple-400 tracking-[0.3em] uppercase block mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            BOAT <span className="gradient-text">Specialisms</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Deep expertise across the four pillars of Business Orchestration & Automation Technologies.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="group relative p-8 rounded-2xl gradient-card transition-all duration-500 hover:translate-y-[-2px]"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#600080]/0 to-[#411078]/0 group-hover:from-[#600080]/5 group-hover:to-[#411078]/10 transition-all duration-500" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#600080] to-[#411078] flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
