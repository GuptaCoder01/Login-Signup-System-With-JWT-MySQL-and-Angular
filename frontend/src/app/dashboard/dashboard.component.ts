import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  message: string = 'To DashBoard ';

  constructor(private atuhService: AuthService, private router: Router) {
    this.loadDashboard();
  }



  private loadDashboard() {
    this.atuhService.getDashboard().subscribe({
      next: (response: any) => {
        this.message = response.message;
      },
      error: (err) => {
        alert('Unauthorized Access!');
        this.message = 'Unauthorized access. Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
    })
  }

  logout() {
    const confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
      this.atuhService.logout();
      this.router.navigateByUrl('/login');
    }
  }
}
