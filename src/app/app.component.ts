import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from '@shared/components/sidemenu/sidemenu.component';
import { TopbarComponent } from '@shared/components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidemenuComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('e-tools');
}
