import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//components
import { MainComponent } from './components/main/main.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { UserListComponent } from './components/user-list/user-list.component';


const adminRoutes: Routes = [
    {
        // componente padre 
        path: 'admin-panel',
        component: MainComponent,
        children: [
            {
                path: 'editHero', component: EditHeroComponent
            },
            {
                path: 'addHero', component: AddHeroComponent
            },
            {
                path: 'userList', component: UserListComponent
            }
        ]

    }

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }