import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotasComponent } from "./components/notas/notas.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NotasComponent]
})
export class AppComponent {
  title = 'notas';
}