import { Component, Input } from '@angular/core';
import { Drink } from '../../drink';
@Component({
    selector: "drink-form",
    templateUrl: './drink-form.component.html'
})
export class DrinkFormComponent {
    @Input() drink: Drink;
}