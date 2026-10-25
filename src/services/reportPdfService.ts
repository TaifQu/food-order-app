import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const reportPdfService = {
  /**
   * Generates and downloads a real .pdf file directly using jsPDF + html2canvas
   */
  async generateDirectPdf(
    containerElement: HTMLElement,
    onProgress?: (msg: string, percent: number) => void
  ): Promise<void> {
    const pageElements = containerElement.querySelectorAll<HTMLElement>('section');
    if (!pageElements || pageElements.length === 0) {
      throw new Error('No page sections found in report container');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const totalPages = pageElements.length;

    for (let i = 0; i < totalPages; i++) {
      const pageEl = pageElements[i];
      if (onProgress) {
        onProgress(`Rendering Page ${i + 1} of ${totalPages}...`, Math.round(((i + 1) / totalPages) * 90));
      }

      // Render page canvas with high scale for crisp text
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Fit image onto A4 page with 5mm margin
      const margin = 5;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, Math.min(contentHeight, pdfHeight - margin * 2));
    }

    if (onProgress) {
      onProgress('Finalizing and saving PDF file...', 100);
    }

    pdf.save('SEP-G1_Roll41_Food_Order_Menu_Project_Report.pdf');
  },

  /**
   * Downloads a standalone, offline HTML file containing all 10 pages and print styles
   */
  downloadStandaloneHtml(containerElement: HTMLElement): void {
    const content = containerElement.innerHTML;
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SEP-G1 Roll 41 - Food Order Menu Management System Report</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      @page { margin: 1.2cm; size: A4 portrait; }
      body { background: white !important; color: black !important; }
      .print\\:hidden { display: none !important; }
      .print\\:page-break-after { page-break-after: always; break-after: page; }
    }
    body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f4; color: #1c1917; }
  </style>
</head>
<body class="p-4 sm:p-10">
  <div class="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-xl rounded-xl">
    <div class="print:hidden mb-6 p-4 bg-amber-500/10 border border-amber-500 rounded-xl flex items-center justify-between">
      <div>
        <h3 class="font-bold text-amber-900">Academic Project Report (10 Pages)</h3>
        <p class="text-xs text-amber-800">Press Ctrl+P (or Cmd+P on Mac) to print or save as PDF.</p>
      </div>
      <button onclick="window.print()" style="background:#f59e0b;color:#000;font-weight:bold;padding:8px 16px;border-radius:8px;border:none;cursor:pointer;">
        Print / Save PDF
      </button>
    </div>
    ${content}
  </div>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SEP-G1_Roll41_Food_Order_Menu_Project_Report.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Opens the report in a new browser tab where native window.print() can run outside the iframe
   */
  openInNewTabForPrint(containerElement: HTMLElement): void {
    const content = containerElement.innerHTML;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup was blocked by your browser. Please allow popups or use the "Download PDF Directly" button.');
      return;
    }

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Print Food Order Menu Report (Group SEP-G1)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      @page { margin: 1cm; size: A4 portrait; }
      body { background: white !important; color: black !important; }
      .print\\:hidden { display: none !important; }
      .print\\:page-break-after { page-break-after: always; break-after: page; }
    }
  </style>
</head>
<body class="p-8 bg-white text-stone-900">
  <div class="max-w-4xl mx-auto">
    ${content}
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`);
    printWindow.document.close();
  },
};
