import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../services/categorias.service';
import { MotoristasService } from '../services/motoristas.service';
import { OrdenesService } from '../services/ordenes.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  regionActiva:string = 'empresasPorCategoria'
  faEdit = faEdit
  faTrash = faTrash
  categorias:any = [];
  seleccionado:string;
  empresas = []
  nombre:string;
  correo:string;
  descripcion:string;
  telefono:string
  calificacion:string;
  file1:any;
  file2:any;
  empresaSeleccionada:any;
  productos:any;
  nombreProducto:any;
  descripcionProducto:any;
  precio:any;
  cantidad:any;
  file3:any;
  arrayMotoristas:any=[]
  ordenesDisponibles:any=[]


  constructor(
    private route:Router,
    private categoriasService:CategoriasService,
    private ordenesService:OrdenesService,
    private motoristasService:MotoristasService,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe(
      res=>{
        this.categorias = res
      },
      error=>{
        console.error(error);
      }
    )

  }

  empresasCategoria(){
    if(this.regionActiva != 'empresasPorCategoria'){
      this.regionActiva = 'empresasPorCategoria'
    }
  }

  productosEmpresa(){
    if(this.regionActiva != 'productosEmpresa'){
      this.regionActiva = 'productosEmpresa'
    }
  }

  motoristas(){
    if(this.regionActiva != 'motoristas'){
      this.regionActiva = 'motoristas'
      this.motoristasService.obtenerMotoristas().subscribe(
        res=>{
          console.log(res);
          this.arrayMotoristas = res
        },
        error=>{
          console.error(error);
        }
      )
    }
  }

  ordenes(){
    if(this.regionActiva != 'ordenes'){
      this.regionActiva = 'ordenes'
      this.ordenesService.obtenerOrdenesDisponibles().subscribe(
        res=>{
          console.log(res);
          this.ordenesDisponibles = res
        },
        error=>{
          console.error(error);
        }
      )
    }
  }

  cambiarCategoria(){
    console.log(this.seleccionado);
    this.categoriasService.obtenerCategoria(this.seleccionado).subscribe(
      res=>{
        console.log(res.empresas);
        this.empresas=res.empresas
      },
      error=>{
        console.error(error);
      }
    )
  }
  cambiarEmpresa(){
    console.log("empresaSeleccionada",this.empresaSeleccionada);
    this.categoriasService.obtenerCategoria(this.seleccionado).subscribe(
      res=>{
        this.empresas=res.empresas
        for (let i = 0; i < this.empresas.length; i++) {
          if(this.empresas[i]._id == this.empresaSeleccionada){
            this.productos = this.empresas[i].productos
          }
        }
      },
      error=>{
        console.error(error);
      }
    )
  }

  editarEmpresa(empresa){}

  eliminarEmpresa(idEmpresa){
    this.categoriasService.eliminarEmpresaCategoria(this.seleccionado, idEmpresa).subscribe(
      res=>{
        console.log(res);
        this.ngOnInit()
      },
      error=>{
        console.error(error);
      }
    )
  }

  abrirModalFormulario(modal){
    this.modalService.open(modal,{
      size:'md',
      centered:true
    })
  }

  abrirModalProducto(modal){
    this.modalService.open(modal,{
      size:'md',
      centered:true
    })
  }

  guardarEmpresa(){
    const formData = new FormData;
    formData.append('nombre',this.nombre);
    formData.append('correo',this.correo);
    formData.append('descripcion',this.descripcion);
    formData.append('telefono',this.telefono);
    formData.append('calificacion',this.calificacion);
    formData.append('imagen1',this.file1);
    formData.append('imagen2',this.file2);

    this.categoriasService.guardarEmpresa(this.seleccionado, formData).subscribe(
      res=>{
        console.log(res);
        this.ngOnInit()
      },
      error=>{
        console.error(error);
      }
    )
  }

  guardarProducto(){
    const formData = new FormData;
    formData.append('nombre',this.nombreProducto);
    formData.append('descripcion',this.descripcionProducto);
    formData.append('precio',this.precio);
    formData.append('imagenProducto',this.file3);
    formData.append('cantidad',this.cantidad);

    this.categoriasService.guardarProducto(this.seleccionado, this.empresaSeleccionada ,formData).subscribe(
      res=>{
        console.log(res);
        this.ngOnInit()
      },
      error=>{
        console.error(error);
      }
    )
  }

  editarProducto(producto){}

  eliminarProducto(idProducto){}

  onFileSelect(imagen1){
    if (imagen1.target.files.length > 0) {
      this.file1 = imagen1.target.files[0];
      //console.log(this.file);
    }
  }
  
  onFileSelectBanner(imagen2){
    if (imagen2.target.files.length > 0) {
      this.file2 = imagen2.target.files[0];
      //console.log(this.file);
    }
  }

  onFileSelectProducto(imagenProducto){
    if (imagenProducto.target.files.length > 0) {
      this.file3 = imagenProducto.target.files[0];
      //console.log(this.file);
    }
  }

  aprobarMotorista(item){
    this.motoristasService.actualizarMotorista(item._id).subscribe(
      res=>{
        console.log(res);
        let data = {
          nombre:item.nombre,
          apellido:item.apellido,
          correo : item.correo
      };
        emailjs.send("service_hw20eqf", "template_pin2zy4", data, 'user_uGqzn6WUEvewErZN0QaZF')
          .then((result: EmailJSResponseStatus) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
      },
      error=>{
        console.error(error);
      }
    )
  }



}
