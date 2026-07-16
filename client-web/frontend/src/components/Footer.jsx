import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200/60 px-8 py-5 font-sans w-full shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-slate-800 text-sm tracking-tight">
            BusinessHub
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-slate-400">
            © 2026 Inc. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <span className="text-slate-200">•</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <span className="text-slate-200">•</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
        </div>
        <div className="flex gap-2.5">
          <a 
            href="#" 
            aria-label="Facebook" 
            className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center text-xs border border-slate-100"
          >
            <FaFacebookF />
          </a>
          <a 
            href="#" 
            aria-label="X" 
            className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center text-xs border border-slate-100"
          >
            <FaXTwitter />
          </a>
          <a 
            href="#" 
            aria-label="LinkedIn" 
            className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-700 transition-all flex items-center justify-center text-xs border border-slate-100"
          >
            <FaLinkedinIn />
          </a>
          <a 
            href="#" 
            aria-label="GitHub" 
            className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center text-xs border border-slate-100"
          >
            <FaGithub />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;