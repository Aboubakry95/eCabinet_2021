import { Component, OnInit,Inject } from '@angular/core';
  import { SpecialiteService } from '../../service/specialite.service';
  import { ToastrService } from 'ngx-toastr';
  import { Specialite } from '../../model/specialite';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
  import { AddSpecialiteComponent } from '../../specialite/add-specialite/add-specialite.component';

@Component({
  selector: 'app-list-specialite',
  templateUrl: './list-specialite.component.html',
  styles: [
  ]
})
export class ListSpecialiteComponent implements OnInit {
    specialite !: Specialite;
    constructor(public crudApi: SpecialiteService, public toastr: ToastrService,
      private router: Router, public fb: FormBuilder,
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef:MatDialogRef<AddSpecialiteComponent>,) { }
  
    ngOnInit() {
      
      this.getData();
    }
  
    getData() {
      this.crudApi.getAll().subscribe(
        response => { this.crudApi.list = response["hydra:member"]; 
      }
      );
    }
  
    removeData(id: number) {
      if (window.confirm('Are sure you want to delete this Catégorie ?')) {
        this.crudApi.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning(' data successfully deleted!');
              this.getData();
            },
            error => console.log(error));
      }
    }
    selectData(item : Specialite) {
      this.crudApi.choixmenu = "M";
      this.crudApi.formData = this.fb.group(Object.assign({},item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      
      this.matDialog.open(AddSpecialiteComponent, dialogConfig);
    }
    addSpecialite()
    {
      this.crudApi.choixmenu = "A";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width="50%";
        this.matDialog.open(AddSpecialiteComponent, dialogConfig);
      }
    }
  
  
