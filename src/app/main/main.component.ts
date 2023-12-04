import { Component, ViewChild, ElementRef } from '@angular/core';
import { PrediccionService } from '../services/prediccion.service';
import { ComunicatorsService } from '../services/comunicators.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  imageSrc: string | ArrayBuffer | null | undefined = null;
  selectedImageFile: File | null = null;
  webcamActive: boolean = false;
  webcamStream: MediaStream | null | undefined = null;
  @ViewChild('videoElement') videoElement: any;

  //Objeto con la informacion que viene de la api
  information = {
    id: 0,
    description: '',
    confidence: 0
  }


  constructor(private predictionService: PrediccionService,
    private comunicatorsService: ComunicatorsService) { }

  enfermedad: any = "No se ha realizado analisis";
  indice: any = "No se ha realizado analisis";;

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedImageFile = selectedFile; // Almacena el archivo seleccionado
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  openWebcam() {
    if (!this.webcamActive) { // Verificar si la webcam no está activa
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.webcamStream = stream;
          this.webcamActive = true;
          const videoElement = this.videoElement.nativeElement;
          videoElement.srcObject = stream;
          videoElement.play();
        })
        .catch((error) => {
          console.error('Error al acceder a la webcam: ', error);
        });
    } else { // Si la webcam ya está activa, detener la transmisión y ocultar el elemento de video
      this.webcamStream!.getVideoTracks()[0].stop();
      this.videoElement.nativeElement.style.display = 'none';
      this.webcamActive = false;
    }
  }

  capturePhoto() {
    if (this.webcamActive && this.webcamStream) {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        this.imageSrc = canvas.toDataURL('image/png');

        this.convertImageSrcToFile(this.imageSrc);
        // Detener la transmisión y eliminar el elemento de video
        this.webcamStream.getVideoTracks()[0].stop();
        this.videoElement.nativeElement.style.display = 'none';
        this.webcamActive = false;
      }
    }
  }

  loadImage() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const selectedFile = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target?.result;
        };
        reader.readAsDataURL(selectedFile);
      }
    };
    inputElement.click();
  }

  async predictImage() {

    if (this.selectedImageFile) {

      this.predictionService.predictImage(this.selectedImageFile).subscribe({
        next: (resp) => {
          let respuesta = resp as any;
          if (respuesta['confidence'] >= 0.80) {
            this.information.id = respuesta['index'];
            this.information.description = respuesta['class'];
            this.information.confidence = respuesta['confidence'];
            // Envío por el comunicador mi id
            this.comunicatorsService.idInformation.next(this.information.id + 1);
          } else {
            // Manejar el caso en el que no se detecta ninguna enfermedad
            this.information.description = 'No se ha detectado ninguna enfermedad';
            this.information.confidence = 0;
            this.comunicatorsService.idInformation.next(0); // Ajusta según tus necesidades
          }
        },
        error: (error) => {
          console.log('Error of api rest ', error);
        }
      })


    } else {
      console.error('No se ha seleccionado una imagen.');
    }
  }

  convertImageSrcToFile(imageSrc: string) {
    const base64Data = imageSrc; // Asume que imageSrc es un string en formato base64
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Crea un objeto File a partir del Blob
    const fileName = 'captured-image.png'; // Nombre de archivo deseado
    const file = new File([blob], fileName, { type: 'image/png' });

    this.selectedImageFile = file;
  }

  test() {
    this.predictionService.prueba().subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

}
