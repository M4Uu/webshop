import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-factura',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent {
  @Input() visible: boolean = false;
  @Input() cantidadTotal: boolean = false;
  @Input() venta: any;

  generateDate = () => new Date().toLocaleDateString();

  async generarPDF() {
    const element = document.getElementById('report-content');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = 297; // Altura A4 en mm
    const pageWidth = 210;  // Ancho A4 en mm

    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        windowWidth: element.scrollWidth,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let currentPage = 1;

      while (position < imgHeight) {
        if (currentPage > 1) {
          pdf.addPage();
        }

        const cropHeight = position + pageHeight > imgHeight
          ? imgHeight - position
          : pageHeight;

        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0,
          -position,
          imgWidth,
          imgHeight
        );

        position += pageHeight;
        currentPage++;
      }

      pdf.save(`factura-${this.venta.id}.pdf`);
    } else {
      console.log('No se encontró report-content');

    }
  }

}
