import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Drink } from '../../drink';
import { Location } from '@angular/common';
import { AdminComponent } from '../admin.component';

@Component({
    templateUrl: './drink-edit.component.html'
})
export class DrinkEditComponent implements OnInit {

    id: number;
    drink: Drink;
    loaded: boolean = false;

    constructor(private dataService: DataService, activeRoute: ActivatedRoute, private location: Location) {
        this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
    }

    ngOnInit() {
        if (this.id)
            this.dataService.getDrinks()
                .subscribe((data: Drink[]) => {
                    this.drink = data.filter(x => x.id == this.id)[0];
                    if (this.drink != null) this.loaded = true;
                });
    }

    save() {
        this.dataService.updateDrink(this.drink).subscribe(data => this.location.back());
    }
}