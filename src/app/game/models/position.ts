export class Position {
	private _column:number;
	private _row:number;

	constructor( c:number, r:number){
		this._column = c;
		this._row = r;
	}

	get column(){
		return this._column;
	}

	set column(column){
		this._column=column;
	}

	get row(){
		return this._row;
	}

	set row(row){
		this._row=row;
	}
}
