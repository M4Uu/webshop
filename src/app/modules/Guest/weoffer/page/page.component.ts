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
})
export class PageComponent {
  dialog = inject(MatDialog);
  products = [
    {
      title: 'Libros y libretas',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 100
    },
    {
      title: 'Libros y libretas',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 300
    },
    {
      title: 'Libros y libretas',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 500
    },
    {
      title: 'Libros y libretas',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 700
    },
    {
      title: 'Libros y libretas',
      description: 'Mauris quam neque, ullamcorper sit amet lorem in, aliquet sagittis ante...',
      delay: 900
    },
    {
      title: 'Libros y libretas',
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
