import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { ConversationsComponent } from './conversations/conversations.component';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'ajout-utilisateur', component: EditUserComponent },
  { path: 'modifier-utilisateur/:id', component: EditUserComponent },
  { path: 'gestion-utilisateurs', component: ManageUserComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'discussions/:conversationId', component: DiscussionsComponent },
  { path: 'conversations', component: ConversationsComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
