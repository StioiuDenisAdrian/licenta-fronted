import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddConventionComponent } from '../add-convention/add-convention.component';
import { EditConventionComponent } from '../edit-convention/edit-convention.component';
import { ConventionFilter } from '../filters/convention-filter.model';
import { ConventionData } from '../models/convention-data.model';
import { ConventionService } from '../services/convention.service';

@Component({
  selector: 'app-convention-dashboard',
  templateUrl: './convention-dashboard.component.html',
  styleUrls: ['./convention-dashboard.component.scss']
})
export class ConventionDashboardComponent implements OnInit {

  public conventionFilter: ConventionFilter = new ConventionFilter();

  public dataSource: MatTableDataSource<ConventionData> =
    new MatTableDataSource<ConventionData>();
  displayedColumns: string[] = [
    'conventionName', 'conventionDescription', 'isAdr', 'delete','edit','register'
  ];
  customerData: any;
  length: number;
  isLoadingResults: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private conventionService: ConventionService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.conventionService.getConventions().subscribe((u) => {
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
      (a) =>
        (this.conventionFilter.name === '' ||
          a.conventionName.includes(this.conventionFilter.name)) &&
        (this.conventionFilter.description === '' ||
          a.conventionDescription.includes(this.conventionFilter.description))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.conventionFilter = new ConventionFilter();
    this.conventionService.getConventions().subscribe((a) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(a);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
  }

  deleteCustomer(id: string): void {
    this.conventionService.deleteConvention(id).subscribe();
    window.location.reload();
  }

  edit(id: string): void {
    

    const dialogRef = this.dialog.open(EditConventionComponent, {
      width: '700px',
      data: {
        id: id,  
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.conventionService.getConventions().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  register(): void {
    const dialogRef = this.dialog.open(AddConventionComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((r) => {
      this.conventionService.getConventions().subscribe((u) => {
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
