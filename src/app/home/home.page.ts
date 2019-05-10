import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FotosService } from '../services/foto.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private publicRouter:Router, private subir:FotosService) {
    
   }
  aux;
  ngOnInit() {

    
  }
  mover(lugar){
    this.publicRouter.navigate([lugar]);
  }
}

