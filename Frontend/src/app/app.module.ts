import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './assets/footer/footer.component';
import { HeroComponent } from './assets/hero/hero.component';
import { StatsComponent } from './assets/stats/stats.component';
import { HeaderComponent } from './assets/header/header.component';
import { FeaturedServicesComponent } from './assets/featured-services/featured-services.component';
import { ServicesComponent } from './assets/services/services.component';
import { CommunityListsComponent } from './assets/community-lists/community-lists.component';
import { ContactComponent } from './assets/contact/contact.component';
import { AboutComponent } from './assets/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeroComponent,
    StatsComponent,
    HeaderComponent,
    FeaturedServicesComponent,
    ServicesComponent,
    CommunityListsComponent,
    ContactComponent,
    AboutComponent
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
