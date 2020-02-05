import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coin } from '../coin';
import { Drink } from '../drink';
     
@Component({
    selector: 'client-app',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css'],
    providers: [DataService]
})
export class ClientComponent implements OnInit {
    coins: Coin[];
    drinks: Drink[];
    status: string;
    balance: number = 0;
    drink: Drink; // изменяемый товар

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.status = "Внесите деньги, выберите напиток и подтвердите";
        this.dataService.getCoins().subscribe((data: Coin[]) => this.coins = data);
        this.dataService.getDrinks().subscribe((data: Drink[]) => this.drinks = data);
    } 
    
    addCoin(value: number): void {
        this.balance += value;
        this.status = "+ " + this.balance + "₽";
    }

    selectDrink(drink: Drink): void {
        if(this.balance < drink.price)
        {
            this.status = "Недостаточно средств для покупки " + drink.name;
            return;
        }
        if(drink.count <= 0)
        {
            this.status = "Напитка " + drink.name + " нет в наличии";
            return;
        }
        this.drink = drink;
        this.status = "Выбран " + drink.name + " стоимостью " + drink.price + "₽. Подтвердите выбор"
    }

    accept(): void {
        if(this.drink == null && this.drink == undefined)
        {
            this.status = "Выберите напиток!";
            return;
        }
        this.drink.count -= 1;
        this.dataService.updateDrink(this.drink).subscribe(data => this.drinks);
        this.status = "Напиток готов. Сдача " + (this.balance - this.drink.price) + "₽";
        (new Audio("/src/app/res/sound.wav")).play();
        this.balance = 0;
        this.drink = null;
    }

    cancel(): void {
        this.status = "Операция отменена. Сдача " + this.balance + "₽";
        this.balance = 0;
        this.drink = null;  
    }
}
