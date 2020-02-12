import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Coin } from '../../coin';
 
@Component({
    selector: "coin-list",
    templateUrl: './coin-list.component.html'
})
export class CoinListComponent implements OnInit {
 
    coins: Coin[]; 
    constructor(private dataService: DataService) { }
 
    ngOnInit() {
        this.load();
    }
    load() {
        this.dataService.getCoins().subscribe((data: Coin[]) => this.coins = data);
    }
}