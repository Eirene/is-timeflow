import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePDF = async (element: HTMLElement): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      allowTaint: true,
      scale: 2,
      logging: true,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      ignoreElements: (el) => el.classList.contains('no-export'),
    })

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgData = canvas.toDataURL('image/png')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`invoice_${new Date().toISOString().slice(0, 10)}.pdf`)
  } catch (error) {
    console.error('PDF generation error:', error)
    throw error
  }
}
