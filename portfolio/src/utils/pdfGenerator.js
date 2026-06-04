import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const generateCVPDF = async () => {
  try {
    const element = document.getElementById('cv-content')
    
    if (!element) {
      console.error('CV content not found')
      return
    }

    // Hide nav while capturing
    const navElements = document.querySelectorAll('nav')
    navElements.forEach(nav => nav.style.display = 'none')

    // Capture the content as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    // Restore nav
    navElements.forEach(nav => nav.style.display = '')

    // Create PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210 - 30 // A4 width minus margins
    const pageHeight = 297 - 30 // A4 height minus margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 15 // Top margin

    // Add pages as needed
    pdf.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 15
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('Toby-Goldsmith-CV.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}
