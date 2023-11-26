import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  private apiUrl = 'https://dev-red-enfermedad.onrender.com';
  private apiUrl2 = 'https://api-skin-adminstrator.onrender.com';

  constructor(private http: HttpClient) { }

  predictImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.apiUrl + '/predict', formData);
  }


  prueba() {
    return this.http.get(this.apiUrl);
  }


  getenfermedadProductosD(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl2}/enfermedad_producto/es/${id}`);
  }

  getenfermedadRecomendacionsD(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl2}/enfermedad_recomendacion/es/${id}`);
  }
  getenfermedadtratamientosD(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl2}/enfermedad_tratamiento/es/${id}`);
  }

  getDermatologos(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl2}/dermatologo`);
  }

}
