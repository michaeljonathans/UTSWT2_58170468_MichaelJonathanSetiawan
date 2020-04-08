import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss']
})
export class FoodFormComponent implements OnInit {
  food: Food = {
    _id: '',
    foodName: '',
    drinkName: '',
    all: 'Steak',
    appetizerName: ''
  };
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getFood(this.id).subscribe(
          response => {
            this.food = response as Food;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  postFood() {
    this.ds.postFood(this.food).subscribe(
      response => {
      this.openSnackBar("Food added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteFood() {
    this.ds.deleteFood(this.food).subscribe(
      response => {
        this.openSnackBar("Food deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateFood() {
    this.ds.updateFood(this.food).subscribe(
      response => {
        this.openSnackBar("Food updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
