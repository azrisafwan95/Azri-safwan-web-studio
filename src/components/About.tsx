import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Truck } from 'lucide-react';

const About = ({ t }: any) => {
  const stats = [
    { icon: Award, label: t.stat1, value: 'PREMIUM' },
    { icon: Truck, label: t.stat2, value: '100%' },
    { icon: ShieldCheck, label: t.stat3, value: 'PAKAR' },
    { icon: Zap, label: t.stat4, value: 'MODEN' },
  ];

  return (
    <section id="about" className="py-24 bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase italic">
              {t.title} <span className="text-yellow-500">{t.titleGold}</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg font-medium">{t.story}</p>
            <p className="text-gray-400 mb-8 leading-relaxed">{t.vision}</p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="p-5 bg-white/5 border border-white/5 rounded-3xl group">
                  <stat.icon className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="text-xl font-black text-white tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-yellow-500/20 shadow-2xl">
              <img src="/azri-safwan.jpg" alt="Founder" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow-500 p-6 rounded-3xl shadow-2xl rotate-3 hidden md:block">
              <p className="text-black font-black text-xs uppercase tracking-widest leading-none">Founder & Lead Dev</p>
              <h4 className="text-black font-black text-xl italic uppercase tracking-tighter">Azri Safwan</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;