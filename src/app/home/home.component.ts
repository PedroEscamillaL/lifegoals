import { Component, OnInit } from '@angular/core';

import { GoalModel } from '../models/goal.model';

import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  goals: GoalModel[] = [];

  goalName: string = '';

  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {

    this.goalsService.getGoals().subscribe(data => {

      this.goals = data;

      console.log(data);

    });

  }

  addGoal() {

    if(this.goalName.trim() === '') {
      return;
    }

    const newGoal: GoalModel = {

      name: this.goalName,
      completed: false

    };

    this.goalsService.addGoal(newGoal);

    this.goalName = '';
  }

  deleteGoal(id?: string) {

    if(!id) return;

    this.goalsService.deleteGoal(id);

  }

}
