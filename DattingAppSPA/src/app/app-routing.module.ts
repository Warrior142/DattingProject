import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { AuthGuard } from "./guards/auth.guard";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailResolver } from './_resolvers/member-details.resolver';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent,resolve:{users:MemberListResolver}},
      { path: "members/:id", component: MemberDetailsComponent,resolve:{user:MemberDetailResolver} },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
