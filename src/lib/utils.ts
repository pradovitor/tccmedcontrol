
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Adiciona estilos de impressão globais quando o documento é impresso
export function setupPrintStyles() {
  // Estilos CSS para impressão
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      /* Oculta elementos que não devem ser impressos */
      nav, footer, button, .no-print {
        display: none !important;
      }
      
      /* Garante que o conteúdo da página caiba bem no papel */
      body {
        width: 100%;
        margin: 0;
        padding: 0;
      }
      
      /* Força cores de fundo e cores de texto para melhor legibilidade */
      * {
        color: black !important;
        background: white !important;
        box-shadow: none !important;
      }
      
      /* Melhora o layout para impressão */
      .print-container {
        width: 100%;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      /* Ajuste de tamanho para telas */
      @page {
        size: auto;
        margin: 10mm;
      }
    }
  `;
  document.head.appendChild(style);
}

// Inicializa os estilos de impressão
if (typeof window !== 'undefined') {
  setupPrintStyles();
}
