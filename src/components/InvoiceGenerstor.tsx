import { useState, useRef } from 'react';
import { FileText, Plus, Trash2, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const InvoiceGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Data Invois
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    clientName: '',
    clientEmail: '',
    items: [{ description: 'Web Development Service', qty: 1, price: 1000 }],
    bankInfo: 'Maybank - 1234567890 (Azri Safwan)',
    notes: 'Terima kasih atas sokongan anda!'
  });

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', qty: 1, price: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

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
    <section className="py-12 bg-[#0a0a0b]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-[#14151a] border border-yellow-500/20 p-8 rounded-[2rem] shadow-2xl">
          <FileText className="text-yellow-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Professional Invoice Generator</h2>
          <p className="text-gray-400 text-sm mb-6 font-medium">Bina invois profesional untuk klien anda dalam masa 2 minit.</p>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-yellow-500 text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-lg shadow-yellow-500/10"
          >
            Launch Invoice Tool
          </button>
        </div>
      </div>

      {/* FULL SCREEN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto p-4 md:p-10 flex flex-col items-center">
          <div className="w-full max-w-6xl flex justify-between items-center mb-8">
            <h1 className="text-yellow-500 font-black uppercase italic tracking-widest">Azri Studio / Invoicer</h1>
            <button onClick={() => setIsOpen(false)} className="text-white bg-white/10 p-3 rounded-full hover:bg-red-500 transition-all"><X /></button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
            {/* LEFT: FORM INPUT */}
            <div className="bg-[#14151a] p-8 rounded-3xl border border-white/5 space-y-6 h-fit">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-yellow-500 uppercase">No. Invois</label>
                  <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-yellow-500"/>
                </div>
                <div>
                  <label className="text-[10px] font-black text-yellow-500 uppercase">Tarikh</label>
                  <input type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-yellow-500"/>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-yellow-500 uppercase">Nama Klien</label>
                <input type="text" placeholder="Syarikat ABC Sdn Bhd" onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-yellow-500"/>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-yellow-500 uppercase flex justify-between items-center">
                  Senarai Item <button onClick={addItem} className="text-blue-400 hover:text-white flex items-center gap-1"><Plus size={12}/> Tambah</button>
                </label>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center bg-black/30 p-3 rounded-xl border border-white/5">
                    <input type="text" placeholder="Servis..." className="flex-1 bg-transparent text-white text-xs outline-none" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)}/>
                    <input type="number" className="w-12 bg-transparent text-white text-xs outline-none text-center" value={item.qty} onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value))}/>
                    <input type="number" className="w-20 bg-transparent text-white text-xs outline-none text-right" value={item.price} onChange={(e) => updateItem(index, 'price', parseInt(e.target.value))}/>
                    <button onClick={() => removeItem(index)} className="text-gray-600 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-black text-yellow-500 uppercase">Maklumat Bank</label>
                <textarea rows={2} value={invoiceData.bankInfo} onChange={(e) => setInvoiceData({...invoiceData, bankInfo: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-yellow-500"/>
              </div>

              <button onClick={handleDownload} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all"><Download size={16}/> Download Invois PDF</button>
            </div>

            {/* RIGHT: LIVE PREVIEW (Styled as Real Paper) */}
            <div className="bg-gray-200 p-4 md:p-8 rounded-xl overflow-x-auto">
              <div ref={invoiceRef} className="bg-white w-[210mm] min-h-[297mm] mx-auto p-12 text-black shadow-2xl origin-top" style={{ transform: 'scale(0.5)', transformOrigin: 'top center', marginBottom: '-150mm' }}>
                <div className="flex justify-between items-start mb-16">
                  <div>
                    <h1 className="text-3xl font-black italic tracking-tighter mb-2">AZRI SAFWAN <span className="text-yellow-500">STUDIO</span></h1>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Premium Web Development Solutions</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-5xl font-black text-gray-100 uppercase tracking-tighter">INVOICE</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-12">
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase mb-2">Disediakan Untuk:</h4>
                    <p className="font-bold text-lg uppercase">{invoiceData.clientName || 'NAMA KLIEN ANDA'}</p>
                    <p className="text-sm text-gray-500">{invoiceData.clientEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase">No. Invois: <span className="text-gray-500">{invoiceData.invoiceNumber}</span></p>
                    <p className="text-xs font-bold uppercase">Tarikh: <span className="text-gray-500">{invoiceData.date}</span></p>
                  </div>
                </div>

                <table className="w-full mb-12">
                  <thead>
                    <tr className="border-b-2 border-black text-left">
                      <th className="py-4 text-[10px] font-black uppercase">Keterangan Servis</th>
                      <th className="py-4 text-[10px] font-black uppercase text-center">Unit</th>
                      <th className="py-4 text-[10px] font-black uppercase text-right">Harga (RM)</th>
                      <th className="py-4 text-[10px] font-black uppercase text-right">Jumlah (RM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 italic">
                        <td className="py-4 text-sm font-bold uppercase">{item.description}</td>
                        <td className="py-4 text-sm text-center">{item.qty}</td>
                        <td className="py-4 text-sm text-right">{item.price.toLocaleString()}</td>
                        <td className="py-4 text-sm text-right font-black">{(item.qty * item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mb-20">
                  <div className="w-64 bg-black p-6 text-white rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase">Subtotal</span>
                      <span className="text-sm">RM {calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/20 pt-2">
                      <span className="text-xs font-black uppercase text-yellow-500">Total Amount</span>
                      <span className="text-xl font-black italic">RM {calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase mb-3 underline">Maklumat Bayaran:</h4>
                    <p className="text-xs font-bold text-gray-600 leading-relaxed whitespace-pre-line">{invoiceData.bankInfo}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[10px] font-black uppercase mb-3 underline">Nota:</h4>
                    <p className="text-xs italic text-gray-500">{invoiceData.notes}</p>
                  </div>
                </div>
                
                <div className="mt-32 text-center">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">Terima Kasih Kerana Memilih Azri Safwan Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InvoiceGenerator;