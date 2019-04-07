import { Component } from '@angular/core';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private test:TestService) { }

  ngOnInit() {
    console.log(this.test.getTest())
    
  }

}
