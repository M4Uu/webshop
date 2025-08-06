import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeMap();
    }
  }

  private async initializeMap(): Promise<void> {
    const L = await import('leaflet');
    await this.loadLeafletAssets(); // Nueva función para cargar assets
    this.createMap(L);
  }

  private async loadLeafletAssets(): Promise<void> {
    // Carga explícita de módulos necesarios
    await import('leaflet-defaulticon-compatibility');
  }

  private createMap(L: any): void {
    const markerPosition = [8.2580193, -62.8001552];

    // delete (L.Icon.Default.prototype as any)._getIconUrl;
    // L.Icon.Default.mergeOptions({
    //   iconRetinaUrl: 'assets/marker-icon-2x.png',
    //   iconUrl: 'assets/marker-icon.png',
    //   shadowUrl: 'assets/marker-shadow.png',
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   shadowSize: [41, 41]
    // });

    this.map = L.map('map', {
      preferCanvas: true,
      zoomControl: false,
      tap: false,
      touchZoom: 'center',
      bounceAtZoomLimits: false
    }).setView(markerPosition, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'assets/marker-icon.png', // Asegura que la ruta sea correcta
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    L.marker(markerPosition, { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Estamos aquí!', {
        autoClose: false,
        closeOnClick: false,
        className: 'custom-popup'
      })
      .openPopup();

    L.Popup.prototype.options.autoClose = false;
    L.Popup.prototype.options.closeOnClick = false;
  }
}
