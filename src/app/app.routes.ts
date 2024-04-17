import { Routes } from '@angular/router';
import { UserListComponent } from './user/feature/user-list/user-list.component';
import { UserDetailComponent } from './user/feature/user-detail/user-detail.component';


export const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      { path: ':id', component: UserDetailComponent },
    ],
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
