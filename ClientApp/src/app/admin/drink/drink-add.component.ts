import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Drink } from '../../drink';
 
@Component({
    templateUrl: './drink-add.component.html'
})
export class DrinkAddComponent {
 
    drink: Drink = new Drink();    // добавляемый объект
    constructor(private dataService: DataService, private router: Router) { }
    save() {
        this.dataService.addDrink(this.drink).subscribe(data => this.router.navigateByUrl("/"));
    }

}