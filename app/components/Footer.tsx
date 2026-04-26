import React from 'react';
import { Instagram, Facebook, HelpCircle, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f1f5f4] border-t border-stone-200 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Lado Esquerdo: Copyright + Branding */}
        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
          <span>© {currentYear}</span>
          
          <div className="flex items-center gap-1.5 ml-1">
            {/* Ícone de Coração em Verde (Teal) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-teal-600"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" />
            </svg>
            
            {/* Nome da Marca */}
           <span className="text-teal-600 font-bold">PETRESCUE</span>
          </div>

          <span className="hidden md:inline ml-1">• Todos os direitos reservados.</span>
        </div>

       {/* Lado Direito: Suporte (Interação via CSS Group - Sem JS State) */}
        <div className="group relative flex items-center gap-4">
          
          {/* Menu de Redes Sociais - Abre ao passar o mouse ou focar no Suporte */}
          <div className="flex items-center gap-4 opacity-0 invisible translate-x-4 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-300 ease-out">
            <a href="https://instagram.com" aria-label="Instagram" className="text-slate-400 hover:text-teal-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="text-slate-400 hover:text-teal-600 transition-colors">
              <Facebook size={20} />
            </a>
            <div className="h-4 w-[1px] bg-stone-300 mx-1"></div>
          </div>
          <div className="flex items-center gap-2 text-slate-600 group-hover:text-teal-600 font-bold text-sm cursor-pointer transition-colors">
            <span>Suporte</span>
            <div className="relative">
              <MessageCircle size={18} className="text-orange-500 group-hover:rotate-12 transition-transform" />
              {/* Ping de notificação decorativo */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}