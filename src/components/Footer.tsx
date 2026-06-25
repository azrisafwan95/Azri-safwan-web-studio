import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = ({ t }: any) => {
  const currentYear = new Date().getFullYear();
  const phone = "601121281024";

  return (
    <footer className="bg-[#0a0a0b] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-start">
            <img src="/logo-baru.png" alt="Logo" className="h-10 w-auto opacity-80 mb-6" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
              {t.desc}
            </p>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
            <div className="flex gap-5">
              <a href={`tel:+${phone}`} className="text-gray-500 hover:text-yellow-500 transition-all"><Phone size={22} /></a>
              <a href="mailto:azrisafwan.studio@gmail.com" className="text-gray-500 hover:text-yellow-500 transition-all"><Mail size={22} /></a>
              <a href={`https://wa.me/${phone}`} className="text-gray-500 hover:text-yellow-500 transition-all"><MessageCircle size={22} /></a>
            </div>
            
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
            >
              <MessageCircle size={18} /> {t.contactBtn}
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {currentYear} Azri Safwan Web Studio. {t.rights}
          </p>
          <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest italic">
            {t.builtBy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;