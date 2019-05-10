import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

export interface Foto {
  id: string;
  usuario: string;
  mensaje: string;
  tipo: string;
  fecha: string;
}


@Injectable({
  providedIn: 'root'
})
export class FotosService {

  constructor(
    private MiAuth: AngularFireAuth,
    private firestore: AngularFirestore) { }


  /** Conecta con firebase para subir los datos de la foto a la tabla de 'relVisual', así como el nuevo doc de votos a la tabla 'votos' */
  public async UploadToFirestore(type: string, msn:string) {
    // Add a new document with a generated id.
    const addDoc: any = this.firestore.collection('chatA').add({
      usuario: this.MiAuth.auth.currentUser.email,
      mensaje: msn,
      tipo: type,
      fecha: (new Date()).toLocaleString()
    }).then(ref => {
      return true
    }).catch(err => {
      console.log('Error al añadir en fotos', err);
    });
  }

  /** Conecta con firebase para obtener todas las fotos de la base sin filtrarlas */
  public ObtenerFotos() {
    return this.firestore.collection('chatA').snapshotChanges().pipe(map((fotos) => {
      return fotos.map((a) => {
        const data = a.payload.doc.data() as Foto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  /** Esta no es de firebase, es un filtrado de fotos */
  public FiltrarFotos(fotos: Array<Foto>, tipo: string): Array<Foto> {
    const auxReturn = new Array<Foto>();

    for (const foto of fotos) {
      if (foto.tipo === tipo) {
        auxReturn.push(foto);
      }
    }

    return auxReturn;
  }

}
