export class Block {

	constructor(col,row){
		this._active=false;
		this._col=col;
		this._row=row;
	}

	private _active:boolean;

	//Action to take for the generation
	//True for live
	//False for die
	private _action:boolean;
	private _row:number;
	private _col:number;

	get active(){
		return this._active;
	}

	set active(active){
		this._active=active;
	}

	get row(){
		return this._row;
	}

	get col(){
		return this._col;
	}

	set row(row){
		this._row=row;
	}

	set col(col){
		this._col=col;
	}

	get action(){
		return this._action;
	}

	set action(action:boolean){
		this._action=action;
	}

}
