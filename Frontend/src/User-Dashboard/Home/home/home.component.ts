
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MyService } from 'src/User-Dashboard/my-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null = null; // User's name
  selectedTable: string = 'Student'; // Default selection
  tables: any = []; // Tables to be fetched from API
  tablePrivileges!: { [key: string]: boolean; };

  constructor(private router: Router, private myService: MyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userName=this.authService.getUserName();
    this.myService.getTableNames().subscribe({
      next: (tables: string[]) => {
        console.log('Received table names:', tables); // Log received tables
        this.tables = tables;
      },
      error: (error) => {
        console.error('Error fetching table names:', error); // Log full error object
        // Additional handling, if needed
      },
      complete: () => {
        console.log('Completed fetching table names.');
      }
    });
    //this.selectedTable=this.tables[0];
    this.fetchTablePrivileges();
    
  }
  onTableChange(event: any) {
    this.selectedTable = event.target.value;
    this.fetchTablePrivileges();
    const target = event.target as HTMLSelectElement;
    this.selectedTable = target.value;
    console.log('Selected table:', this.selectedTable);
  }

  fetchTablePrivileges() {
    const userId = this.authService.getUserId();
    
    console.log("HI");
    console.log(userId); // Replace with actual user ID if dynamic
    if (userId) {
      this.myService.getTablePrivileges(userId, this.selectedTable).subscribe({
        next: (privileges) => {
          this.tablePrivileges = privileges;
        },
        error: (error) => console.error('Error fetching table privileges:', error)
      });
    } else {
      console.error('User ID not found.');
    }
  }

  hasPrivilege(privilege: string): boolean {
    return this.tablePrivileges[`can${privilege}`] ?? false;
  }
  

  logout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }


  manageRecords() {
    console.log('Record Management clicked');
    this.router.navigate(['/table'], { queryParams: { selectedTable: this.selectedTable } });
  }

  manageRequests() {
    console.log('Request Management clicked');
    this.router.navigate(['/request']);
  }
  // hasPrivilege(privilege: string): boolean {
  //   return this.userPrivileges[this.selectedTable]?.includes(privilege) ?? false;
  // }
}


