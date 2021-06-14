import { Component, OnInit } from '@angular/core';
import {Libro} from '../modelos/libro';
import {LibroService} from '../servicios/libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
  
})
export class LibroComponent implements OnInit {

  public ListadoLibro: Libro[];
  public Titulo:string="Listado de libros";
  public campobuscado:string;
  page:number= 1;
  
  

  constructor(private servicioLibro:LibroService) { }

  ngOnInit() {
    this.ListadoLibro=this.servicioLibro.MostrarTodos();
  }

  //muestra el mensaje si tiene o no stock.
  MostrarMensaje(librId:number){
    var libro:Libro;
    libro = this.servicioLibro.Buscar(librId);
    if(libro.stock){
      alert("El libro tiene stock");
    }
    else{
      alert("El libro no tiene stock");
    }
  }

    BuscarLibro(){
      this.ListadoLibro=this.servicioLibro.BuscarPorTitulo(this.campobuscado);
      console.log(this.ListadoLibro);
    }

    BuscarPorTitulo(libroId){

    }

    Borrar(libroId:number) {
    
      this.servicioLibro.BorrarLibro(libroId);
      this.ListadoLibro= this.servicioLibro.MostrarTodos();
    }

}
