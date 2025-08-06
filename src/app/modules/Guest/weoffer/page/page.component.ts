import { Component, inject } from '@angular/core';
import { LoginComponent } from '../../../../components/features/AuthUser/login/login.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-page',
  host: {
    'data-component': 'weoffer'
  },
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent {
  dialog = inject(MatDialog);
  products = [
    {
      title: 'Orfebrería y bisutería',
      description: 'Joyas artesanales en plata, oro y piedras preciosas para ocasiones especiales.',
      delay: 100
    },
    {
      title: 'Ropa y calzado',
      description: 'Moda con diseños exclusivos y calzado cómodo para todas las temporadas.',
      delay: 300
    },
    {
      title: 'Maquillaje',
      description: 'Productos para realzar tu belleza natural diaria.',
      delay: 500
    },
    {
      title: 'Artículos para el cuidado personal',
      description: 'Cosméticos para tu rutina diaria de belleza y bienestar.',
      delay: 700
    },
    {
      title: '¡Y mucho más!',
      description: 'Descubre nuestra exclusiva selección de accesorios y productos únicos para ti.',
      delay: 900
    },
  ];

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del login:', result);
        // Aquí puedes manejar el login
      }
    });
  }
}
