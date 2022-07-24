import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsurio().then(usuario=>console.log(usuario));

    //Ejemplo de promesas

  /*   const promesa=new Promise((resolve, reject)=>{
      if(false){
        resolve('hola mundo')
      }else{
        reject('Algo salio mal');
      }
    });
    promesa.then((mensaje)=>{
        console.log(mensaje);
    }).catch(err=>console.log(err))

    console.log("Fin init") */

  }

  
  getUsurio(){
  
    return new Promise((resolve, reject)=>{
      fetch('https://reqres.in/api/users')
      .then(resp=>resp.json())
      .then(body=>resolve(body.data));
    });



  
  }


}
