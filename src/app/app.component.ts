import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "zenplet-web-client";

  constructor(private router: Router) {
    this.translate.setDefaultLang("es");
    this.translate.use("es");
    router.navigate([
      localStorage.getItem("owner") === null ? "/auth" : "/list/pets",
    ]);
  }
}
