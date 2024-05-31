import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None

})
export class MenuComponent {
  constructor(private router: Router) {}


  logout() {
    localStorage.removeItem('token');
    window.location.reload();

    // this.router.navigate(['/login']);
  }




  
}
