import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportPDF(elementId: string, filename: string) {

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // En-tête
  pdf.setFontSize(14);
  pdf.text("Rapport OGSL – Export PDF", 10, 10);

  // Date
  const date = new Date().toLocaleString();
  pdf.setFontSize(10);
  pdf.text(`Exporté le : ${date}`, 10, 17);

  // Image du contenu
  pdf.addImage(imgData, "PNG", 10, 25, pdfWidth - 20, pdfHeight);

  pdf.save(`${filename}.pdf`);
}
