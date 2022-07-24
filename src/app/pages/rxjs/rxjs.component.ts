import { Component, OnDestroy, OnInit } from '@angular/core';
import { retry,map,take, filter } from 'rxjs/operators';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs!:Subscription;

  constructor() {


/* 
    this.retornaObservable().pipe(
      retry()
      
    ).subscribe({
      next: (valor) => console.log("Subs:", valor),
      error: (err) => console.log("Error" + err),
      complete: () => console.info('Obs terminado')
    }); */
    this.intervalSubs=this.retornaIntervalo().subscribe(console.log)
  }
  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo():Observable<number>{
    return interval(500)
      .pipe(
       // take(10),
       map(valor=>valor+1),
       filter(valor => (valor%2===0)?true:false),
      

        );
  } 


  retornaObservable() {
 

    let i = -1;

    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error("i llego al valor 2")
        }

      }, 1000)

    });

  }


}
