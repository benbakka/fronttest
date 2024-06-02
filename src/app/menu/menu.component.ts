import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  // encapsulation: ViewEncapsulation.None
  styleUrls: ['./menu.component.scss']


})
export class MenuComponent {
 

  constructor() {}



  logout() {
    localStorage.removeItem('token');
    window.location.reload();

    // this.router.navigate(['/login']);
  }
 
  

  toggleMenu(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.parentElement;
    
    // Close all other dropdowns
    const allDropdowns = document.querySelectorAll('.menu-item');
    allDropdowns.forEach(dropdown => {
      if (dropdown !== parent && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      }
    });

    // Toggle the current dropdown
    parent?.classList.toggle('active');
  }



  
}
