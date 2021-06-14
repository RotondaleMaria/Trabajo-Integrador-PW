import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Libro, genero} from '../../modelos/libro';
import {LibroService} from '../../servicios/libro.service';
import {ActivatedRoute,Router} from '@angular/router'

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {
  formLibro:FormGroup;
  libroId:number;
  tit:string;
  generos:genero[];

  constructor(private fb: FormBuilder,
              private LibroSrv:LibroService,
              private activatedRoute:ActivatedRoute,
              private router:Router,){ }

  ngOnInit() {
    this.formLibro =this.fb.group({
        titulo:['', [Validators.required]],
        autor:'', 
        editorial:'',
        genero:'',
      });

      this.generos=[
        {id:1, descripcion: "Novela"},
        {id:2, descripcion: "Drama"},
        {id:3, descripcion: "Fantasia Romántica"},
        {id:4, descripcion: "Ficcion"},
        {id:5, descripcion: "Literatura Fantástica"},
        {id:6, descripcion: "Otros"},
      ];
  

    this.activatedRoute.params.subscribe(
    params => {
      this.libroId= params['id'];
      console.log("Libro Id: " + this.libroId);
      if(isNaN(this.libroId)){
        //no es numerico
        this.tit="Ingresar nuevo libro";
        return;
      }
      else{
        debugger
        //es numerico
        var libro = this.LibroSrv.Buscar(this.libroId);
        this.tit="Modificar los datos del libro: " + libro.titulo + "" + libro.autor;
        //llenar el campo formulario
        this.formLibro.patchValue({
          titulo:libro.titulo,
          autor:libro.autor,
          editorial:libro.editorial,
          genero:libro.genero,
        });
        
      }
    }
  );
}

  GuardarLibro() {
    
    let libro: Libro=Object.assign({}, this.formLibro.value);
    libro.id= +this.libroId;
      if(libro.id>0){
        //editar
        this.LibroSrv.Editar(libro);
      }
      else{
        //nuevo
        libro.id = this.LibroSrv.CrearId()
        this.LibroSrv.Crear(libro);
      }
      this.router.navigate(["/libro"])
    }
  
  }


