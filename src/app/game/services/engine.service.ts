import { Injectable } from '@angular/core';
import { Matrix, Row, Column, Position, Block} from '../models/models';


@Injectable()
export class EngineService {

  constructor() { }


  matrixFactory(columns:number, rows:number){

  	let matrix=new Matrix(columns,rows);

  	for(let i=0; i<rows;i++){  		
  		let row:Row = new Row();
  		for(let j=0; j<columns;j++){
			row.push(new Column(j,i));
		}
        matrix.push(row);
  	}

  	return matrix;

  }

  getBlock(column:number, row:number,matrix:Matrix){
  	return matrix.rows[row].columns[column].block;

  }

  getPossibleNeighbors(column:number, row:number){
    
    let positions:Position[]=[];

    positions.push(new Position(column-1,row-1));
    positions.push(new Position(column-1,row));
    positions.push(new Position(column,row-1));
    positions.push(new Position(column+1,row+1));
    positions.push(new Position(column,row+1));
    positions.push(new Position(column+1,row));
    positions.push(new Position(column-1,row+1));
    positions.push(new Position(column+1,row-1));

    return positions;

  }

  findNeighbors(column:number, row:number,matrix:Matrix):Block[]{

  	let positions:Position[]=this.getPossibleNeighbors(column,row);

    return this.getValidNeighbors(positions,matrix);



  }

  isValidPosition(position:Position,matrix:Matrix){

    let valid:boolean=true;

    if( position.column < 0 || 
       position.row < 0 || 
       position.row > matrix.rowsSize-1 || 
       position.column > matrix.columnsSize-1 ){

      valid=false;

    }

    return valid;
  }

  getValidNeighbors(positions:Position[],matrix:Matrix){

   let blocks:Block[]=[];

   positions.forEach(position =>{

     if(this.isValidPosition(position,matrix)){

       blocks.push(this.getBlock(position.column,position.row,matrix));

     }

   });

   return blocks;

  }

  getActiveCount(blocks:Block[]){

    let count:number=0;
    blocks.forEach(block =>{
      if(block.active) count++;
    });

    return count;
  }

  setAction(block:Block, count:number){


    
    if(block.active){

      if(count<2){ 
        //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        block.action=false;

      }else if(count === 3 || count === 2){
        //Any live cell with two or three live neighbours lives on to the next generation.
        block.action=true;
      }else {
        //Any live cell with more than three live neighbours dies, as if by overpopulation.
        block.action=false;
      }

      console.log("ALIVE "+block.col+" "+block.row +" "+block.action+"("+count+")");

    }else {
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if(count==3){
        block.action=true;
      }else {
        block.action=false;
      }

      //console.log("DEAD "+block.col+" "+block.row +" "+block.action+"("+count+")");

    }
  }

  clearBlocks(blocks:Block[]){

    blocks.forEach(block=>{
      block.active=false;
    })
  }

  applyActions(blocks:Block[]){

    blocks.forEach(block=>{
      block.active=block.action;
    });

  }

  isExist(block:Block,blocks:Block[]):boolean{
    if(blocks.find(b=> b.col==block.col && b.row==block.row)==undefined){
      return false;
    }else return true;
  }

  addToAll(block:Block,blocks:Block[]){
    if(!this.isExist(block,blocks)){
      blocks.push(block);
    }
  }

  nextGenerationReset(blocks:Block[], matrix:Matrix){
    //find active blocks and their neighbors and replace this with blocks;

    let newBlocks:Block[]=[];

    blocks.forEach(block=>{
      if(block.active){
        this.addToAll(block,newBlocks);
        let neighboringBlocks:Block[]=this.findNeighbors(block.col,block.row,matrix);
        neighboringBlocks.forEach(b=>{
          this.addToAll(b,newBlocks);
        })
      }
    });

    return newBlocks;
  }

}
