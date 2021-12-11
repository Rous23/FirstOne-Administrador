import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  error=false
  formInicio = new FormGroup(
    {
      usuario:new FormControl('',
      [
        Validators.required,
        Validators.minLength(4)
      ]
      ),
      contrasena:new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ]
      )
    }
  )
  constructor(
    private administradorService:AdministradorService,
    private route:Router,
    // private cookieService:CookieService
  ) { }

  ngOnInit(): void {
  }

  get usuario(){
    return this.formInicio.get('usuario')
  }

  get contrasena(){
    return this.formInicio.get('contrasena')
  }

  iniciarSesion(){
    console.log(this.formInicio.value);
    this.administradorService.inicioSesion(this.formInicio.value).subscribe(
      res=>{
        console.log(res);
        if(res!=null){
          // this.cookieService.set('idAdminFirstone', res._id);
          this.route.navigate(['/main']);
        }else{
          this.error=true
          this.usuario.setValue('');
          this.contrasena.setValue('');
        }
      },
      error=>{
        console.error(error);
      }
    )
    // this.cookieValue = this.cookieService.get('Test');
    

  }

}
