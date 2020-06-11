import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// components
import { MainComponent } from './components/main/main.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component'; import { NgModule } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
    declarations: [
        MainComponent,
        AddHeroComponent,
        EditHeroComponent,
        UserListComponent

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatDialogModule,
        NgbModule

    ],
    exports: [
        MainComponent,
        AddHeroComponent,
        EditHeroComponent
    ],
    providers: []
})
export class AdminModule { }