import { useState } from 'react';
import { Copy, Check, ExternalLink, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const WALinkGenerator = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Logik Bina Link
  const generateLink = () => {
    let cleanPhone = phone.replace(/\D/g, ''); 
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '6' + cleanPhone;
    }
    const encodedMessage = encodeURIComponent(message);
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedMessage}` : '';
  };

  const fullLink = generateLink();

  const copyToClipboard = () => {
    if (!fullLink) return;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Logik Download QR Code
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-whatsapp-azristudio.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <section id="tools" className="py-24 bg-[#0a0a0b] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
            WhatsApp <span className="text-yellow-500">Business Tools</span>
          </h2>
          <p className="text-gray-400 font-medium text-sm">
            Bina link dan QR Code WhatsApp secara percuma untuk memudahkan pelanggan menghubungi anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* BAHAGIAN 1: INPUT (2/3 width on large screens) */}
          <div className="lg:col-span-2 bg-[#14151a] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-3 text-left">Nombor Telefon</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 01121281024"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold placeholder:text-gray-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-3 text-left">Mesej Automatik</label>
                <textarea 
                  rows={1}
                  placeholder="Contoh: Nak order bos!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all text-sm placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-2xl border border-dashed border-white/10">
              <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-3">WhatsApp Link Anda:</label>
              <p className="text-xs font-mono text-yellow-500/70 break-all mb-6 bg-black/50 p-4 rounded-lg min-h-[50px]">
                {fullLink || 'Sila masukkan maklumat di atas...'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={copyToClipboard}
                  disabled={!fullLink}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all disabled:opacity-20"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a 
                  href={fullLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all ${!fullLink && 'pointer-events-none opacity-20'}`}
                >
                  Test Link <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* BAHAGIAN 2: QR CODE PREVIEW */}
          <div className="bg-[#14151a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col items-center justify-center">
            <div className="mb-6 text-center">
              <div className="bg-yellow-500/10 p-3 rounded-full inline-block mb-3">
                <QrCode className="text-yellow-500" size={24} />
              </div>
              <h3 className="text-white font-black uppercase tracking-widest text-xs">QR Code Generator</h3>
            </div>

            <div className="bg-white p-4 rounded-2xl mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              {fullLink ? (
                <QRCodeCanvas 
                  id="qr-code-canvas"
                  value={fullLink} 
                  size={160}
                  level={"H"}
                  includeMargin={false}
                />
              ) : (
                <div className="w-[160px] h-[160px] flex items-center justify-center text-gray-300 italic text-[10px] text-center px-4">
                  Masukkan nombor untuk generate QR
                </div>
              )}
            </div>

            <button 
              onClick={downloadQRCode}
              disabled={!fullLink}
              className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-10"
            >
              <Download size={14} /> Download PNG
            </button>
            <p className="mt-4 text-[8px] text-gray-600 font-bold uppercase tracking-widest italic">Ready for Print</p>
          </div>

        </div>

        <p className="mt-12 text-center text-gray-700 text-[9px] font-black uppercase tracking-[0.3em] italic">
          Designed by Azri Safwan Studio • Version 2.1
        </p>
      </div>
    </section>
  );
};

export default WALinkGenerator;