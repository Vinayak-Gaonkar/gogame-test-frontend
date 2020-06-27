import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSortModule
} from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HttpService } from './service/http.service';

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSortModule
  ],
  entryComponents: [
    DialogBoxComponent,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
