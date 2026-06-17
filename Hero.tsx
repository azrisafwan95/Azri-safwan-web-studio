import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-yellow-500 uppercase bg-yellow-500/10 rounded-full border border-yellow-500/20">
            Professional Web Development
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Tukarkan Bisnes Anda <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-yellow-200 to-yellow-600 animate-pulse">Kepada Digital</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Azri Safwan Web Studio membantu usahawan membina kehadiran digital yang premium, pantas, dan berimpak tinggi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-yellow-500/20"
            >
              Lihat Portfolio <ArrowRight size={20} />
            </a>
            <a
              href="#pricing"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all"
            >
              Pakej Harga
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <Globe className="text-yellow-500 mb-2" size={32} />
            <span className="text-gray-300 font-medium">Global Reach</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="text-yellow-500 mb-2" size={32} />
            <span className="text-gray-300 font-medium">Fast Performance</span>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <Shield className="text-yellow-500 mb-2" size={32} />
            <span className="text-gray-300 font-medium">Secure & Reliable</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
