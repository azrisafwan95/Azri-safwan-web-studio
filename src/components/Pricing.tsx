import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    price: 'RM 999',
    description: 'Sesuai untuk bisnes kecil atau landing page produk.',
    features: [
      '1 Page (Landing Page)',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Integrasi WhatsApp Button',
      'Siap dalam 3-5 Hari'
    ],
    highlight: false
  },
  {
    name: 'Business Pro',
    price: 'RM 2,499',
    description: 'Pilihan terbaik untuk syarikat yang mahukan kredibiliti.',
    features: [
      'Hingga 5 Pages (Multi-page)',
      'Custom UI/UX Premium',
      'Advanced Google SEO',
      'Speed Optimization (Laju)',
      'Domain & Hosting Setup',
      '3 Bulan Support'
    ],
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Sistem kompleks mengikut keperluan khas bisnes anda.',
    features: [
      'Custom Web Application',
      'Database & Admin Dashboard',
      'Shopping Cart & Payment',
      'Security Hardening',
      'Maintenance Sepanjang Hayat',
      'Sesi Latihan (Training)'
    ],
    highlight: false
  }
];

const Pricing = () => {
  const phone = "601121281024";

  return (
    <section id="pricing" className="py-24 bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            Pelan <span className="text-yellow-500">Pelaburan</span> Digital
          </motion.h2>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto font-medium">
            Harga telus tanpa kos tersembunyi. Pilih pakej yang sesuai dengan visi bisnes anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                pkg.highlight
                  ? 'bg-gradient-to-b from-yellow-500/10 to-transparent border-yellow-500 scale-105 z-10 shadow-[0_20px_50px_rgba(234,179,8,0.15)]'
                  : 'bg-[#14151a] border-white/5 hover:border-white/20'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star size={12} fill="currentColor" /> Paling Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-sm font-black text-yellow-500 uppercase tracking-[0.2em] mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white tracking-tighter italic">{pkg.price}</span>
                  {pkg.price !== 'Custom' && <span className="text-gray-600 text-xs font-bold uppercase">/Project</span>}
                </div>
                <p className="text-gray-500 text-xs mt-4 font-medium leading-relaxed">{pkg.description}</p>
              </div>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300 text-xs font-semibold">
                    <Check size={16} className="text-yellow-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${phone}?text=Salam Azri, saya berminat dengan pakej ${pkg.name} Studio anda.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  pkg.highlight
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                Pilih {pkg.name}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                * Harga tidak termasuk kos Domain & Hosting tahunan (untuk pakej Starter)
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
