import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/app.service';
import { MatDialog } from "@angular/material/dialog";
import { UserModalComponent } from './user-modal/user-modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  Users = [];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    ){

  }
  ngOnInit(){
    this.getUsers();
  }
  getUsers(){
    this.apiService.getUsers()
    .subscribe((result: any) => {
      if(result.success){
        this.Users = result.data
      }
    })
  }
  get(id){
    this.dialog.open(UserModalComponent, {
      width: '1000px',
      data: {
        text: 'View Details',
        type: 'view',
        id: id
      }
      }).afterClosed().subscribe(result => {
    });
  }
  add(){
    this.dialog.open(UserModalComponent, {
      width: '1000px',
      data: {
        text: 'Add User',
        type: 'add',
      }
      }).afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  update(id){
    this.dialog.open(UserModalComponent, {
      width: '1000px',
      data: {
        text: 'Update User',
        type: 'update',
        id: id
      }
      }).afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  detele(id){
    this.apiService.deletUser(id)
    .subscribe((result: any) => {
      this.getUsers();
    })
  }
}
