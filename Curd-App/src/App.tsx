import { ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";

export default function App() {
  // 100% Aapka Original Logic: Local storage se data fetch karna
  const [allStudents, setAllStudents] = useState<any[]>(
    JSON.parse(localStorage.getItem('students') || "[]")
  );

  // 100% Aapka Original Logic: Har update par save karna
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(allStudents));
  }, [allStudents]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Left Branding Section */}
        <div className="lg:col-span-4 lg:sticky lg:top-12 self-start space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Freelance <span className="text-[#FF5C35]">Expert</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm">
              Professional onboarding system with 100% accurate data validation.
            </p>
          </div>
          <img src="https://i.pinimg.com/736x/14/25/5b/14255bc204f7c9e49717495356ebd051.jpg" />
        </div>

        {/* Right Content Section */}
        <div className="lg:col-span-8 space-y-12">
          <Form allStudents={allStudents} setAllStudents={setAllStudents} />
          <Table allStudents={allStudents} />
        </div>
      </div>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}