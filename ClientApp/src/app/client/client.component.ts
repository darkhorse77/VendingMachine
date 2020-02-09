import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coin } from '../coin';
import { Drink } from '../drink';
     
@Component({
    selector: 'client-app',
    templateUrl: './client.component.html',
    styleUrls: ['../app.component.css'],
    providers: [DataService]
})
export class ClientComponent implements OnInit {
    coins: Coin[];
    drinks: Drink[];
    status: string;
    balance: number = 0;
    depositСoins: number[] = []; // внесённые пользователем номиналы монет
    drink: Drink; // изменяемый товар

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.status = "Внесите деньги, выберите напиток и подтвердите";
        this.dataService.getCoins().subscribe((data: Coin[]) => this.coins = data);
        this.dataService.getDrinks().subscribe((data: Drink[]) => this.drinks = data);
    } 
    
    addCoin(coin: Coin): void {
        if(coin.isActive) {
            this.balance += coin.value;
            this.depositСoins.push(coin.value);
            this.status = "+ " + this.balance + "₽";
        }
        else {
            alert('Монета не принимается!'); // доп. проверка на случай если стили не загрузятся и кнопка будет доступна для клика
        }
    }

    selectDrink(drink: Drink): void {
        if(this.balance < drink.price || this.balance == NaN)
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
        if(this.drink == null || this.drink == undefined)
        {
            this.status = "Выберите напиток!";
            return;
        }

        this.drink.count -= 1;
        this.dataService.updateDrink(this.drink).subscribe(data => this.drinks);     
    
        this.dataService.getCoins().subscribe((data: Coin[]) => this.coins = data); // обновление состояния монет перед отправкой на сервер
        this.coins.forEach(coin => {     
            coin.count += this.depositСoins.filter(x => x == coin.value).length;
            this.dataService.updateCoin(coin).subscribe(data => this.coins);
        });   

        this.status = "Напиток готов. Сдача " + (this.balance - this.drink.price) + "₽";
        (new Audio("/src/app/res/sound.wav")).play();

        this.balance = 0;
        this.depositСoins = [];
        this.drink = null;
    }

    cancel(): void {
        this.status = "Операция отменена. Сдача не выдётся" /*+ this.balance + "₽"*/;
        this.balance = 0;
        this.depositСoins = [];
        this.drink = null;  
    }
}
