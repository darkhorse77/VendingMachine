import { Component, Input } from '@angular/core';
import { Coin } from '../../coin';
@Component({
    selector: "coin-form",
    templateUrl: './coin-form.component.html'
})
export class CoinFormComponent {
    @Input() coin: Coin;
}