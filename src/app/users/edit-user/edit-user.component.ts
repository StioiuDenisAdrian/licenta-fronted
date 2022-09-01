import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public hasErrors: boolean = false;


  constructor(private readonly userService: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    ) { }

  ngOnInit(): void {
  }

  save(): void{
    this.userService.saveUser(this.data).subscribe(() => {this.dialogRef.close();},
    (err) => {this.hasErrors = true});
  }

  close(): void{
    this.dialogRef.close();
  } 
}
