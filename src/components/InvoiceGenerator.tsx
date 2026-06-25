import React, { useState, useRef } from 'react';
import { FileText, X } from 'lucide-react';
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
    items: [{ description: 'Contoh Servis', qty: 1, price: 100 }],
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
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{t.invTitle}</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">{t.invDesc}</p>
        <button onClick={() => setIsOpen(true)} className="bg-yellow-500 hover:bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl active:scale-95">{t.launchBtn}</button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0b] overflow-y-auto p-4 md:p-10 flex flex-col items-center">
          <div className="w-full max-w-6xl flex justify-between items-center mb-8 border-b border-white/5 pb-6">
            <h1 className="text-yellow-500 font-black uppercase italic tracking-widest text-xl">Azri Studio <span className="text-white text-xs ml-2 opacity-30">/ Tools</span></h1>
            <button onClick={() => setIsOpen(false)} className="text-white bg-white/5 p-3 rounded-full hover:bg-red-500 transition-all"><X /></button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl mb-20 text-left">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Company Name" value={invoiceData.myCompanyName} onChange={(e) => setInvoiceData({ ...invoiceData, myCompanyName: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 col-span-2" />
                <input type="text" placeholder="Invoice #" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500" />
                <input type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500" />
                <input type="text" placeholder="Client Name" value={invoiceData.clientName} onChange={(e) => setInvoiceData({ ...invoiceData, clientName: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 col-span-2" />
                <input type="email" placeholder="Client Email" value={invoiceData.clientEmail} onChange={(e) => setInvoiceData({ ...invoiceData, clientEmail: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 col-span-2" />
              </div>
              <div className="space-y-3">
                <h3 className="text-yellow-500 font-bold">Items</h3>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" placeholder="Description" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 flex-1" />
                    <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value))} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 w-16" />
                    <input type="number" placeholder="Price" value={item.price} onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 w-20" />
                    <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-400"><X size={20} /></button>
                  </div>
                ))}
                <button onClick={addItem} className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-xl border border-yellow-500/30 text-sm">+ Add Item</button>
              </div>
              <textarea placeholder="Bank Info" value={invoiceData.bankInfo} onChange={(e) => setInvoiceData({ ...invoiceData, bankInfo: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 w-full" rows={3} />
              <textarea placeholder="Notes" value={invoiceData.notes} onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 w-full" rows={2} />
            </div>

            <div ref={invoiceRef} className="bg-white p-8 rounded-2xl text-black space-y-4">
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">{invoiceData.myCompanyName}</h2>
                <p className="text-sm text-gray-600">{invoiceData.myTagline}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="font-bold">Invoice #:</p><p>{invoiceData.invoiceNumber}</p></div>
                <div><p className="font-bold">Date:</p><p>{invoiceData.date}</p></div>
                <div className="col-span-2"><p className="font-bold">Bill To:</p><p>{invoiceData.clientName}</p><p className="text-gray-600">{invoiceData.clientEmail}</p></div>
              </div>
              <table className="w-full text-sm border-t border-b">
                <thead><tr className="bg-gray-100"><th className="text-left py-2">Description</th><th className="text-center">Qty</th><th className="text-right">Price</th><th className="text-right">Total</th></tr></thead>
                <tbody>{invoiceData.items.map((item, index) => <tr key={index} className="border-b"><td className="py-2">{item.description}</td><td className="text-center">{item.qty}</td><td className="text-right">{item.price.toFixed(2)}</td><td className="text-right font-bold">{(item.qty * item.price).toFixed(2)}</td></tr>)}</tbody>
              </table>
              <div className="text-right"><p className="text-lg font-bold">Total: {calculateTotal().toFixed(2)}</p></div>
              <div className="text-xs bg-gray-100 p-3 rounded"><p className="font-bold">Bank Info:</p><p>{invoiceData.bankInfo}</p></div>
              <p className="text-xs text-gray-600 italic">{invoiceData.notes}</p>
            </div>
          </div>

          <button onClick={handleDownload} className="bg-yellow-500 hover:bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-sm mb-10">Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;