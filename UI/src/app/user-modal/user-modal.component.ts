import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/_service/app.service';
const fd = new FormData();

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  message: any = '';

  model: any = {
    fname: '',
    lname: '',
    email: '',
    phone_number: '',
    profile_image: '',
  };

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,

  ) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this.apiService.getUser(this.data.id)
    .subscribe((result: any) => {
      if(result.success){
        this.model.fname = result.data.fname;
        this.model.lname = result.data.lname;
        this.model.email = result.data.email;
        this.model.phone_number = result.data.phone_number;
        this.model.profile_image = result.data.profile_image;
      }
    })
  }
  profileImage(event){
    let imageFile = <File>event.target.files[0];
    let imageName = imageFile.name
    fd.append('imageFile', imageFile, imageName);
  }
  add(){
    fd.append('data', JSON.stringify(this.model))
    this.apiService.adduser(fd)
    .subscribe((result: any) => {
      this.message = result.message;
      if(result.success){
        this.onNoClick();
      }
    })
  }
  update(){
    this.apiService.updateuser(this.model, this.data.id)
    .subscribe((result: any) => {
      this.message = result.message;
      if(result.success){
        this.get();
        this.onNoClick();
      }
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
