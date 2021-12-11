import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProductosComponent } from './productos/productos.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { MotoristasRegistradosComponent } from './motoristas-registrados/motoristas-registrados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    EmpresaComponent,
    ProductosComponent,
    OrdenesComponent,
    MotoristasRegistradosComponent,
    MainComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
