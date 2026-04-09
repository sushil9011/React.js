import { ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";

export default function App() {
  const [allStudents, setAllStudents] = useState<any[]>(
    JSON.parse(localStorage.getItem('students') || "[]")
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editStudent, setEditStudent] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(allStudents));
  }, [allStudents]);

  const deleteStudent = (index: number) => {
    setAllStudents((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStudent = (index: number) => {
    setEditIndex(index);
    setEditStudent(allStudents[index]);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-12 self-start space-y-8">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Freelance <span className="text-[#FF5C35]">Expert</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">Professional onboarding system.</p>
            <img src="https://i.pinimg.com/736x/14/25/5b/14255bc204f7c9e49717495356ebd051.jpg" className="rounded-3xl" />
        </div>

        <div className="lg:col-span-8 space-y-12">
          <Form 
            allStudents={allStudents} 
            setAllStudents={setAllStudents} 
            editStudent={editStudent}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            setEditStudent={setEditStudent}
          />
          <Table 
            allStudents={allStudents} 
            deleteStudent={deleteStudent} 
            updateStudent={updateStudent} 
          />
        </div>
      </div>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}