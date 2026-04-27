
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { themeChanger } from '../features/theme/themeSlice';

export default function Header() {
    const theme = useSelector((state: RootState) => state.themeReducer.theme);
    const dispatch = useDispatch();
    const isDark = theme === 'dark';

    return (
        <header className={`sticky top-0 z-[100] w-full border-b transition-all duration-300 backdrop-blur-md 
            ${isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200/60 bg-white/80'}`}>
            
            <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
                
                {/* Brand - Using <a> to avoid Router Error */}
                <a href="/" className="flex items-center gap-2 group">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-white font-black text-sm italic">V</span>
                    </div>
                    <span className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        VeloCity<span className="text-indigo-600">.</span>
                    </span>
                </a>
                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    

                    {/* Theme Toggle Button */}
                    <button 
                        onClick={() => dispatch(themeChanger())}
                        className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all border
                            ${isDark ? 'border-slate-800 text-yellow-400 bg-slate-900 hover:bg-slate-800' : 'border-slate-200 text-slate-500 bg-white hover:bg-slate-50'}`}
                    >
                        <span className="text-lg">{isDark ? '☼' : '☾'}</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}