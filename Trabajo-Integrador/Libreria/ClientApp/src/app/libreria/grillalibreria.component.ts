import { Component, OnInit } from '@angular/core';
import {Libreria} from '../modelos/libreria';
import {LibreriaService} from '../servicios/libreria.service';


@Component({
  selector: 'app-grillalibreria',
  templateUrl: './grillalibreria.component.html',
  styleUrls: ['./grillalibreria.component.css']
})
export class GrillalibreriaComponent implements OnInit {

ListadoLibreria:Libreria[];
seleccionado:number;

  constructor(private servicioLibreria: LibreriaService) { }

  ngOnInit() {

    this.ListadoLibreria=this.servicioLibreria.MostrarTodos();
  }

  respuesta(id:number){
    console.log("Borrar la libreria con Id: " + id);
    this.seleccionado=id;

  }

}
