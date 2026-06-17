import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    price: 'RM 999',
    description: 'Sesuai untuk bisnes kecil atau landing page.',
    features: [
      '1 Page (Landing Page)',
      'Mobile Responsive',
      'Basic SEO',
      'Contact Form',
      '1 Bulan Support'
    ],
    highlight: false
  },
  {
    name: 'Pro',
    price: 'RM 2,499',
    description: 'Pilihan terbaik untuk syarikat yang berkembang.',
    features: [
      'Hingga 5 Pages',
      'UI/UX Design Premium',
      'Advanced SEO',
      'WhatsApp Integration',
      'Speed Optimization',
      '3 Bulan Support'
    ],
    highlight: true
  },
  {
    name: 'Custom',
    price: 'Bermula RM 4k+',
    description: 'Sistem kompleks mengikut keperluan anda.',
    features: [
      'Custom Web App',
      'Database Integration',
      'Payment Gateway',
      'Dashboard Admin',
      'Skalabiliti Tinggi',
      'Support Sepanjang Hayat'
    ],
    highlight: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            Pilih Pakej <span className="text-yellow-500">Pelaburan Anda</span>
          </motion.h2>
          <p className="text-gray-400">Harga telus tanpa kos tersembunyi. Pilih yang terbaik untuk bajet anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                pkg.highlight
                  ? 'bg-linear-to-b from-yellow-500/10 to-blue-500/5 border-yellow-500/50 scale-105 z-10 shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                  : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  Paling Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-white">{pkg.price}</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">{pkg.description}</p>
              
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check size={18} className="text-yellow-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/60123456789?text=Saya berminat dengan pakej ${pkg.name}`}
                className={`block text-center py-4 rounded-xl font-bold transition-all ${
                  pkg.highlight
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Pilih {pkg.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
