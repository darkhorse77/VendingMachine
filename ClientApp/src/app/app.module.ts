import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { ClientComponent }   from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { CoinListComponent } from './admin/coin/coin-list.component';
import { CoinFormComponent } from './admin/coin/coin-form.component';
import { CoinEditComponent } from './admin/coin/coin-edit.component';
import { DrinkListComponent } from './admin/drink/drink-list.component';
import { DrinkFormComponent } from './admin/drink/drink-form.component';
import { DrinkEditComponent } from './admin/drink/drink-edit.component';
import { DrinkAddComponent } from './admin/drink/drink-add.component';
import { NotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', component: ClientComponent },
    { path: 'admin/:token', component: AdminComponent },
    { path: 'admin/coins/edit/:id', component: CoinEditComponent },
    { path: 'admin/drinks/add', component: DrinkAddComponent },
    { path: 'admin/drinks/edit/:id', component: DrinkEditComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes) ],
    providers: [ DataService ],
    declarations: [ AppComponent, ClientComponent, AdminComponent, CoinListComponent, CoinFormComponent, CoinEditComponent, DrinkListComponent, DrinkFormComponent, DrinkEditComponent, DrinkAddComponent, NotFoundComponent ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { }