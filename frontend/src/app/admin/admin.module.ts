import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'
import { HttpClientModule } from "@angular/common/http";


//components
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
        HttpClientModule
    ],
    exports: [
        MainComponent,
        AddHeroComponent,
        EditHeroComponent
    ],
    providers: []
})
export class AdminModule { }