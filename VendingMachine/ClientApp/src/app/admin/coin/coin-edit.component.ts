import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Location } from '@angular/common';
import { Coin } from '../../coin';
import { AdminComponent } from '../admin.component';

@Component({
    templateUrl: './coin-edit.component.html'
})
export class CoinEditComponent implements OnInit {

    id: number;
    coin: Coin;
    loaded: boolean = false;

    constructor(private dataService: DataService, activeRoute: ActivatedRoute, private location: Location) {
        this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
    }

    ngOnInit() {
        if (this.id)
            this.dataService.getCoins()
                .subscribe((data: Coin[]) => {
                    this.coin = data.filter(x => x.id == this.id)[0];
                    if (this.coin != null) this.loaded = true;
                });
    }

    save() {
        this.dataService.updateCoin(this.coin).subscribe(data => this.location.back());
    }
}