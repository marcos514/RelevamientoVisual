import { Component, OnInit, ViewChild } from '@angular/core';
import { FotosService } from 'src/app/services/foto.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  constructor(private subir:FotosService,
    private MiAuth: AngularFireAuth) { }
  arrayCosasLindas=[];
  mensaje;
  @ViewChild(IonContent) content: IonContent;
  ngOnInit() {
    this.ObtenerLindasDeBase();
  }

  private async ObtenerLindasDeBase() {

    this.subir.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasLindas = this.subir.FiltrarFotos(fotos, 'A');
      console.log(this.arrayCosasLindas);
      this.OrderByDate();
      for (let index = 0; index < this.arrayCosasLindas.length; index++) {
        const msn = this.arrayCosasLindas[index];
        msn['lado'] = this.MiAuth.auth.currentUser.email==msn['usuario'] ? 'derecha' : 'izq';
        msn['icon'] = this.MiAuth.auth.currentUser.email==msn['usuario'] ? 'person' : 'people';
      }
      this.content.scrollToBottom(300);


      // this.arrayCosasLindas= this.arrayCosasLindas.reverse();
    });
    
  }

  sendMessage(){
    this.subir.UploadToFirestore("A",this.mensaje)
    this.mensaje='';
    this.content.scrollToBottom(3000);

  }
  private OrderByDate() {
    this.arrayCosasLindas= this.arrayCosasLindas.sort((a, b) => {
      return a.fecha.localeCompare(b.fecha);
    });
  }
}
