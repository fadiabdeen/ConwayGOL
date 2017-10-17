import { Component, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Conway's Game of Life";
  columns;
  rows;

  started=false;


  constructor(private router: Router){
        this.router.navigateByUrl('/start');

  }

  start(){

    this.router.navigateByUrl('/start');
    this.started=true;
  	
  }
}
