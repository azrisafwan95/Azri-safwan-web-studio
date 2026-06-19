import { motion } from 'framer-motion';
import { User, Award, ShieldCheck, Zap, Truck } from 'lucide-react';

const stats = [
  { icon: Award, label: 'Kualiti Hasil', value: 'PREMIUM' },
  { icon: Truck, label: 'Dedikasi Kerja', value: '100%' },
  { icon: ShieldCheck, label: 'Sokongan Terus', value: 'PAKAR' },
  { icon: Zap, label: 'Teknologi', value: 'MODEN' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase italic">
              Di Sebalik <span className="text-yellow-500">Azri Safwan Studio</span>
            </h2>
            
            <p className="text-gray-300 mb-6 leading-relaxed text-lg font-medium">
              Saya Azri Safwan. Siang saya memandu lori mengadap jalan raya, malam saya bekerja di Texas Chicken. Namun, di celah-celah kesibukan itu, saya membina minat mendalam dalam dunia pembangunan web.
            </p>
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              Saya percaya bahawa kerja keras dan kualiti adalah kunci segalanya. Jika saya boleh menguruskan lori seberat 10 tan dengan teliti, saya juga boleh menguruskan projek website anda dengan penuh dedikasi. Di Azri Safwan Studio, saya membina website yang bukan sekadar cantik, tetapi menjadi alat untuk menjana jualan untuk bisnes anda.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="p-5 bg-white/5 border border-white/5 rounded-3xl hover:border-yellow-500/30 transition-colors group">
                  <stat.icon className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="text-xl font-black text-white tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
              <img
                src="/azri-safwan.jpg" 
                alt="Azri Safwan - Founder"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            
            {/* Badge Floating */}
            <div className="absolute -bottom-6 -left-6 bg-yellow-500 p-6 rounded-3xl shadow-2xl rotate-3 hidden md:block">
              <p className="text-black font-black text-xs uppercase tracking-widest leading-none">Founder & Lead Dev</p>
              <h4 className="text-black font-black text-xl italic uppercase tracking-tighter">Azri Safwan</h4>
            </div>

            {/* Decorative Ambient Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
