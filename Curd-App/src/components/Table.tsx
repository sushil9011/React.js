export default function Table({ allStudents }: any) {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
                <h3 className="font-black text-slate-800 text-xl tracking-tight uppercase">Talent Pool</h3>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{allStudents.length} Profiles Saved</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allStudents.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                        <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.3em]">Directory is empty</p>
                    </div>
                ) : (
                    allStudents.map((item: any, index: number) => (
                        <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group">
                            <div className="flex items-start gap-5 mb-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 text-[#FF5C35] flex items-center justify-center font-black text-2xl shadow-inner uppercase">
                                    {item.fName[0]}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg leading-none">{item.fName} {item.lName}</h4>
                                    <p className="text-[11px] text-[#007A7C] font-black mt-1.5 uppercase tracking-wider">{item.email}</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest italic-none">{item.city} Base</p>
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