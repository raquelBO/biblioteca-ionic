import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Autor } from 'src/app/interface/autor.interface';
import { AutoresService } from 'src/app/servicios/autores.service';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.scss'],
})
export class FormularioLibroComponent implements OnInit {

  public listaAutores: Autor[] = [];

  public id: number | null = null;
  public titulo: string | null = null;
  public idautor: number | null = null;
  public paginas: number | null = null;

  public idValidado: boolean = true;
  public tituloValidado: boolean = true;
  public idAutorValidado: boolean = true;
  public paginasValidado: boolean = true;

  constructor(
    private servicioAutores: AutoresService,
    private servicioToast: ToastController
  ) { }

  private cargarAutores(){
    this.servicioAutores.get().subscribe({
      next: (autores) => {
        this.listaAutores = autores;
      },
      error: (e) => {
        console.error('Error al cargar Autores, e');
        this.servicioToast.create({
          header: 'Error al cargar Autores',
          message: e.error,
          color: 'danger'
        })
      }
    });

  }

  ngOnInit() {
    this.cargarAutores();
  }

  guardar(){
    this.validar();
  }

  private validar(): boolean{
    this.idValidado = this.id !== null;
    this.tituloValidado = this.titulo !== null && this.titulo.length > 0;
    this.idAutorValidado = this.idautor !== null;
    this.paginasValidado = this.paginas !== null && this.paginas > 0;
    return this.idValidado && this.tituloValidado && this.idAutorValidado && this.paginasValidado;
  }

}
