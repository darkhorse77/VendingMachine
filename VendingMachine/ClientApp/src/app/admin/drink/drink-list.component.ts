import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Drink } from '../../drink';
import { ImageSnippet } from './image.snippet';

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
    sendImage(imageInput: any, d: Drink) {
        if (imageInput.length == 0)
            return console.log('Ошибка при загрузке фото!');
        this.dataService.uploadImage(imageInput[0]);
        let drink = d;
        drink.image = imageInput[0].name;
        alert(drink.name);
        this.dataService.updateDrink(drink).subscribe(data => this.drinks);
    }
    exportDrinks() {
        let fileName = 'drinks.csv';
        let columnNames = ["Name", "Description", "Price", "Count"];
        let header = columnNames.join(';');

        let csv = header;
        csv += '\r\n';

        this.drinks.map(c => {
            csv += [c["name"], c["description"], c["price"], c["count"]].join(';');
            csv += '\r\n';
        })

        var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}