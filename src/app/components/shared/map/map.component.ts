import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private lugares = [
    { nombre: "Zócalo", coords: [19.4326, -99.1332] as L.LatLngExpression },
    { nombre: "Chapultepec", coords: [19.4194, -99.1815] as L.LatLngExpression }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeMap();
    }
  }

  private async initializeMap(): Promise<void> {
    const L = await import('leaflet');
    this.fixLeafletIcons(L);
    this.createMap(L);
  }

  private fixLeafletIcons(L: any): void {
    const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/marker-icon.png';
    const shadowUrl = 'assets/leaflet/marker-shadow.png';

    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }



  private createMap(L: any): void {
    const markerPosition = [8.2580193, -62.8001552];

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.map = L.map('map', {
      preferCanvas: true,
      zoomControl: false
    }).setView(markerPosition, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.popup().setOptions({
      autoClose: false,
      closeOnClick: false,
      className: 'custom-popup'
    });


    const customIcon = L.icon({
      iconUrl: 'assets/marker-icon.png', // Ruta a tu imagen
      iconSize: [25, 41], // Tamaño del icono
      iconAnchor: [12, 41], // Punto de anclaje
      popupAnchor: [1, -34] // Donde se abre el popup
    });

    L.marker(markerPosition, { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Este es mi marcador personalizado')
      .openPopup();
  }
}
