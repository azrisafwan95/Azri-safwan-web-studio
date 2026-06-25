import React, { useState, useEffect } from 'react';
import { Copy, Check, Image as ImageIcon, Calendar, MessageSquare } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const WALinkGenerator = ({ t }: any) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'chat' | 'booking'>('chat');
  const [logo, setLogo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const bookingTemplate = "Salam Bos, saya nak booking slot:\n\nNama:\nJenis Kereta/Servis:\nTarikh:\nMasa:\n\nTerima kasih!";

  useEffect(() => {
    if (mode === 'booking') setMessage(bookingTemplate);
    else setMessage('');
  }, [mode]);

  const generateLink = () => {
    let cleanPhone = phone.replace(/\D/g, ''); 
    if (cleanPhone.startsWith('0')) cleanPhone = '6' + cleanPhone;
    const encodedMessage = encodeURIComponent(message);
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedMessage}` : '';
  };

  const fullLink = generateLink();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
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
      downloadLink.href = pngUrl; downloadLink.download = `qr-azristudio.png`;
      document.body.appendChild(downloadLink); downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="text-center mb-12">
        <h3 className="text-xl font-black text-yellow-500 uppercase tracking-widest italic mb-4">{t.title}</h3>
        <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">{t.desc}</p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button onClick={() => setMode('chat')} className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${mode === 'chat' ? 'bg-yellow-500 text-black shadow-lg' : 'bg-white/5 text-gray-500 border border-white/5'}`}><MessageSquare size={12} className="inline mr-2"/> {t.chatBtn}</button>
        <button onClick={() => setMode('booking')} className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${mode === 'booking' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 border border-white/5'}`}><Calendar size={12} className="inline mr-2"/> {t.bookingBtn}</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#14151a] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-3">{t.labelPhone}</label>
                <input type="text" placeholder="Contoh: 01121281024" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold" />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-3">{t.labelLogo}</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload"/>
                <label htmlFor="logo-upload" className="w-full bg-black/50 border border-white/10 border-dashed rounded-2xl p-5 text-gray-500 flex items-center justify-center gap-3 cursor-pointer hover:border-yellow-500 transition-all"><ImageIcon size={18} /><span className="text-[10px] font-bold uppercase">{logo ? 'Logo Ready!' : 'PNG / JPG'}</span></label>
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-3">{t.labelMsg}</label>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all text-sm font-medium" />
            </div>
          </div>
          <div className="bg-black/30 p-6 rounded-2xl border border-dashed border-white/10">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-3">{t.resLink}</label>
            <p className="text-xs font-mono text-yellow-500/70 break-all mb-6 bg-black/50 p-4 rounded-lg min-h-[60px]">{fullLink || '...'}</p>
            <div className="flex gap-4">
              <button onClick={copyToClipboard} disabled={!fullLink} className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-yellow-500 disabled:opacity-20 transition-all">{copied ? <Check size={14} /> : <Copy size={14} />} {t.copyBtn}</button>
              <a href={fullLink} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-black py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all ${!fullLink && 'pointer-events-none opacity-20'}`}>{t.testBtn}</a>
            </div>
          </div>
        </div>

        <div className="bg-[#14151a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-2xl mb-8 shadow-2xl">
            {fullLink ? <QRCodeCanvas id="qr-code-canvas" value={fullLink} size={180} level={"H"} includeMargin={false} imageSettings={logo ? { src: logo, height: 40, width: 40, excavate: true } : undefined} /> : <div className="w-[180px] h-[180px] flex items-center justify-center text-gray-300 italic text-[10px] text-center px-4">Input data</div>}
          </div>
          <button onClick={downloadQRCode} disabled={!fullLink} className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-10 shadow-lg">{t.downloadBtn}</button>
        </div>
      </div>
    </div>
  );
};

export default WALinkGenerator;