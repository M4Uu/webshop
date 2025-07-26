import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '@app/core/services/api/productos.service';
import { MessageService } from 'primeng/api';
import { ToolkitService } from '@app/core/services/api/toolkit.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { FileUpload } from 'primeng/fileupload';
import { CategoriaService } from '@app/core/services/api/categoria.service';

@Component({
  selector: 'app-form-productos',
  imports: [
    FormsModule,
    CommonModule,
    FloatLabelModule,
    MultiSelectModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    SelectModule,
    FileUpload
  ],
  templateUrl: './form-productos.component.html',
  styleUrl: './form-productos.component.scss'
})
export class FormProductosComponent implements OnInit, OnDestroy {
  private APIProductos = inject(ProductosService)
  private APIToolkit = inject(ToolkitService);
  private APICategoria = inject(CategoriaService)
  private authService = inject(AuthService);

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private index = this.route.snapshot.paramMap.get('id');

  public user = this.authService.loadSessionStorage();
  public messageService = inject(MessageService);
  public getUploadImgUrl = this.APIToolkit.uploadImgUrl;
  public productoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    existencias: [0, [Validators.required]],
    precio: [0, [Validators.required]],
    categoria_id: [[], [Validators.required]],
    imagen_url: ['https://link.storjshare.io/raw/15M6fjomdWMwh4cdbZx5YmDQpQsc8EN73sYKcfLodh6yz6PXEbNJe1WKFvKrwMotebVhRWPiihQoPEuKkaEt1reW5WhPwipmRZnqcfnA5Fq2A5NiMhief8rTrMtFWLimZCkGJp8CqpyA3CkXQZ6tZYrK5sC4Lgksbiq9BMwKnfxXWdH4smKmVNMgYkLyuEiA6gp6eJQv3dqPJnr7SrWepmbKTYQvSQTizqxxTrgj2HDLu6pde6NtYYbAmLArVx5W2fNNVg31w7Kc9nsReNx1HLf5yBhF9v7x9/tesis-webshop-bucket/default-image-product.webp', [Validators.required]]
  });
  public categorias: any[] = [];

  public isCreate = this.index == 'create';
  public editar: boolean = false;

  ngOnInit(): void {
    this.APICategoria.getCategoria().subscribe({
      next: (response) => {
        this.categorias = response.data;
        if (this.isCreate) {
          this.editar = true;
          this.productoForm = this.fb.group({
            nombre: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            existencias: [0, [Validators.required]],
            precio: [0, [Validators.required]],
            categoria_id: [[], [Validators.required]],
            imagen_url: ['https://link.storjshare.io/raw/15M6fjomdWMwh4cdbZx5YmDQpQsc8EN73sYKcfLodh6yz6PXEbNJe1WKFvKrwMotebVhRWPiihQoPEuKkaEt1reW5WhPwipmRZnqcfnA5Fq2A5NiMhief8rTrMtFWLimZCkGJp8CqpyA3CkXQZ6tZYrK5sC4Lgksbiq9BMwKnfxXWdH4smKmVNMgYkLyuEiA6gp6eJQv3dqPJnr7SrWepmbKTYQvSQTizqxxTrgj2HDLu6pde6NtYYbAmLArVx5W2fNNVg31w7Kc9nsReNx1HLf5yBhF9v7x9/tesis-webshop-bucket/default-image-product.webp', [Validators.required]]
          });
        } else {
          this.APIProductos.getProductosById(Number(this.index)).subscribe({
            next: (response) => {
              const producto = response.data[0];
              this.productoForm = this.fb.group({
                id: [producto.id, [Validators.required]],
                nombre: [producto.nombre, [Validators.required]],
                descripcion: [producto.descripcion, [Validators.required]],
                existencias: [producto.existencias, [Validators.required]],
                precio: [producto.precio, [Validators.required]],
                categoria_id: [this.categorias.find(value => value.code == producto.categoria_id), [Validators.required]],
                imagen_url: [producto.imagen_url, [Validators.required]]
              })
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
          })
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 })
    })


  }

  onSubmit() {
    this.editar = false;
    this.productoForm.value.categoria_id = this.productoForm.value.categoria_id.code
    if (this.isCreate) {
      this.APIProductos.createProducto(this.productoForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Producto creado', detail: 'El producto se creó correctamente.' });
          this.productoForm.reset();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el producto, intente más tarde.', life: 3000 })
      });
    } else {
      this.APIProductos.updateProducto(this.productoForm.value).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Producto actualizado', detail: 'El producto se actualizó correctamente.' }),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el producto, intente más tarde.', life: 3000 })
      });

    }

  }

  onEdit() {
    this.editar = !this.editar;
    this.editar ?
      this.messageService.add({ severity: 'contrast', summary: 'Editar', detail: 'Modo edición.' })
      : this.messageService.add({ severity: 'contrast', summary: 'Visualiar', detail: 'Modo visualización.' });
  }


  @ViewChild('fileUpload') fileUpload!: FileUpload;
  public onSelectedFiles(event: any) {
    setTimeout(() => {
      if (event.currentFiles && event.currentFiles.length > 0) {
        this.fileUpload.upload();
      }
    }, 100);
  }

  handleUploadResponse(event: any) {
    if (event.originalEvent?.body) {
      try {
        const response = event.originalEvent.body.data;
        if (response.url) {
          this.productoForm.value.imagen_url = response.url;
          this.messageService.add({ severity: 'success', summary: 'Imagen actualizada', detail: 'La foto del producto se actualizó correctamente' });
        } else {
          console.error('Respuesta inesperada:', response);
          this.messageService.add({ severity: 'error', summary: 'Error de subida', detail: 'Error al intentar subir la imágen, comunicarse con la administración.' });
        }
      } catch (error) {
        console.error('Error procesando respuesta:', error);
        this.messageService.add({ severity: 'error', summary: 'Error con el servidor', detail: 'Error al intentar contactar con el servidor, intente más tarde.' });
      }
    }
    this.fileUpload.clear();
  }

  public selectEvent(choose: any, clear: any) {
    if (this.editar) {
      clear();
      choose();
    }
  }


  ngOnDestroy() {
    this.productoForm.reset();
    this.editar = false;
  }
}
