import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';

const contacts = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'peter@28-talent.com',
    href: 'mailto:peter@28-talent.com',
    description: 'For enquiries and partnerships',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+44 7702 881560',
    href: 'tel:+447702881560',
    description: 'Mon–Fri, 9am–6pm GMT',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '@28Talent',
    href: 'https://www.linkedin.com/company/28talent',
    description: 'Follow for latest roles',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 bg-black">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#600080]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-[0.3em] uppercase block mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Whether you're hiring or looking for your next role, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl gradient-card text-center transition-all duration-500 hover:translate-y-[-2px]"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#600080] to-[#411078] flex items-center justify-center mx-auto mb-5 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{contact.label}</h3>
                <p className="text-purple-300 font-medium text-sm mb-2">{contact.value}</p>
                <p className="text-gray-500 text-xs font-mono">{contact.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
