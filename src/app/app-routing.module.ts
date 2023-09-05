import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostComponent } from './Principal/CreatePost/post/post.component';

const routes: Routes = [

{path: "",component:AppComponent},
{path:"createPost",component:PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
