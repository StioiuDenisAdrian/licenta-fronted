import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistration } from '../models/user-registration.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  public userRegistration: UserRegistration = new UserRegistration();
  public hasErrors: boolean = false;

  constructor(
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<RegisterUserComponent>
  ) {}

  ngOnInit(): void {}

  register() {
    this.userService.registerUser(this.userRegistration).subscribe(() => {this.dialogRef.close();},
    (err) => {this.hasErrors = true});
  }

  close(): void {
    this.dialogRef.close();
  }
}
