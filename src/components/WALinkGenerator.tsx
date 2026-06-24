import React, { useState } from 'react';
import { Copy, Check, QrCode, Download, Image as ImageIcon } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const WALinkGenerator = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [logo, setLogo] = useState<string | null>(null); // Untuk simpan gambar logo
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

  // Logik Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    if (!fullLink) return;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
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
            Bina link dan Branded QR Code secara percuma untuk bisnes anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* INPUT SECTION */}
          <div className="lg:col-span-2 bg-[#14151a] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-3">Nombor Telefon</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 01121281024"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-3">Logo Kedai (Pilihan)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden" 
                      id="logo-upload"
                    />
                    <label 
                      htmlFor="logo-upload"
                      className="w-full bg-black/50 border border-white/10 border-dashed rounded-2xl p-5 text-gray-500 flex items-center justify-center gap-3 cursor-pointer hover:border-yellow-500 transition-all"
                    >
                      <ImageIcon size={18} />
                      <span className="text-xs font-bold uppercase">{logo ? 'Logo Dipilih!' : 'Upload Logo (.png/.jpg)'}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-3">Mesej Automatik</label>
                <textarea 
                  rows={5}
                  placeholder="Contoh: Salam Bos, saya berminat nak order..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-2xl border border-dashed border-white/10">
              <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-3">WhatsApp Link:</label>
              <p className="text-xs font-mono text-yellow-500/70 break-all mb-6 bg-black/50 p-4 rounded-lg">
                {fullLink || 'Sila masukkan maklumat...'}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={copyToClipboard}
                  disabled={!fullLink}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 disabled:opacity-20 transition-all"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>

          {/* QR CODE PREVIEW SECTION */}
          <div className="bg-[#14151a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col items-center justify-center">
            <div className="mb-6 text-center">
              <div className="bg-yellow-500/10 p-3 rounded-full inline-block mb-3">
                <QrCode className="text-yellow-500" size={24} />
              </div>
              <h3 className="text-white font-black uppercase tracking-widest text-xs">Branded QR Code</h3>
            </div>

            <div className="bg-white p-4 rounded-2xl mb-8 shadow-2xl">
              {fullLink ? (
                <QRCodeCanvas 
                  id="qr-code-canvas"
                  value={fullLink} 
                  size={180}
                  level={"H"} // High error correction untuk logo
                  includeMargin={false}
                  imageSettings={logo ? {
                    src: logo,
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true, // Lubangkan QR sikit supaya logo nampak jelas
                  } : undefined}
                />
              ) : (
                <div className="w-[180px] h-[180px] flex items-center justify-center text-gray-300 italic text-[10px] text-center px-4">
                  Input data untuk generate QR
                </div>
              )}
            </div>

            <button 
              onClick={downloadQRCode}
              disabled={!fullLink}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-10 shadow-lg shadow-yellow-500/20"
            >
              <Download size={14} /> Download Branded QR
            </button>
            
            {logo && (
              <button 
                onClick={() => setLogo(null)}
                className="mt-4 text-[8px] text-red-500 font-bold uppercase tracking-widest hover:underline"
              >
                Buang Logo
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WALinkGenerator;