import { useState, useRef } from 'react';
import { FileText, Trash2, Download, X, ExternalLink, MessageCircle, Star, Zap } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const InvoiceGenerator = ({ t }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false); // State untuk Popup lepas download
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [invoiceData, setInvoiceData] = useState({
    myCompanyName: 'NAMA SYARIKAT ANDA',
    myTagline: 'Slogan atau Jenis Servis Anda',
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    clientName: '', clientEmail: '',
    items: [{ description: 'Servis Lori / Pindah Rumah', qty: 1, price: 500 }],
    bankInfo: 'Maybank - 1234567890 (Azri Safwan)',
    notes: 'Terima kasih atas urusan ini!'
  });

  const addItem = () => setInvoiceData({ ...invoiceData, items: [...invoiceData.items, { description: '', qty: 1, price: 0 }] });
  const removeItem = (index: number) => setInvoiceData({ ...invoiceData, items: invoiceData.items.filter((_, i) => i !== index) });
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => invoiceData.items.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const handleDownload = async () => {
    if (invoiceRef.current) {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invois-${invoiceData.invoiceNumber}.pdf`);
      
      // Tunggu kejap lepas download baru keluar popup promo
      setTimeout(() => {
        setShowPromo(true);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 text-center">
      {/* CARD DEPAN */}
      <div className="bg-[#14151a] border border-yellow-500/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <div className="bg-yellow-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><FileText className="text-yellow-500" size={32} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">{t.title}</h2>
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-8">{t.desc}</p>
        <button onClick={() => setIsOpen(true)} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-yellow-500 active:scale-95">{t.launchBtn}</button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0b] overflow-y-auto p-4 md:p-10 flex flex-col items-center text-left">
          
          {/* HEADER MODAL */}
          <div className="w-full max-w-6xl flex justify-between items-center mb-8 border-b border-white/5 pb-6">
            <h1 className="text-yellow-500 font-black uppercase italic tracking-widest text-xl">Azri Studio <span className="text-white text-xs ml-2 opacity-30">/ Invoicer</span></h1>
            <button onClick={() => setIsOpen(false)} className="text-white bg-white/5 p-3 rounded-full hover:bg-red-500 transition-all"><X /></button>
          </div>

          {/* 🚀 STRATEGI 1: SMART BANNER (KAT ATAS SEKALI) */}
          <div className="w-full max-w-6xl mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-white/10">
            <div className="flex items-center gap-4">
               <div className="bg-white/20 p-2 rounded-lg animate-pulse"><Star className="text-yellow-400" size={20} /></div>
               <p className="text-white text-xs md:text-sm font-bold uppercase tracking-tight italic">
                 Nampak lebih PRO kalau ada Website Rasmi sendiri siap sistem Invois & DO!
               </p>
            </div>
            <a 
              href="https://azri-safwan-web-studio.vercel.app/" 
              target="_blank" 
              className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black text-[10px] uppercase flex items-center gap-2 hover:bg-white transition-all shadow-lg"
            >
              Lihat Contoh Website <ExternalLink size={12} />
            </a>
          </div>
          
          {/* MAIN GENERATOR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl mb-20">
            
            {/* INPUT SECTION */}
            <div className="bg-[#14151a] p-8 rounded-[2rem] border border-white/5 space-y-6 h-fit shadow-2xl">
              <div className="space-y-4">
                <input type="text" placeholder="Nama Syarikat Anda" value={invoiceData.myCompanyName} onChange={(e) => setInvoiceData({...invoiceData, myCompanyName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-yellow-500"/>
                <input type="text" placeholder="Tagline" value={invoiceData.myTagline} onChange={(e) => setInvoiceData({...invoiceData, myTagline: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-yellow-500"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm outline-none"/>
                <input type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm outline-none"/>
              </div>
              <input type="text" placeholder="Nama Pelanggan" value={invoiceData.clientName} onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm outline-none"/>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <button onClick={addItem} className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">+ Add Item / Service</button>
                  <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest italic">ZASSSSSS Invoicer</span>
                </div>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center bg-black/30 p-3 rounded-xl border border-white/5">
                    <input type="text" className="flex-1 bg-transparent text-white text-xs outline-none" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)}/>
                    <input type="number" className="w-10 bg-transparent text-white text-xs text-center" value={item.qty} onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value))}/>
                    <input type="number" className="w-16 bg-transparent text-white text-xs text-right font-bold text-yellow-500" value={item.price} onChange={(e) => updateItem(index, 'price', parseInt(e.target.value))}/>
                    <button onClick={() => removeItem(index)} className="text-gray-700 hover:text-red-500 ml-2"><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>
              
              <textarea rows={2} placeholder="Info Bank (Cth: Maybank 1234...)" value={invoiceData.bankInfo} onChange={(e) => setInvoiceData({...invoiceData, bankInfo: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-xs outline-none"/>
              
              <button onClick={handleDownload} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all shadow-xl active:scale-95 duration-200">
                <Download size={18}/> Download PDF Invois
              </button>

              {/* 🚀 STRATEGI 2: COMING SOON SECTION (MEMBINA TERUJA) */}
              <div className="mt-10 p-6 border border-white/5 rounded-2xl bg-black/20">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 italic">Next Update (Free Tools):</h4>
                <div className="space-y-3 opacity-30">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/50"><div className="w-1 h-1 bg-white rounded-full"></div> Digital Delivery Order (Sign On Screen)</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/50"><div className="w-1 h-1 bg-white rounded-full"></div> Trip Cost & Profit Calculator</div>
                </div>
                <p className="mt-4 text-[9px] text-yellow-500/50 font-black uppercase tracking-widest italic leading-relaxed">Exclusive for Azri Safwan Studio Client Ecosystem</p>
              </div>
            </div>

            {/* PREVIEW SECTION (REAL-TIME) */}
            <div className="bg-zinc-800 p-4 rounded-[2.5rem] overflow-x-auto flex justify-center items-start border border-white/5">
              <div ref={invoiceRef} className="bg-white w-[210mm] min-h-[297mm] p-16 text-black shadow-2xl origin-top scale-[0.4] sm:scale-[0.55]" style={{ transformOrigin: 'top center' }}>
                <div className="flex justify-between items-start mb-20">
                  <div className="max-w-md">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">{invoiceData.myCompanyName}</h1>
                    <p className="text-[11px] text-gray-500 uppercase font-black tracking-[0.3em] border-l-4 border-yellow-500 pl-4">{invoiceData.myTagline}</p>
                  </div>
                  <h2 className="text-7xl font-black text-gray-100 uppercase tracking-tighter leading-none italic">INV</h2>
                </div>
                <div className="grid grid-cols-2 gap-10 mb-16 border-y border-gray-100 py-10">
                  <div><h4 className="text-[10px] font-black text-gray-400 uppercase mb-3">BIL KEPADA:</h4><p className="font-black text-xl uppercase tracking-tight">{invoiceData.clientName || 'CUSTOMER'}</p></div>
                  <div className="text-right"><p className="text-xs font-bold uppercase">No: {invoiceData.invoiceNumber}</p><p className="text-xs font-bold uppercase">Tarikh: {invoiceData.date}</p></div>
                </div>
                <table className="w-full mb-16">
                  <thead><tr className="border-b-4 border-black text-left"><th className="py-6 text-[11px] font-black uppercase">Item / Servis</th><th className="py-6 text-[11px] font-black uppercase text-center">Unit</th><th className="py-6 text-[11px] font-black uppercase text-right">Jumlah (RM)</th></tr></thead>
                  <tbody>{invoiceData.items.map((item, index) => (<tr key={index} className="border-b border-gray-100"><td className="py-6 text-sm font-bold uppercase italic">{item.description}</td><td className="py-6 text-sm text-center font-bold">{item.qty}</td><td className="py-6 text-sm text-right font-black">{(item.qty * item.price).toLocaleString()}</td></tr>))}</tbody>
                </table>
                <div className="flex justify-end mb-24"><div className="w-72 bg-black p-8 text-white rounded-sm shadow-xl"><div className="flex justify-between items-center mb-4 opacity-50"><span className="text-[10px] font-black uppercase">Subtotal</span><span className="text-sm font-bold">RM {calculateTotal().toLocaleString()}</span></div><div className="flex justify-between items-center border-t border-white/20 pt-4"><span className="text-xs font-black uppercase text-yellow-500 text-[10px]">Total Amount</span><span className="text-3xl font-black italic">RM {calculateTotal().toLocaleString()}</span></div></div></div>
                <div className="grid grid-cols-2 gap-20"><div><h4 className="text-[10px] font-black uppercase mb-4 tracking-widest text-gray-400 underline">Payment Info:</h4><p className="text-[11px] font-black text-gray-800 leading-relaxed whitespace-pre-line bg-gray-50 p-4 border-l-2 border-yellow-500">{invoiceData.bankInfo}</p></div><div className="text-right"><h4 className="text-[10px] font-black uppercase mb-4 tracking-widest text-gray-400 underline">Notes:</h4><p className="text-[11px] italic text-gray-500 font-medium">{invoiceData.notes}</p></div></div>
                
                {/* 🚀 STRATEGI 3: BRANDING DALAM PDF (PANCUNG SECARA HALUS) */}
                <div className="mt-40 pt-10 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">Official Business Document</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase mt-1 italic italic leading-none">Powered by Azri Safwan Web Studio - Tool Percuma Untuk Peniaga</p>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase italic">{t.footerTag}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 🚀 STRATEGI 4: SUCCESS POPUP (THE CLOSER) */}
          {showPromo && (
            <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
              <div className="bg-[#14151a] w-full max-w-lg p-10 rounded-[3rem] border border-yellow-500/30 text-center shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"><Zap className="text-black" size={32} /></div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">ZASSSSSS! Invois Dah Siap!</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Invois pro dah ada, tapi website bisnes dah ada belum? <br/>
                  Klien korporat & kilang lebih yakin nak bayar kalau nampak bos ada **Website Rasmi**.
                </p>
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/601110134881?text=Hi%20Azri%2C%20saya%20pengguna%20Invoicer.%20Nak%20tanya%20pasal%20pakej%20website%20untuk%20bisnes%20saya." 
                    target="_blank"
                    className="w-full bg-green-500 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all"
                  >
                    <MessageCircle size={18} /> Sembang Kat WhatsApp
                  </a>
                  <button 
                    onClick={() => setShowPromo(false)} 
                    className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Nanti Dulu, Saya Nak Terus Guna Invoicer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
