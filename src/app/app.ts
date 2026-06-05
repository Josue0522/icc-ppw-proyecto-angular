import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent} from './components/app-header/app-header';
import { Footer } from './components/footer/footer';
import { Home } from "./features/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}