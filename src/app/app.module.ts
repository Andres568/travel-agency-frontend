import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './common/shared.module';
import { PagesModule } from './pages/pages.module';
import { StoreModule, Store } from '@ngrx/store';
import { ReducersStoreModule } from './common/store/app.reducers';
import { EffectsStoreModule } from './common/store/app.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    PagesModule,
    // ReducersStoreModule,
    // EffectsStoreModule,
    // StoreModule.forRoot({}),
    // BrowserModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
