import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { decrement, increment, reset } from "./features/counter/counterSlice";
import Header from "./components/Header";

export default function App() {
  const counter = useSelector((state: RootState) => state.counterReducer.counter);
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans
      ${isDark ? 'bg-[#030712]' : 'bg-slate-50'}`}>

      {/* Subtle Background Blobs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>

      <Header />

      <main className="relative flex flex-col items-center justify-center pt-24 px-6">
        <div className={`w-full max-w-sm p-10 text-center rounded-[2.5rem] transition-all duration-500
          ${isDark 
            ? 'bg-slate-900/40 border border-slate-800 shadow-2xl' 
            : 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50'}`}>

          <header className="mb-8">
            <span className="text-[10px] font-black tracking-[0.3em] text-indigo-500 uppercase">
              System Core
            </span>
            <h2 className={`text-2xl font-black tracking-tight mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Redux Counter
            </h2>
          </header>

          {/* Minimal Counter Display */}
          <div className="relative py-12">
            <span className={`absolute inset-0 flex items-center justify-center text-8xl font-black opacity-[0.03] select-none ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {counter}
            </span>
            <h3 className={`text-7xl font-black tracking-tighter relative transition-all duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {counter}
            </h3>
          </div>

          {/* Refined Controls */}
          <div className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => dispatch(increment())}
                className="bg-indigo-600 text-white font-black text-xs py-4 rounded-2xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95 uppercase tracking-widest"
              >
                Up
              </button>
              <button
                onClick={() => dispatch(decrement())}
                className={`font-black text-xs py-4 rounded-2xl border transition-all active:scale-95 uppercase tracking-widest
                  ${isDark 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              >
                Down
              </button>
            </div>

            <button
              onClick={() => dispatch(reset())}
              className="w-full text-[10px] font-black py-2 text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-[0.2em]"
            >
              Reset Cycle
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}