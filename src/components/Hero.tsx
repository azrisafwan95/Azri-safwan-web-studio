import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';

const Hero = () => {
  const whatsappLink = "https://wa.me/601121281024";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0b]">
      {/* Background decoration - Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500 bg-yellow-500/5 border border-yellow-500/20 rounded-full">
            Web Development Untuk Usahawan IKS
          </span>
          
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] italic uppercase">
            Bina Kehadiran Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-600">
              Yang Luar Biasa
            </span>
          </h1>
          
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Azri Safwan Web Studio menggabungkan teknologi terkini dengan rekaan premium untuk memastikan bisnes anda menonjol, dipercayai, dan menghasilkan jualan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#portfolio"
              className="group bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 shadow-[0_20px_40px_rgba(234,179,8,0.2)]"
            >
              Lihat Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all backdrop-blur-sm"
            >
              Sembang Projek
            </a>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto border-t border-white/5 pt-12"
        >
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
              <Zap className="text-yellow-500" size={24} />
            </div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Pantas & Ringan</h4>
            <p className="text-gray-500 text-xs mt-1">Satu saat untuk loading</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
              <Smartphone className="text-yellow-500" size={24} />
            </div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Mobile Friendly</h4>
            <p className="text-gray-500 text-xs mt-1">Cantik di semua skrin</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
              <Shield className="text-yellow-500" size={24} />
            </div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Selamat & Stabil</h4>
            <p className="text-gray-500 text-xs mt-1">Hosting gred premium</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
