import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private firestore: Firestore) { }

  getGoals(): Observable<any[]> {

    const goalsRef = collection(this.firestore, 'goals');

    return collectionData(goalsRef, {
      idField: 'id'
    }) as Observable<any[]>;
  }

  addGoal(goal: string) {

    const goalsRef = collection(this.firestore, 'goals');

    return addDoc(goalsRef, {
      name: goal,
      completed: false
    });
  }

  deleteGoal(id: string) {

    const docRef = doc(this.firestore, `goals/${id}`);

    return deleteDoc(docRef);
  }
}
