import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';

import { AboutModel } from '../models/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAbout() {

    return this.firestore
      .collection<AboutModel>('about')
      .snapshotChanges()
      .pipe(

        map(actions =>
          actions.map(a => {

            const data = a.payload.doc.data() as AboutModel;

            const id = a.payload.doc.id;

            return { id, ...data };

          })
        )

      );

  }

}
