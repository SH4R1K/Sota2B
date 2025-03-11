import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./data/components/header/header.component";
import '@angular/common/locales/global/ru';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiRoot, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'Sota2B';
}
