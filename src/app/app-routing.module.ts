import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CombinationsComponent } from './combinations/combinations.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'combinations', component: CombinationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
