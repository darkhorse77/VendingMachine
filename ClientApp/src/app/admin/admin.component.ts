import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Coin } from '../coin';
import { Drink } from '../drink';
 
@Component({
    templateUrl: './admin.component.html',
    providers: [DataService]
})
export class AdminComponent implements OnInit {
    coins: Coin[];
    drinks: Drink[];
    private token: string;
    public access: boolean;

    constructor(private dataService: DataService, activeRoute: ActivatedRoute) {
        this.token = activeRoute.snapshot.params["token"];
        if(this.token == "secrettoken")
        {
            this.access = true;
        }
    }
 
    ngOnInit() {
        this.dataService.getCoins().subscribe((data: Coin[]) => this.coins = data);
        this.dataService.getDrinks().subscribe((data: Drink[]) => this.drinks = data);
    }
}