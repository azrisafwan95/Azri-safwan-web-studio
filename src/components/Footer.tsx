import { Globe, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold tracking-tighter text-white">
                AZRI <span className="text-yellow-500">SAFWAN</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Membina masa depan digital untuk perniagaan anda dengan teknologi web terkini.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors"><Phone size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors"><Mail size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors"><ExternalLink size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors"><Globe size={24} /></a>
            </div>
            
            <a
              href="https://wa.me/60123456789"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold transition-transform hover:scale-105"
            >
              <MessageCircle size={20} /> Tanya Saya di WhatsApp
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Azri Safwan Web Studio. Hak Cipta Terpelihara.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
