import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/Navbar";

// FIX: CSS ko directly import karein, variable assignment ki zaroorat nahi hai
import "./globals.css"; 

export const metadata = {
  title: "Bike Showroom",
  description: "Manage your premium machine inventory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 
        Tip: Agar fonts ya hydration issues aayein toh 
        body mein `suppressHydrationWarning` add kar sakte hain 
      */}
      <body className="antialiased">
        <NavBar />
        
        {/* Main content wrapper */}
        <main>
          {children}
        </main>

        {/* Toast notifications */}
        <ToastContainer 
          position="bottom-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" 
        />
      </body>
    </html>
  );
}