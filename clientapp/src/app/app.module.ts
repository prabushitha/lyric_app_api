import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GenreComponent } from './components/genre/genre.component';
import { LyricComponent } from './components/lyric/lyric.component';
import { HeaderComponent } from './components/header/header.component';
import { ReadMoreComponent } from './components/readmore/readmore.component';

const appRoutes: Routes = [
  { path: 'genre', component: GenreComponent },
  { path: 'lyric', component: LyricComponent },
  { path: '',   redirectTo: '/genre', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GenreComponent,
    LyricComponent,
    ReadMoreComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent]
})
export class AppModule { }
