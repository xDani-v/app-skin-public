import { Component } from '@angular/core';
import { ComunicatorsService } from '../services/comunicators.service';
import { PrediccionService } from '../services/prediccion.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {
  tratamientos = [];
  recomendaciones = [];
  productos = [];

  listaActual: any[] = [];
  indiceActual = 0;

  //Botones de estados
  verTratamientos: boolean = false;
  verRecomendaicon: boolean = false;
  verProductos: boolean = false;


  constructor(private comunicatorsService: ComunicatorsService, private predictService: PrediccionService) { }



  ngOnInit() {
    console.log('information')
    //Respuesta del comunicador
    this.comunicatorsService.idInformation.subscribe(({
      next: (resp) => {
        if (resp != null) {
          this.cargarInformation(resp);
        }
      },
      error: (error) => {
        console.log('error', error)
      }
    }))
  }


  cargarInformation(id: number) {
    this.predictService.getenfermedadtratamientosD(id).subscribe({
      next: (resp) => {
        this.tratamientos = resp as any;
        console.log('tramientos ', this.tratamientos)
      },
      error: (error) => {
        console.log('error od api rest ', error)
      }
    })

    this.predictService.getenfermedadRecomendacionsD(id).subscribe({
      next: (resp) => {
        this.recomendaciones = resp as any;
        console.log('recomendacion ', this.recomendaciones)
      },
      error: (error) => {
        console.log('error od api rest ', error)
      }
    })

    this.predictService.getenfermedadProductosD(id).subscribe({
      next: (resp) => {
        this.productos = resp as any;
        console.log('productos ', this.productos)
      },
      error: (error) => {
        console.log('error od api rest ', error)
      }
    })
  }

  mostrarInformation(param: string) {
    if (param == "tratamiento") {

      if (this.verTratamientos == true) {
        this.verTratamientos = false;
      } else {
        this.verTratamientos = true;
        this.verRecomendaicon = false;
        this.verProductos = false;
      }
    }
    if (param == "recomendacion") {

      if (this.verRecomendaicon == true) {
        this.verRecomendaicon = false;
      } else {
        this.verRecomendaicon = true;
        this.verTratamientos = false;
        this.verProductos = false;
      }
    }
    if (param == "producto") {
      if (this.verProductos == true) {
        this.verProductos = false;
      } else {
        this.verProductos = true;
        this.verTratamientos = false;
        this.verRecomendaicon = false;
      }

    }
  }

  mostrarDermatologos() {
    window.open('http://localhost:4200/dermatologos');
  }

}
