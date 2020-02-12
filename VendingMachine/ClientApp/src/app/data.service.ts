import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Coin } from './coin';
import { Drink } from './drink';

@Injectable()
export class DataService {
    private url: string = "api/";

    constructor(private http: HttpClient) {
    }

    getCoins() {
        return this.http.get(this.url + 'coins');
    }

    updateCoin(coin: Coin) {
        return this.http.put(this.url + 'coins', coin);
    }

    getDrinks() {
        return this.http.get(this.url + 'drinks');
    }

    addDrink(drink: Drink) {
        return this.http.post(this.url + 'drinks', drink);
    }

    updateDrink(drink: Drink) {
        return this.http.put(this.url + 'drinks', drink)
    }

    deleteDrink(id: number) {
        return this.http.delete(this.url + 'drinks/' + id);
    }

    uploadImage(fileToUpload: any) {
        if (fileToUpload == null || fileToUpload == undefined)
            return console.log('Ошибка при загрузке фото!');
        let formData = new FormData();
        formData.append(fileToUpload.name, fileToUpload);
        this.http.post(this.url + 'files', formData).subscribe(data => console.log(data.toString()));
    }
}