import { Component, OnInit } from '@angular/core';

import { AboutModel } from '../models/about.model';

import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutData: AboutModel[] = [];

  constructor(
    private aboutService: AboutService
  ) { }

  ngOnInit(): void {

    this.aboutService.getAbout()
      .subscribe(data => {

        this.aboutData = data;

      });

  }

}
