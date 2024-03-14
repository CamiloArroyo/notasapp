import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { dxTabPanelItem } from 'devextreme/ui/tab_panel'; 
import { Categoria } from '../models/Categoria';
import { Nota } from '../models/Nota';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private urlListaCategorias = 'http://localhost:8081/api/Categoria/listaCatalogos';
  private urlListaNotas = 'http://localhost:8081/api/Nota/listaNotas';
  private urlGuardarCategoria= 'http://localhost:8081/api/Categoria/crearCategoria';
  private urlGuardarNota= 'http://localhost:8081/api/Nota/crearNota';
  private urlEliminarNota= 'http://localhost:8081/api/Nota/eliminarNota/';
  private urlEliminarCategoria= 'http://localhost:8081/api/Categoria/eliminarCategoria/';
  constructor(private http: HttpClient) { }

  public getData(){
    return this.http.get<any>(this.urlListaCategorias);
  }

  public getDataNotas(){
    return this.http.get<any>(this.urlListaNotas);
  }

  public getItems() {
    return this.http.get<any>(this.urlListaCategorias);
  }
  
  public guardarCategoria(dato:any){

    return this.http.post(`${this.urlGuardarCategoria}`, dato);
  }
  public guardarNota(dato:any){

    return this.http.post(`${this.urlGuardarNota}`, dato);
  }
  BorrarNotaById (data:any){
    return this.http.delete<any>(this.urlEliminarNota + data);
    
  }

  BorrarCategoriaById (data:any){
    return this.http.delete<any>(this.urlEliminarCategoria + data);
    
  }
}


export class TabPanelItem {
  icon: string;

  title: string;

  notas: Nota[];
}
