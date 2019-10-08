import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatMenuModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatExpansionModule,
        MatFormFieldModule
} from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';



@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatExpansionModule,
        A11yModule
        ],
    exports: [
        BrowserAnimationsModule,
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatExpansionModule,
        A11yModule
        ],
})

export class MaterialModule {}
