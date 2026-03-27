import { useState } from "react";
import { toast } from "react-toastify";

export default function Form({ allStudents, setAllStudents }: any) {
    // Exact States
    const [fName, setFName] = useState<string>("");
    const [lName, setLName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [hobby, setHobby] = useState<string[]>([]);
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<any>({});

    const allHobby = ["React JS", "Node JS", "UI/UX", "Python", "DevOps"];
    const allCity = ["Surat", "Rajkot", "Mumbai", "Bangalore", "Delhi"];

    // 100% Your Original Hobby Logic[cite: 1]
    const getStudentHobby = (event: any) => {
        const data = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setHobby(abc => [...abc, data]);
        } else {
            setHobby(hobby => hobby.filter((myHobby) => myHobby !== data));
        }
    }

    // 100% Your EXACT Validation Logic with phone pattern and console logs[cite: 1]
    const validation = () => {
        let newError: any = {};

        if (!fName) {
            newError.fname = "first name is required..";
        }

        if (!lName) {
            newError.lname = "last name is required..";
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            newError.email = "email is required..";
        } else if (!emailPattern.test(email)) {
            newError.email = "Invalid email address...";
        }

        const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (!phone) {
            newError.phone = "phone number is required..";
        } else if (phone.length !== 10 || !phonePattern.test(phone)) {
            newError.phone = "Invalid phone number..";
        }

        if (!gender) {
            newError.gender = "gender is required..";
        }

        if (hobby.length === 0) {
            newError.hobby = "hobby is required..";
        }

        if (!city || city === "select") {
            newError.city = "city is required..";
        }

        if (!address) {
            newError.address = "address is required..";
        }

        setError(newError);
        console.log("Error Length : ", Object.keys(newError).length);
        return Object.keys(newError).length;
    }

    // 100% Your Original Submit Logic[cite: 1]
    const studemtFormSubmit = (event: any) => {
        event.preventDefault();
        if (validation() !== 0) return;
        
        const studentData = { fName, lName, email, phone, gender, hobby, city, address };
        
        setAllStudents([...allStudents, studentData]);
        
        // Exact same reset logic[cite: 1]
        setFName(""); setLName(""); setEmail(""); setPhone(""); setGender(""); setHobby([]); setCity(""); setAddress("");
        setError({});
        toast.success("Freelancer Registered Successfully!");
    }

    return (
<div className="border-slate-300 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight">Expert Onboarding</h2>
            <form onSubmit={studemtFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">First Name</label>
                        <input type="text" value={fName} onChange={(e)=>setFName(e.target.value)} className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 ${error.fname ? 'border-red-200' : 'border-slate-100'}`} placeholder="Jane" />
                        {error.fname && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.fname}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Last Name</label>
                        <input type="text" value={lName} onChange={(e)=>setLName(e.target.value)} className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 ${error.lname ? 'border-red-200' : 'border-slate-100'}`} placeholder="Doe" />
                        {error.lname && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.lname}</p>}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Work Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 ${error.email ? 'border-red-200' : 'border-slate-100'}`} placeholder="jane@freelance.com" />
                    {error.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Contact Phone</label>
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 ${error.phone ? 'border-red-200' : 'border-slate-100'}`} placeholder="Contact number" />
                        {error.phone && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.phone}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Gender</label>
                        <div className="flex gap-6 py-3">
                            {["Male", "Female"].map(g => (
                                <label key={g} className="flex items-center gap-2.5 cursor-pointer group">
                                    <input type="radio" name="gender" value={g} checked={gender === g} onChange={(e)=>setGender(e.target.value)} className="w-4 h-4 accent-[#007A7C]" />
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-[#007A7C] transition-colors">{g}</span>
                                </label>
                            ))}
                        </div>
                        {error.gender && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.gender}</p>}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Skill Sets (Hobbies)</label>
                    <div className="flex flex-wrap gap-2.5">
                        {allHobby.map(h => (
                            <label key={h} className="cursor-pointer">
                                <input type="checkbox" value={h} checked={hobby.includes(h)} onChange={getStudentHobby} className="hidden peer" />
                                <span className="px-5 py-2.5 rounded-2xl border border-slate-200 text-xs font-black text-slate-500 peer-checked:bg-[#007A7C] peer-checked:text-white peer-checked:border-[#007A7C] transition-all block lowercase">{h}</span>
                            </label>
                        ))}
                    </div>
                    {error.hobby && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.hobby}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Operational City</label>
                    <select value={city} onChange={(e)=>setCity(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 cursor-pointer text-sm font-bold text-slate-700">
                        <option value="select">Select City</option>
                        {allCity.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {error.city && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.city}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">Portfolio/Address</label>
                    <textarea rows={2} value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 resize-none text-sm font-bold text-slate-700" placeholder="Brief about your work locations..." />
                    {error.address && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error.address}</p>}
                </div>

                <button type="submit" className="w-full py-5 bg-[#FF5C35] hover:bg-[#E04A25] text-white rounded-[1.25rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-orange-200 transition-all active:scale-[0.98] mt-6">
                    Add Expert Profile
                </button>
            </form>
        </div>
    );
}