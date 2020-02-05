import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';

import { DataService } from './data.service';
import { ClientComponent }   from './client/client.component';
//import { AdminComponent } from './admin/admin.component';

@NgModule({
    imports:      [ BrowserModule, HttpClientModule ],
    providers: [ DataService ],
    declarations: [ ClientComponent ],
    bootstrap:    [ ClientComponent ],
})
export class AppModule { }