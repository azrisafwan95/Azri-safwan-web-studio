import { useState, useRef } from 'react';
import { FileText, Trash2, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const InvoiceGenerator = ({ t }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [invoiceData, setInvoiceData] = useState({
    myCompanyName: 'NAMA SYARIKAT ANDA',
    myTagline: 'Slogan atau Jenis Servis Anda',
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    clientName: '', clientEmail: '',
    items: [{ description: 'Web Dev Service', qty: 1, price: 1200 }],
    bankInfo: 'Masukkan Maklumat Bank Anda Di Sini',
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
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="bg-[#14151a] border border-yellow-500/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <div className="bg-yellow-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"><FileText className="text-yellow-500" size={40} /></div>
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{t.title}</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">{t.desc}</p>
        <button onClick={() => setIsOpen(true)} className="bg-yellow-500 hover:bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl active:scale-95">{t.launchBtn}</button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0b] overflow-y-auto p-4 md:p-10 flex flex-col items-center">
          <div className="w-full max-w-6xl flex justify-between items-center mb-8 border-b border-white/5 pb-6">
            <h1 className="text-yellow-500 font-black uppercase italic tracking-widest text-xl">Azri Studio <span className="text-white text-xs ml-2 opacity-30">/ Tools</span></h1>
            <button onClick={() => setIsOpen(false)} className="text-white bg-white/5 p-3 rounded-full hover:bg-red-500 transition-all shadow-lg"><X /></button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl mb-20 text-left">
            {/* KIRI: BORANG INPUT */}
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
                <button onClick={addItem} className="text-[10px] font-black text-blue-400 uppercase">+ Item</button>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center bg-black/30 p-3 rounded-xl border border-white/5">
                    <input type="text" className="flex-1 bg-transparent text-white text-xs outline-none" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)}/>
                    <input type="number" className="w-10 bg-transparent text-white text-xs text-center" value={item.qty} onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value))}/>
                    <input type="number" className="w-16 bg-transparent text-white text-xs text-right" value={item.price} onChange={(e) => updateItem(index, 'price', parseInt(e.target.value))}/>
                    <button onClick={() => removeItem(index)} className="text-gray-700 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>
              <textarea rows={2} value={invoiceData.bankInfo} onChange={(e) => setInvoiceData({...invoiceData, bankInfo: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-xs outline-none"/>
              <button onClick={handleDownload} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all"><Download size={18}/> Download PDF</button>
            </div>

            {/* KANAN: LIVE PREVIEW (WITH FOOTER TAG) */}
            <div className="bg-zinc-800 p-4 rounded-[2rem] overflow-x-auto flex justify-center items-start shadow-inner border border-white/5">
              <div ref={invoiceRef} className="bg-white w-[210mm] min-h-[297mm] p-16 text-black shadow-2xl origin-top scale-[0.4] sm:scale-[0.55]" style={{ transformOrigin: 'top center' }}>
                <div className="flex justify-between items-start mb-20">
                  <div className="max-w-md">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">{invoiceData.myCompanyName}</h1>
                    <p className="text-[11px] text-gray-500 uppercase font-black tracking-[0.3em] border-l-4 border-yellow-500 pl-4">{invoiceData.myTagline}</p>
                  </div>
                  <h2 className="text-7xl font-black text-gray-100 uppercase tracking-tighter leading-none">INV</h2>
                </div>
                <div className="grid grid-cols-2 gap-10 mb-16 border-y border-gray-100 py-10">
                  <div><h4 className="text-[10px] font-black text-gray-400 uppercase mb-3">Bil Kepada:</h4><p className="font-black text-xl uppercase tracking-tight">{invoiceData.clientName || 'PELANGGAN'}</p></div>
                  <div className="text-right"><p className="text-xs font-bold uppercase">No: {invoiceData.invoiceNumber}</p><p className="text-xs font-bold uppercase">Tarikh: {invoiceData.date}</p></div>
                </div>
                <table className="w-full mb-16">
                  <thead><tr className="border-b-4 border-black text-left"><th className="py-6 text-[11px] font-black uppercase">Servis</th><th className="py-6 text-[11px] font-black uppercase text-center">Unit</th><th className="py-6 text-[11px] font-black uppercase text-right">Jumlah (RM)</th></tr></thead>
                  <tbody>{invoiceData.items.map((item, index) => (<tr key={index} className="border-b border-gray-100"><td className="py-6 text-sm font-bold uppercase italic">{item.description}</td><td className="py-6 text-sm text-center">{item.qty}</td><td className="py-6 text-sm text-right font-black">{(item.qty * item.price).toLocaleString()}</td></tr>))}</tbody>
                </table>
                <div className="flex justify-end mb-24"><div className="w-72 bg-black p-8 text-white rounded-sm shadow-xl"><div className="flex justify-between items-center mb-4 opacity-50"><span className="text-[10px] font-black uppercase">Subtotal</span><span className="text-sm font-bold">RM {calculateTotal().toLocaleString()}</span></div><div className="flex justify-between items-center border-t border-white/20 pt-4"><span className="text-xs font-black uppercase text-yellow-500 text-[10px]">Total Amount</span><span className="text-3xl font-black italic">RM {calculateTotal().toLocaleString()}</span></div></div></div>
                <div className="grid grid-cols-2 gap-20"><div><h4 className="text-[10px] font-black uppercase mb-4 tracking-widest text-gray-400">Bayaran Secara Transfer:</h4><p className="text-xs font-black text-gray-800 leading-relaxed whitespace-pre-line bg-gray-50 p-4 border-l-2 border-yellow-500">{invoiceData.bankInfo}</p></div><div className="text-right"><h4 className="text-[10px] font-black uppercase mb-4 tracking-widest text-gray-400">Nota:</h4><p className="text-xs italic text-gray-500 font-medium">{invoiceData.notes}</p></div></div>
                {/* INI TAG BRANDING ABANG YANG HILANG TADI */}
                <div className="mt-40 pt-10 border-t border-gray-100 flex justify-between items-center"><p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">Official Document</p><p className="text-[9px] text-gray-400 font-bold uppercase italic">{t.footerTag}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;