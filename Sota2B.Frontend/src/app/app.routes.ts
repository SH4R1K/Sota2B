import { Routes } from '@angular/router';
import { MainPageComponent } from './data/pages/main-page/main-page.component';
import { EventsPageComponent } from './data/pages/events-page/events-page.component';
import { PurchasesPageComponent } from './data/pages/purchases-page/purchases-page.component';
import { AchievementPageComponent } from './data/pages/achievement-page/achievement-page.component';
import { UsersPageComponent } from './data/pages/users-page/users-page.component';
import { UserDetailsPageComponent } from './data/pages/user-details-page/user-details-page.component';

export const routes: Routes = [
    {
      path: '',
      component: MainPageComponent,
      title: 'Home page',
    },
    {
      path: 'events',
      component: EventsPageComponent,
      title: 'Events page',
    },
    {
      path: 'purchases',
      component: PurchasesPageComponent,
      title: 'Purchases page',
    },
    {
      path: 'achievements',
      component: AchievementPageComponent,
      title: 'achievements page',
    },
    {
      path: 'users',
      component: UsersPageComponent,
      title: 'achievements page',
    },
    {
      path: 'users/:idUser',
      component: UserDetailsPageComponent,
      title: 'achievements page',
    },
];
