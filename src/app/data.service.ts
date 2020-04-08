import { Injectable } from '@angular/core';
import { Food } from './food';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://crudcrud.com/api/11c08defb1f140cca645359c2ef0e6eb';

  constructor(private http: HttpClient) { }

  getFoodies() {
    return this.http.get(`${this.baseUrl}/food`);
  }

  getFood(id: number) {
    return this.http.get(`${this.baseUrl}/food/${id}`);
  }

  postFood(food: Food) {
    delete food._id;
    return this.http.post(`${this.baseUrl}/food`, null);
  }

  updateFood(food: Food) {
    const id = food._id;
    delete food._id;
    return this.http.put(`${this.baseUrl}/food/${id}`, null);
  }

  deleteFood(food: Food) {
    const id = food._id;
    return this.http.delete(`${this.baseUrl}/food/${id}`);
  }
}
