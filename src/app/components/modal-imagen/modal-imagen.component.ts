import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir:File;
  public imgTemp:any=null;

  constructor(public modalImagenService:ModalImagenService, public fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }


  cerrarModal(){
    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event:any){
    this.imagenSubir=event.files[0];

    if(!event.files[0]){
      return this.imgTemp=null;
    }

    const reader=new FileReader();
    reader.readAsDataURL(event.files[0]);

    reader.onloadend=()=>{

      this.imgTemp=reader.result;
    }

  }


  subirImagen(){

    const id=this.modalImagenService.id;
    const tipo=this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo ,id).then(resp=>{
      Swal.fire("Guardado", "La imagen se ha actulizado correctamente", 'success');
      this.modalImagenService.nuevaImagen.emit(resp);
      this.cerrarModal();

    }).catch((err)=>{
      Swal.fire("Error", "No se pudo subir la imagen", 'error')
    });
  }

}
