import { Component, OnInit } from '@angular/core';
import { Matrix,Row,Column, Block, Position} from '../models/models';
import { EngineService } from '../services/engine.service';


@Component({
  selector: 'game',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  columns: number = 65;
  rows: number = 50;
  matrix:Matrix;
  blocks:Block[]=[];

  stopFlag:boolean = true;
  steps:number=0;


  constructor(private engine:EngineService) {

    this.matrix=engine.matrixFactory(this.columns,this.rows);

  }

  ngOnInit() {  }


  active(block:Block){

    block.active=(block.active?false:true);

    this.engine.addToAll(block,this.blocks);

    let neighboringBlocks:Block[]=this.engine.findNeighbors(block.col,block.row,this.matrix);
    
    neighboringBlocks.forEach(nblock=>{
      this.engine.addToAll(nblock,this.blocks);
    })

  }

  run(){
    this.stopFlag=false;
    this.steps=0;

    setTimeout(()=>{

    this.blocks.forEach(block=>{
      let blocks:Block[]=this.engine.findNeighbors(block.col,block.row,this.matrix);
      this.engine.setAction(block,this.engine.getActiveCount(blocks));
    });

    this.engine.applyActions(this.blocks);

    this.blocks=this.engine.nextGenerationReset(this.blocks,this.matrix);

    if(!this.stopFlag){
        this.steps++;
        this.run();
      }
    },200);

  }


  stop(){
    this.stopFlag=true;
  }

  clear(){
    this.engine.clearBlocks(this.blocks);
    this.blocks=[];
  }

}

