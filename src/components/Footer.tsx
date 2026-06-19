import { Mail, Phone, MessageCircle, LinkedIn, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const phone = "601121281024";
  const email = "azrisafwan.studio@gmail.com"; // Abang boleh tukar email ni nanti

  return (
    <footer className="bg-[#0a0a0b] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-6">
              <img 
                src="/logo-azri-safwan.png" 
                alt="Azri Safwan Logo" 
                className="h-10 w-auto opacity-80"
              />
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
              Membina masa depan digital untuk perniagaan IKS Malaysia dengan rekaan premium dan teknologi web terkini.
            </p>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
            <div className="flex gap-5">
              <a href={`tel:+${phone}`} className="text-gray-500 hover:text-yellow-500 transition-all hover:-translate-y-1">
                <Phone size={22} />
              </a>
              <a href={`mailto:${email}`} className="text-gray-500 hover:text-yellow-500 transition-all hover:-translate-y-1">
                <Mail size={22} />
              </a>
              {/* LinkedIn Placeholder - Bila abang dah ada link, letak kat href tu */}
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition-all hover:-translate-y-1">
                <MessageCircle size={22} />
              </a>
            </div>
            
            <a
              href={`https://wa.me/${phone}?text=Salam Azri Safwan Studio. Saya ingin bertanya tentang servis website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
              <MessageCircle size={18} /> Hubungi Studio
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {currentYear} Azri Safwan Web Studio. Hak Cipta Terpelihara.
          </p>
          <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest italic">
            Built from the cabin of a truck.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
