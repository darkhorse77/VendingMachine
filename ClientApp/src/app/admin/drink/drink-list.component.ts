import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Drink } from '../../drink';
 
@Component({
    selector: 'drink-list',
    templateUrl: './drink-list.component.html'
})
export class DrinkListComponent implements OnInit {
 
    drinks: Drink[]; 
    constructor(private dataService: DataService) { }
 
    ngOnInit() {
        this.load();
    }
    load() {
        this.dataService.getDrinks().subscribe((data: Drink[]) => this.drinks = data);
    }
    delete(id: number) {
        this.dataService.deleteDrink(id).subscribe(data => this.load());
    }
}