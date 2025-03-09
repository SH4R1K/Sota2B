import { Routes } from '@angular/router';
import { MainPageComponent } from './data/pages/main-page/main-page.component';
import { EventsPageComponent } from './data/pages/events-page/events-page.component';
import { PurchasesPageComponent } from './data/pages/purchases-page/purchases-page.component';
import { AchievementPageComponent } from './data/pages/achievement-page/achievement-page.component';
import { UsersPageComponent } from './data/pages/users-page/users-page.component';
import { UserDetailsPageComponent } from './data/pages/user-details-page/user-details-page.component';
import { UsersRatingPageComponent } from './data/pages/users-rating-page/users-rating-page.component';
import { ProductsPageComponent } from './data/pages/products-page/products-page.component';
import { EventDetailsPageComponent } from './data/pages/event-details-page/event-details-page.component';

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
      path: 'events/:idEvent',
      component: EventDetailsPageComponent,
      title: 'Event details page',
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
      path: 'products',
      component: ProductsPageComponent,
      title: 'product page',
    },
    {
      path: 'users',
      component: UsersPageComponent,
      title: 'achievements page',
    },
    {
      path: 'rating',
      component: UsersRatingPageComponent,
      title: 'rating page',
    },
    {
      path: 'users/:idUser',
      component: UserDetailsPageComponent,
      title: 'details page',
    },
];
