import { Block } from './models';

export class Column {

	private _block: Block;

	constructor(col,row){
		this._block=new Block(col,row);
	}


	get block(){
		return this._block;
	}
}
