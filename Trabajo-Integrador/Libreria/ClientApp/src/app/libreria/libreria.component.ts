import { Component, OnInit } from '@angular/core';
import { Libreria } from '../modelos/libreria';
// import { LibreriaService } from '../servicios/libreria.service';
import { ListadoService } from '../servicios/listado.service'

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})
export class LibreriaComponent implements OnInit {

  public ListadoLibreria: Libreria[];
  public UnaLibreria: Libreria;
  public campobuscado: string;
  title = 'proxy'


  constructor( private servicioListado: ListadoService) { }

  ngOnInit() {

    this.CargarListado()

  }
 
  CargarListado() {

    this.servicioListado.MostrarTodos().subscribe(
      data => {
        this.ListadoLibreria = data

      }
    );
  }
  
  Borrar(libreriaId: number) {
    this.servicioListado.Borrar(libreriaId).subscribe(
      data => {
        this.CargarListado() 
      },
      err => console.log(err)
    );
  }



  BuscarLibreria() {
    if(this.campobuscado != null && this.campobuscado != "" ){
      this.servicioListado.BuscarPorNombre(this.campobuscado).subscribe(
        data => {
          this.ListadoLibreria = data
        },
        err => console.log(err)
      );
    }else{
      this.CargarListado()
    }
    
  }

  // verificarEstado(libreriaId: number) {
  //   var libreria = this.servicioListado.Buscar(libreriaId).subscribe(
  //     dato=>{
  //          if (libreria.descuento) {
  //     alert("La libreria tiene descuentos");
  //   }
  //   else {
  //     alert("La libreria no tiene descuentos")
  //   }
  //     }
  //   )
  // }

  EstaCerrado(horario: string): void {

    var apertura: number = parseInt((horario.split('a')[0]).trim());
    var cierre: number = parseInt((horario.split('a')[1]).trim());

    var fechayhora: Date = new Date()
    var horaActual: number = fechayhora.getHours()

    if (horaActual >= cierre || horaActual < apertura) {
      alert('Esta cerrado')
    } else {
      alert('Esta abierto')
    }
  }
}
