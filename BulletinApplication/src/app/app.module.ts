import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { BulletinsComponent } from './bulletins/bulletins.component';
import { BulletinChangeComponent } from './bulletin-change/bulletin-change.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [AppComponent, BulletinsComponent, BulletinChangeComponent, MessageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
  ],
  providers: [],
  bootstrap: [AppComponent, BulletinsComponent],
})
export class AppModule {}
