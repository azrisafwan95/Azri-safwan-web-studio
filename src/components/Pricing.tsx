import { motion } from 'framer-motion';
import { Check, Star, Gift } from 'lucide-react';

const Pricing = ({ t }: any) => {
  const phone = "601121281024";
  const packages = [
    { ...t.starter, highlight: false },
    { ...t.business, highlight: true },
    { ...t.ecommerce, highlight: false }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.9 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-[10px] font-black uppercase tracking-widest"><Gift size={12} /> {t.promo}</motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">{t.title} <span className="text-yellow-500">{t.titleGold}</span></h2>
        <p className="text-gray-400 max-w-xl mx-auto font-medium text-sm mb-20">{t.desc}</p>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <div key={index} className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${pkg.highlight ? 'bg-gradient-to-b from-yellow-500/10 to-transparent border-yellow-500 scale-105 z-10 shadow-2xl' : 'bg-[#14151a] border-white/5'}`}>
              {pkg.highlight && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"><Star size={12} fill="currentColor" /> Paling Popular</div>}
              <div className="mb-8 text-left">
                <h3 className="text-sm font-black text-yellow-500 uppercase tracking-[0.2em] mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-1"><span className="text-5xl font-black text-white tracking-tighter italic">{pkg.price}</span><span className="text-gray-600 text-xs font-bold uppercase">{t.perProject}</span></div>
                <p className="text-gray-500 text-[11px] mt-4 font-medium leading-relaxed">{pkg.desc}</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow text-left">
                {pkg.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300 text-[11px] font-bold uppercase tracking-tight"><Check size={16} className="text-yellow-500 shrink-0" />{feature}</li>
                ))}
              </ul>
              <a href={`https://wa.me/${phone}?text=Salam Azri, saya berminat dengan pakej ${pkg.name} Studio anda.`} target="_blank" className={`block text-center py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${pkg.highlight ? 'bg-yellow-500 text-black shadow-lg' : 'bg-white/5 text-white border border-white/10'}`}>Pilih {pkg.name}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;