import { Plus } from 'lucide-react';
import { Fragment, useState } from 'react';
import EditDiscountDrawer from './EditDiscountDrawer';

export default function DiscountManager() {
  const [discounts, setDiscounts] = useState([
    { id: 1, code: 'WELCOME10', type: '% off deposit', value: '10%', uses: '23/100 (1 per user)', validity: 'Jan 01, 2024 – Dec 31, 2024', status: 'Active' },
    { id: 2, code: 'SUMMER20', type: '$ off total', value: '$20', uses: '12 / 50 (1 per user)', validity: 'Jun 01, 2024 – Aug 31, 2024', status: 'Paused' },
    { id: 3, code: 'EARLYBIRD', type: '% off total', value: '15%', uses: '200 / 200 (1 per user)', validity: 'Jan 01, 2024 - Mar 31, 2024', status: 'Expired' }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({ 
    code: '', type: '% off deposit', value: '', internalName: '', description: '',
    maxUses: '', startDate: '', endDate: '', status: true
  });

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        code: item.code, 
        type: item.type, 
        value: item.value.replace('%', '').replace('$', ''), 
        internalName: item.internalName || 'Welcome Discount',
        description: item.description || '10% off for new customers',
        maxUses: item.maxUses || '100',
        startDate: item.startDate || '2025-12-12',
        endDate: item.endDate || '2025-12-15',
        status: item.status === 'Active' 
      });
    } else {
      setEditingItem(null);
      setFormData({ 
        code: '', type: '% off deposit', value: '', internalName: '', description: '',
        maxUses: '', startDate: '', endDate: '', status: true 
      });
    }
    setIsFormOpen(true);
  };

  const handleSave = () => {
    const formattedValue = formData.type.includes('%') ? `${formData.value}%` : `$${formData.value}`;
    const updatedEntry = {
      id: editingItem ? editingItem.id : Date.now(),
      code: formData.code,
      type: formData.type,
      value: formattedValue,
      uses: editingItem ? editingItem.uses : `0 / ${formData.maxUses || 100} (1 per user)`,
      validity: `${formData.startDate || 'Jan 01, 2024'} – ${formData.endDate || 'Dec 31, 2024'}`,
      status: formData.status ? 'Active' : 'Paused',
      internalName: formData.internalName,
      description: formData.description,
      maxUses: formData.maxUses,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    if (editingItem) {
      setDiscounts(discounts.map(d => d.id === editingItem.id ? updatedEntry : d));
    } else {
      setDiscounts([...discounts, updatedEntry]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
      <div className={`flex-1 p-4 lg:p-8 transition-all duration-300 ${isFormOpen ? 'opacity-40 lg:opacity-100 lg:mr-[480px]' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Discount Codes</h2>
            <p className="text-base text-gray-600 font-normal">Create and manage discount codes for bookings</p>
          </div>
          <button onClick={() => handleOpenForm()} className="bg-gradient-to-r from-[#E61E4D] to-[#E31F87] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md hover:opacity-95 transition-all">
            Add Discount <Plus size={18} />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left min-w-[1060px] border-separate border-spacing-0">
            <thead className="bg-white text-[14px] text-[#3D3D3D] font-normal tracking-wider">
              <tr>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black">Code</th>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black">Type</th>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black">Value</th>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black w-[130px]">Uses</th>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black w-[170px]">Validity</th>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black text-center">Status</th>
                <th className="px-5 py-4 bg-white border-r-2 border-gray-200 border-b border-black text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {discounts.map((d, index) => (
                <Fragment key={d.id}>
                  <tr
                    className={`transition-colors text-[14px] bg-gray-50 hover:bg-gray-50`}
                  >
                    <td className="px-5 py-5 font-bold text-black border-r-2 border-gray-200">{d.code.charAt(0).toUpperCase() + d.code.slice(1)}</td>
                    <td className="px-5 py-5 font-normal text-black border-r-2 border-gray-200">{d.type.charAt(0).toUpperCase() + d.type.slice(1)}</td>
                    <td className="px-5 py-5 font-normal text-black border-r-2 border-gray-200">{d.value}</td>
                    <td className={`px-5 py-5 font-normal whitespace-normal break-words border-r-2 border-gray-200 ${d.uses === '23/100 (1 per user)' || d.uses === '200 / 200 (1 per user)' ? 'text-gray-500' : 'text-black'}`}>{d.uses}</td>
                    <td className="px-5 py-5 font-normal text-black whitespace-pre-line text-center border-r-2 border-gray-200 w-[170px]">{d.validity.replace(' – ', ' –\n').replace(' - ', ' -\n')}</td>
                    <td className="px-5 py-5 text-center border-r-2 border-gray-200">
                      <span className={`px-5 py-2 rounded-full text-[13px] font-semibold ${
                        d.status === 'Active' ? 'bg-[#D3FFCC] text-[#3D3D3D]' : 
                        d.status === 'Paused' ? 'bg-orange-200 text-[#3D3D3D]' : 'bg-gray-200 text-[#3D3D3D]'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-center">
                      <button 
  onClick={() => handleOpenForm(d)} 
  className="border-2 border-[#FE6E85] text-[#3D3D3D] px-6 py-2 rounded-full text-[13px] font-semibold hover:bg-pink-50 transition-all"
>
  Edit
</button>
                    </td>
                  </tr>
                  {index !== discounts.length - 1 && (
                    <tr aria-hidden="true">
                      <td colSpan="7" className="p-0">
                        <div className="h-px w-full bg-black" />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditDiscountDrawer 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
}