import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Sistem Logistik Pintar',
    category: 'Logistics / Warehouse',
    description: 'Sistem pengurusan penghantaran dan inventori yang sistematik untuk syarikat logistik tempatan.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    tags: ['React', 'Node.js', 'Dashboard']
  },
  {
    title: 'Portal Servis Aircond',
    category: 'Service Industry',
    description: 'Website tempahan servis aircond dengan sistem kalendar dan invois automatik.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    tags: ['Booking System', 'Tailwind', 'SEO']
  },
  {
    title: 'E-Commerce Premium',
    category: 'Retail',
    description: 'Kedai online eksklusif dengan integrasi payment gateway dan pengurusan stok.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000',
    tags: ['E-commerce', 'Payment Gateway']
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            Portfolio <span className="text-yellow-500">Terpilih</span>
          </motion.h2>
          <p className="text-gray-400">Beberapa hasil kerja yang telah membantu pelanggan melonjakkan bisnes mereka.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>
              
              <div className="p-6">
                <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">{project.category}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-yellow-500 font-bold hover:text-yellow-400 transition-colors"
                >
                  Lihat Live Site <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
