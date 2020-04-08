import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  foodies: Food[];
  error: boolean;
  displayedColumns: string[] = ['foodName', 'drinkName', 'appetizerName'];

  constructor(
    private ds: DataService,
  ) {}

  ngOnInit(): void {
    this.ds.getFoodies().subscribe (
      response => {
        this.foodies = response as Food[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    )
  }
}
