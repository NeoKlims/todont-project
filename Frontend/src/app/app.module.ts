import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './assets/footer/footer.component';
import { HeroComponent } from './assets/hero/hero.component';
import { FeaturesComponent } from './assets/features/features.component';
import { TemplatesComponent } from './assets/templates/templates.component';
import { StatsComponent } from './assets/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeroComponent,
    FeaturesComponent,
    TemplatesComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
