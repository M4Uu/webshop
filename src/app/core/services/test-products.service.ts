import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestProductsService {
  private jewelryNames = [
    'Diamond Ring', 'Gold Necklace', 'Sapphire Earrings',
    'Pearl Bracelet', 'Ruby Pendant', 'Emerald Brooch',
    'Platinum Watch', 'Topaz Hairpin'
  ];
  private descriptions = [
    'Elegant design with sparkling diamonds. This is a description for Diamond Ring. It is a beautiful piece of jewelry.',
    'Handcrafted 24K gold necklace. This is a description for Gold Necklace. It is a stunning piece of jewelry.',
    'Exquisite sapphire stud earrings. This is a description for Sapphire Earrings. They are elegant and timeless.',
    'Freshwater pearl bracelet. This is a description for Pearl Bracelet. It is a classic piece of jewelry.',
    'Vibrant ruby pendant on gold chain. This is a description for Ruby Pendant. It adds a pop of color to any outfit.',
    'Vintage emerald and diamond brooch. This is a description for Emerald Brooch. It is a unique piece of jewelry.',
    'Luxury platinum automatic watch. This is a description for Platinum Watch. It is a high-end timepiece.',
    'Delicate topaz hair accessory. This is a description for Topaz Hairpin. It is a beautiful hair accessory.'
  ];

  private estado: any[] = [
    'Sin recoger',
    'Recogido',
    'Enviado',
    'Entregado',
    'Cancelado',
    'En espera',
    'Reembolsado',
    'En revisión'
  ]

  get() {
    const items: any[] = [];
    for (let index = 0; index < 8; index++) {
      items.push({
        id: index,
        nombre: this.jewelryNames[index] || `Jewelry Item ${index + 1}`,
        imagen_url: 'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
        precio: (index + 1) * 10,
        existencias: 10,
        descripcion: this.descriptions[index] || `Description for item ${index + 1}`,
        calificacion: Math.floor(Math.random() * 5) + 1,
        cantidad: 1,
        fecha_carrito: Date(),
        fecha_compra: Date(),
        estado: this.estado[Math.floor(Math.random() * this.estado.length)],
      });
    }
    return items;
  }

  getForm() {
    const items: any[] = [];
    for (let index = 0; index < 8; index++) {
      items.push({
        id: index,
        nombre: this.jewelryNames[index] || `Jewelry Item ${index + 1}`,
        imagen_url: 'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
        descripcion: this.descriptions[index] || `Description for item ${index + 1}`,
        cantidad: 1,
        fecha_pedido: Date(),
        fecha_entrega: Date(),
        estado: this.estado[Math.floor(Math.random() * this.estado.length)],
      });
    }
    return items;
  }
}
