import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { EngineService} from './services/engine.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent],
  bootstrap:[MainComponent],
  providers:[EngineService]
})
export class GameModule { }
