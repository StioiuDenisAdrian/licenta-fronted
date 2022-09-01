import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserFilter } from '../filters/user.filter';
import { UserData } from '../models/user-data.model';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  public userFilter: UserFilter = new UserFilter();

  public dataSource: MatTableDataSource<UserData> =
  new MatTableDataSource<UserData>();
displayedColumns: string[] = [
  'name',
  'username',
  'email',
  'role',
  'birthday',
  'delete',
  'edit',
  'register',
];
userData: any;
length: number;
isLoadingResults: boolean;

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private accountService: UserService,
    public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.accountService.getUsers().subscribe((u) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(u);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    this.dataSource.data = this.dataSource.data.filter(
      (u) =>
        (this.userFilter.name === '' ||
          u.name.includes(this.userFilter.name)) &&
        (this.userFilter.email === '' ||
          u.email.includes(this.userFilter.email)) &&
        (this.userFilter.userName === '' ||
          u.userName.includes(this.userFilter.userName))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.userFilter = new UserFilter();
    this.accountService.getUsers().subscribe((u) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(u);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
    
  }

  deleteUser(id: string): void {
    this.accountService.deleteUser(id).subscribe();
    window.location.reload();
  }

  editUser(id: string): void {
    var user = this.dataSource.data.filter((u) => u.id === id)[0];
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '650px',
      data: {name: user.name, email: user.email, birthday: user.birthday, id: id}
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.accountService.getUsers().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((r) => {
      this.accountService.getUsers().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
     
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
