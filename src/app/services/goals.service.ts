import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { GoalModel } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})

export class GoalsService {

  private goalsCollection:
    AngularFirestoreCollection<GoalModel>;

  constructor(private firestore: AngularFirestore) {

    this.goalsCollection =
      firestore.collection<GoalModel>('goals');
  }

  getGoals(): Observable<GoalModel[]> {

    return this.goalsCollection.snapshotChanges().pipe(

      map(actions =>

        actions.map(a => {

          const data =
            a.payload.doc.data() as GoalModel;

          const id =
            a.payload.doc.id;

          return { id, ...data };

        })

      )

    );
  }

  addGoal(goal: GoalModel) {

    return this.goalsCollection.add(goal);

  }

  deleteGoal(id: string) {

    return this.goalsCollection.doc(id).delete();

  }

}
