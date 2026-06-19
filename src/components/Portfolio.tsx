import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'LoriKita Logistics',
    category: 'Logistik & Pengangkutan',
    description: 'Landing page profesional khas untuk syarikat lori sewa. Rekaan yang gagah dan fokus kepada kredibiliti bisnes.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    tags: ['React', 'Tailwind', 'Mobile Friendly'],
    link: 'https://lorikita-landingpage.vercel.app/'
  },
  {
    title: 'FreshService Aircond',
    category: 'Servis Kediaman',
    description: 'Website perkhidmatan aircond dan cuci rumah dengan rupa paras yang segar, bersih, dan mesra pengguna.',
    image: 'technician-man.jpg',
    tags: ['Service Landing', 'WhatsApp API', 'Clean UI'],
    link: 'https://fresh-service-landing-page.vercel.app/'
  },
  {
    title: 'Luxury E-Commerce',
    category: 'Kedai Online Premium',
    description: 'Sistem kedai online eksklusif dengan fungsi Shopping Cart dan pesanan terus ke WhatsApp penjual.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000',
    tags: ['E-commerce', 'Shopping Cart', 'Luxury Vibe'],
    link: 'https://ecommerce-gold-omega-65.vercel.app/'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            Portfolio <span className="text-yellow-500">Terpilih</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto font-medium">
            Hasil kerja berkualiti tinggi yang telah membantu usahawan melonjakkan kehadiran digital mereka.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#14151a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/40 transition-all duration-500 shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14151a] via-transparent to-transparent opacity-90" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter italic leading-none">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed font-medium">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-yellow-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors group/link"
                >
                  Lihat Live Site <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
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
