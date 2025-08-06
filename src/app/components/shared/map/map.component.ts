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
    // 1. Importar Leaflet correctamente
    const leafletModule = await import('leaflet');
    const L = leafletModule.default || leafletModule;

    // 2. Verificar que el contenedor del mapa existe
    if (!document.getElementById('map')) {
      console.error('Elemento #map no encontrado en el DOM');
      return;
    }

    // 3. Crear mapa después de verificar Leaflet
    this.createMap(L);
  }

  private createMap(L: any): void {
    const markerPosition = [8.2580193, -62.8001552];

    // 4. Solución para iconos en producción
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';

    // 5. Verificar que Leaflet está cargado
    if (!L || typeof L.map !== 'function') {
      console.error('Leaflet no se cargó correctamente', L);
      return;
    }

    try {
      // 6. Crear mapa con manejo de errores
      this.map = L.map('map', {
        preferCanvas: true,
        zoomControl: false,
        tap: false,
        touchZoom: 'center',
        bounceAtZoomLimits: false
      }).setView(markerPosition, 16);

      // 7. Añadir capa de tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // 8. Crear marcador con URLs absolutas
      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: shadowUrl,
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

      // 9. Configurar popups
      L.Popup.prototype.options.autoClose = false;
      L.Popup.prototype.options.closeOnClick = false;

    } catch (error) {
      console.error('Error al crear el mapa:', error);
    }
  }
}
