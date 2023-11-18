import { Component } from '@angular/core';
import { PrediccionService } from '../services/prediccion.service';
@Component({
  selector: 'app-paneldermatologo',
  templateUrl: './paneldermatologo.component.html',
  styleUrls: ['./paneldermatologo.component.css']
})
export class PaneldermatologoComponent {

  constructor(private predictService: PrediccionService) { }

  dermatologos: any = [];
  provincias: any = [];
  provinciaSeleccionada: any = '';
  dermatologosFiltrados: any = [];

  ngOnInit() {
    this.predictService.getDermatologos().subscribe({
      next: (resp) => {
        this.dermatologos = resp as any;
        this.provincias = [...new Set(this.dermatologos.map((dermatologo: any) => dermatologo.provincia))];
      },
      error: (error) => {
        console.log('error od api rest ', error);
      }
    });
  }

  filtrarDermatologosPorProvincia() {
    console.log('Provincia seleccionada:', this.provinciaSeleccionada);
    console.log('Dermatologos:', this.dermatologos);
    this.dermatologosFiltrados = this.dermatologos.filter((dermatologo: any) => {
      console.log('Provincia del dermatologo:', dermatologo.provincia);
      return dermatologo.provincia === this.provinciaSeleccionada;
    });
    console.log('Dermatologos filtrados:', this.dermatologosFiltrados);
  }

  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }
}
