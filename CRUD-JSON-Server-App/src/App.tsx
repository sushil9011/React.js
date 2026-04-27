import { Outlet } from "react-router";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import './index.css';

// --- YEH LINE ADD KARNA SABSE ZAROORI HAI ---
import 'react-toastify/dist/ReactToastify.css'; 
// -------------------------------------------

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* ToastContainer ko sabse upar rakhna best practice hai */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="colored"
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Header />

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Container for the Outlet content */}
        <div className="min-h-[500px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}