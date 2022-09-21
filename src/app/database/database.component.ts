import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'city', 'action'];
  dataSource!: MatTableDataSource<any>;
  @Input() name!: String;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  message: any;
  row: any;

  constructor(private dialog: MatDialog, private api: ApiService, public shared: ApiService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.message = this.shared.getMessage()

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllUser();
      }
    })
  }

  getAllUser() {
    this.api.getUser()
      .subscribe({
        next: (res) => {

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (res) => {
          alert("Error while fetching  Recoard")
        }
      })
  }

  editUser(row: any) {
    this.dialog.open(DialogComponent, {
      width: '35%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllUser();
      }
    })
  }

  deleteUser(id: number) {
    this.api.deleteUser(id)
      .subscribe({
        next: (res) => {
          alert("User deleted sucessfully")
          this.getAllUser();

        },
        error: () => {
          alert("Error while deleting the Recoard");
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delLocalstorage() {
    localStorage.clear()
  }

}
