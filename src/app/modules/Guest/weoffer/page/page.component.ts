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
      title: 'Joyería y olfebrería',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 100
    },
    {
      title: 'Bisutería de calidad',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 300
    },
    {
      title: 'Pantalones a la moda',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 500
    },
    {
      title: 'Accesorios con el mayor estilo',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 700
    },
    {
      title: 'Maquillaje para ti',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 900
    },
    {
      title: '¡Y mucho más!',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 1100
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
