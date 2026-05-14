import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function EditDiscountDrawer({ isOpen, onClose, editingItem, formData, setFormData, onSave }) {
  if (!isOpen) return null;

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const openPicker = (ref) => {
    if (!ref?.current) return;
    try {
      if (typeof ref.current.showPicker === 'function') {
        ref.current.showPicker();
        return;
      }
    } catch (e) {}
    try {
      ref.current.click();
      return;
    } catch (e) {}
    try {
      ref.current.focus();
    } catch (e) {}
  };

  const formatToDisplayDate = (iso) => {
    if (!iso) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
      const [y, m, d] = iso.split('-');
      return `${d}/${m}/${y}`;
    }
    if (/^\d{4}-\d{2}$/.test(iso)) {
      const [y, m] = iso.split('-');
      return `${m}/${y}`;
    }
    return iso;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100 animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-gray-100 flex items-center gap-4">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-[22px] font-bold text-[#292929] leading-tight">
            {editingItem ? 'Edit Discount Code' : 'Add Discount Code'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 custom-scrollbar">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#3D3D3D]">Status</h3>
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setFormData({...formData, status: !formData.status})} 
                className={`w-11 h-6 rounded-full relative cursor-pointer transition-all ${formData.status ? 'bg-pink-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${formData.status ? 'left-6' : 'left-1'}`} />
              </div>
              <span className="text-sm font-normal text-gray-700">Active</span>
            </div>
            <hr className="mt-6 border-gray-100" />
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#0F172A]">Basic Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-normal text-[#3D3D3D] block mb-1.5 tracking-wide">Discount Code *</label>
                <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full border border-gray-200 rounded-lg p-3 text-[12px] text-[#999999] focus:border-pink-500 outline-none" placeholder="WELCOME10" />
              </div>
              <div>
                <label className="text-[12px] font-normal text-[#3D3D3D] block mb-1.5 tracking-wide">Internal Name / Label</label>
                <input type="text" value={formData.internalName} onChange={(e) => setFormData({...formData, internalName: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 text-[12px] text-[#999999] focus:border-pink-500 outline-none" placeholder="Welcome Discount" />
              </div>
              <div>
                <label className="text-[12px] font-normal text-[#3D3D3D] block mb-1.5 tracking-wide">Description (optional)</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 text-[12px] text-[#999999] focus:border-pink-500 outline-none" placeholder="10% off for new customers" />
              </div>
            </div>
            <hr className="mt-6 border-gray-100" />
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#0F172A]">Discount Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-normal text-[#3D3D3D] block tracking-wide">Discount Type *</label>
                <div className="relative">
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 text-[12px] text-[#999999] bg-white appearance-none outline-none focus:border-pink-500 cursor-pointer">
                    <option>% off deposit</option>
                    <option>$ off total</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{color: '#656565'}}>
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-normal text-[#3D3D3D] block tracking-wide">Discount Value *</label>
                <input type="number" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 text-[12px] text-[#999999] outline-none focus:border-pink-500" placeholder="10" />
              </div>
            </div>
            <hr className="mt-6 border-gray-100" />
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#0F172A]">Usage Rules</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-normal text-[#3D3D3D] block tracking-wide">Start Date *</label>
                <div className="relative">
                  <input ref={startDateRef} type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-[12px] text-[#999999] outline-none focus:border-pink-500 bg-white" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => openPicker(startDateRef)} style={{color: '#656565'}}>
                    <Calendar size={18} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-normal text-[#3D3D3D] block tracking-wide">Discount Value *</label>
                <div className="relative">
                  <input type="number" value={formData.value} readOnly className="w-full border border-gray-200 rounded-lg p-3 text-[12px] bg-gray-50 text-[#999999] outline-none" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{color: '#656565'}}>
                    <Calendar size={18} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-normal text-[#3D3D3D] block tracking-wide">Max Uses Total</label>
                <div className="relative">
                  <input type="number" value={formData.maxUses} onChange={(e) => setFormData({...formData, maxUses: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-[12px] text-[#999999] outline-none focus:border-pink-500" placeholder="99" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{color: '#656565'}}>
                    <Calendar size={18} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-normal text-[#3D3D3D] block tracking-wide">End Date</label>
                <div className="relative">
                  <input ref={endDateRef} type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-[12px] text-[#999999] outline-none focus:border-pink-500 bg-white" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => openPicker(endDateRef)} style={{color: '#656565'}}>
                    <Calendar size={18} />
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-8 border-gray-100" />
          </div>

          <div className="bg-[#FFF1F2] p-5 rounded-2xl border border-pink-100 space-y-4">
            <h2 className="text-[15px] font-normal text-[#3D3D3D]">Preview:</h2>
            <div className="bg-white p-4 rounded-xl border border-pink-50 space-y-2 shadow-sm">
              <p className="text-[15px] text-gray-600 font-normal">Code: <span className="font-semi-bold text-gray-900">{formData.code || 'WELCOME10'}</span></p>
              <p className="text-[15px] text-gray-600 font-normal">Discount: {formData.value || '10'}{formData.type.includes('%') ? '%' : '$'} {formData.type}</p>
              <p className="text-[15px] text-gray-600 font-normal">Valid: {formatToDisplayDate(formData.startDate) || 'Jan 01, 2024'} – {formatToDisplayDate(formData.endDate) || 'Dec 31, 2024'}</p>
              <p className="text-[15px] text-gray-600 font-normal">Max uses: {formData.maxUses || '100'} (1 per user)</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-pink-50 shadow-sm">
              <p className="text-[15px] text-gray-600 font-normal">Internal Note: <span className="text-gray-900 font-normal">{formData.description || '10% off for new customers'}</span></p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white flex gap-3 mt-auto sticky bottom-0">
          <button onClick={onClose} className="flex-1 py-3 border border-pink-200 text-pink-600 rounded-xl font-bold text-sm hover:bg-pink-50">Cancel</button>
          <button onClick={onSave} className="flex-1 py-3 bg-gradient-to-r from-[#E61E4D] to-[#E31F87] text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-100 hover:opacity-95 transition-all">Save Changes</button>
        </div>
      </div>
    </>
  );
}