import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'zenplet-web-client';

  constructor(private router: Router) {
    router.navigate([
      localStorage.getItem('owner') === null ? '/auth' : '/list/pets',
    ]);
  }
}
