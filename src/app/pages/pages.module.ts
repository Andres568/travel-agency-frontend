import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../common/material.module';
// import { ReducersStoreModule } from '../common/store/app.reducers';
// import { EffectsStoreModule } from '../common/store/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { HeaderComponent } from '../common/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../common/shared.module';


@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        // ReducersStoreModule,
        // EffectsStoreModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })    ],
    declarations:[
        HomeComponent
    ],
    entryComponents: [   
    ],
    exports:[
    ]

})
export class PagesModule{}