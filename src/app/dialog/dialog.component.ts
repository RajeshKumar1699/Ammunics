import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, Validators,FormControl} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

 
  userForm!:FormGroup;
  actionbtn: string="save"


  constructor(
    @Inject(MAT_DIALOG_DATA) public  editData: any,
    private formbuilder:FormBuilder ,
    private api:ApiService ,
    private dialogRef:MatDialogRef<DialogComponent>) { }
    

  ngOnInit(): void {
    this.userForm=this.formbuilder.group({
      name:['',Validators.required],
      city:['',Validators.required],
    })



    if(this.editData){
      this.actionbtn="Update";
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['city'].setValue(this.editData.city);
     }
  }


  adduser(){
    if(!this.editData){
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next:(res)=>{
            alert("user Recoard addeed sucessfully")
            this.userForm.reset();
            this.dialogRef.close('save');
  
          },
          error:()=>{
            alert("error while adding data")
          }
        })
      }
    }else{
      this.updateUsr()
    }

  }
  updateUsr(){
    this.api.putUser(this.userForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("update sucessafully");
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("error while updating Recoard !!");
      }
      
    })
  }
}
