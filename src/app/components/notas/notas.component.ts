import { Component, Input, NgModule, TemplateRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/Categoria';
import { NotasService } from '../../service/notas.service';
import { DxButtonModule, DxCheckBoxModule, DxPopupModule, DxSelectBoxModule, DxTabPanelModule, DxTemplateModule, DxTooltipModule } from 'devextreme-angular';
import { NgFor } from '@angular/common';
import { Nota } from '../../models/Nota';
import { Position, TabsIconPosition, TabsStyle } from 'devextreme/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-notas',
  standalone: true,
  imports:[CommonModule,DxButtonModule,DxTabPanelModule,  
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxPopupModule,
    FormsModule,
    DxTooltipModule
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})

export class NotasComponent {
  dataSource: any[];
  nombreCategoria:string = '';
  nombreNota:string = '';
  descripcionNota:string = '';
  categoriaIdSeleccionada: any;
  tabsPositions: Position[] = [
    'left',
    'top',
    'right',
    'bottom',
  ];

  tabsPosition: Position = this.tabsPositions[0];

  stylingModes: TabsStyle[] = [
    'secondary',
    'primary',
  ];

  stylingMode: TabsStyle = this.stylingModes[0];

  iconPositions: TabsIconPosition[] = [
    'top',
    'start',
    'end',
    'bottom',
  ];

  iconPosition: TabsIconPosition = this.iconPositions[0];

  constructor(private service: NotasService) {
  this.cargaCategorias();
  }


  cargaCategorias(){
    this.service.getItems().subscribe(data => {
      this.dataSource = data.response.map(s=>  {
        return {
          id:s.id,
          title:s.nombre,
          notas:s.notas
        }
      });
      console.log(this.dataSource);
    });
  }
  showModal: boolean = false;
  showModalNotas: boolean = false;

  modalAgregarCategoria() {
    this.showModal = true;
  }
  EliminarCategoria(categoriaId:any){
    this.service.BorrarCategoriaById(categoriaId).subscribe(data => {
      this.cargaCategorias();
      console.log('Datos guardados exitosamente');
    })
  }
  modalAgregarNota(categoriaId:any) {
    this.categoriaIdSeleccionada =categoriaId;
    this.showModalNotas = true;
  }
  closeModal(result: boolean) {
    this.showModal = false;
    if (result) {
   
      console.log('Guardar');
    } else {
      console.log('Cancelar');
    }
  }
  closeModalNotas(result: boolean) {
    this.showModalNotas = false;
    if (result) {
   
      console.log('Guardar');
    } else {
      console.log('Cancelar');
    }
  }

  guardarCategoria() {
    if (this.nombreCategoria.trim() !== '') {
      
      const nuevaCategoria: Categoria = {
        Id:0,
        Nombre: this.nombreCategoria,
        FechaReg:new Date,
        Notas:[]
      };
  
    
      this.service.guardarCategoria(nuevaCategoria).subscribe(
        response => {
          console.log('Nota guardada:', response);
        
          this.showModal = false; 
          this.nombreCategoria = ''; 
          this.cargaCategorias();
        },
        error => {
          console.error('Error al guardar la nota:', error);
      
        }
      );
    } else {
      console.log('El nombre de la nota no puede estar vacío');
     
    }
  }
  


  eliminarNota(task: any) {
    
    this.service.BorrarNotaById(task.id).subscribe(data => {
      this.cargaCategorias();
      console.log('Datos guardados exitosamente');
    })
     
 
  }

  guardarNota(){
    if (this.nombreNota.trim() !== '') {
      
      const nuevaNota: Nota = {
        Id:0,
        Nombre: this.nombreNota,
        Descripcion: this.descripcionNota,
        FechaReg:new Date,
        CategoriaId:this.categoriaIdSeleccionada,
        Categoria:[]
      };
  
    
      this.service.guardarNota(nuevaNota).subscribe(
        response => {
          console.log('Nota guardada:', response);
        
          this.showModalNotas = false; 
          this.nombreCategoria = ''; 
          this.categoriaIdSeleccionada='';
          this.descripcionNota='';
          this.cargaCategorias();
        },
        error => {
          console.error('Error al guardar la nota:', error);
      
        }
      );
    } else {
      console.log('El nombre de la nota no puede estar vacío');
     
    }
  }
}

