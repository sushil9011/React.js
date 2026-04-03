import { useState } from "react";

export default function Table({ allStudents, deleteStudent, updateStudent }: any) {
    const [search, setSearch] = useState<string>("");

    // Search Logic
    const filteredStudents = allStudents.filter((item: any) => 
        item.fName.toLowerCase().includes(search.toLowerCase()) ||
        item.lName.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
                <h3 className="font-black text-slate-800 text-xl tracking-tight uppercase">Talent Pool</h3>
                
                {/* Search Bar - Modern Design */}
                <div className="relative w-full md:w-72">
                    <input 
                        type="text" 
                        placeholder="Search talents..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-orange-50 transition-all shadow-sm"
                    />
                    <svg className="w-4 h-4 absolute left-4 top-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>

                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{allStudents.length} Profiles Saved</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStudents.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                        <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.3em]">No matching profiles</p>
                    </div>
                ) : (
                    filteredStudents.map((item: any, index: number) => (
                        <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                            
                            {/* Action Buttons Overlay */}
                            <div className="absolute top-6 right-6 flex gap-2">
                                <button onClick={() => updateStudent(index)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </button>
                                <button onClick={() => deleteStudent(index)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>

                            <div className="flex items-start gap-5 mb-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 text-[#FF5C35] flex items-center justify-center font-black text-2xl shadow-inner uppercase">
                                    {item.fName[0]}
                                </div>
                                <div className="flex-1 pr-16">
                                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg leading-none">{item.fName} {item.lName}</h4>
                                    <p className="text-[11px] text-[#007A7C] font-black mt-1.5 uppercase tracking-wider truncate">{item.email}</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{item.city} Base</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 pt-5 border-t border-slate-50">
                                {item.hobby.map((h: string) => (
                                    <span key={h} className="text-[9px] bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl font-black uppercase tracking-tight border border-slate-100">{h}</span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}