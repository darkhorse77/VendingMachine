import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { ClientComponent }   from './client/client.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    { path: '', component: ClientComponent },
    { path: 'admin/:token', component: AdminComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes) ],
    providers: [ DataService ],
    declarations: [ AppComponent, ClientComponent, AdminComponent ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { }