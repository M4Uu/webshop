import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { UsersService } from '@app/core/services/api/users.service';
import { VentasService } from '@app/core/services/api/ventas.service';
import { MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
  private APIventas = inject(VentasService);
  private APIusers = inject(UsersService);
  private messageService = inject(MessageService);

  public data: any;
  public reportes: any[] = [];
  public options: any;
  platformId = inject(PLATFORM_ID);

  public ventas_ultimo_mes: number = 0;
  public pedidos_ultima_semana: number = 0;
  public selectedMessage: string = '';

  @ViewChild('op') op!: Popover;
  getMessage(event: any, message: string) {
    this.selectedMessage = message;
    this.op.show(event)
  }

  ngOnInit(): void {
    this.APIventas.analiticas().subscribe({
      next: (response) => {
        this.initChart(response.data);
        this.ventas_ultimo_mes = response.data.ventas_ultimo_mes;
        this.pedidos_ultima_semana = response.data.pedidos_ultima_semana;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })

    this.APIusers.getReportes().subscribe({
      next: (response) => this.reportes = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }

  initChart(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          // {
          //   label: 'Visitas',
          //   fill: false,
          //   borderColor: documentStyle.getPropertyValue('--p-sky-500'),
          //   yAxisID: 'y',
          //   tension: 0.4,
          //   data: [65, 59, 80, 81, 56, 55, 10]
          // },
          {
            label: 'Ventas',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-emerald-500'),
            yAxisID: 'y1',
            tension: 0.4,
            data: data.ventas_por_mes
          },
          {
            label: 'Pedidos',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-indigo-500'),
            yAxisID: 'y1',
            tension: 0.4,
            data: data.pedidos_por_mes
          }
        ]
      };

      this.options = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
              color: textColorSecondary
            },
            grid: {
              drawOnChartArea: false,
              color: surfaceBorder
            }
          }
        }
      };
    }
  }
}
