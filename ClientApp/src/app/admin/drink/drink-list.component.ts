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
    drinkImage: ImageSnippet;
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
        const file: File = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
    
          this.drinkImage = new ImageSnippet(event.target.result, file);
    
          this.dataService.uploadImage(this.drinkImage.file).subscribe(
            (res) => {
            
            },
            (err) => {
            
            })
        });
        d.image = file.name;
        this.dataService.updateDrink(d).subscribe(data => this.drinks);
    
        reader.readAsDataURL(file);
      }
}