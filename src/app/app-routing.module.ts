import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ToDoComponent} from './to-do/to-do.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path:'', redirectTo:'login',pathMatch:'full' },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'user', component: UserhomeComponent },
  { path:'lists', component: ToDoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
