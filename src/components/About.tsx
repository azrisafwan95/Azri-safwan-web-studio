import { motion } from 'framer-motion';
import { User, Award, Coffee, Code } from 'lucide-react';

const stats = [
  { icon: Award, label: 'Projek Selesai', value: '50+' },
  { icon: Coffee, label: 'Kopi Dihirup', value: '∞' },
  { icon: User, label: 'Pelanggan Puas', value: '40+' },
  { icon: Code, label: 'Tahun Pengalaman', value: '5+' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Di Sebalik <span className="text-yellow-500">Azri Safwan Studio</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Saya Azri Safwan, seorang Full-Stack Web Developer yang komited untuk membantu perniagaan tempatan berkembang di dunia digital. Dengan pengalaman lebih 5 tahun, saya percaya website bukan sekadar "ada", tetapi mestilah menjadi alat untuk menjana keuntungan.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Kepakaran saya merangkumi pembangunan React, Node.js, dan optimasi SEO untuk memastikan website anda bukan sahaja cantik, tetapi juga berprestasi tinggi di Google.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <stat.icon className="text-yellow-500 mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-yellow-500/20">
              <img
                src="azri-safwan.jpg"
                alt="Azri Safwan"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
