import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'zenplet-web-client';

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang());
    router.navigate([
      localStorage.getItem('owner') === null ? '/auth' : '/list/pets',
    ]);
  }
}
