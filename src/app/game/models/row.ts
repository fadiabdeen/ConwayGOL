import { Column } from './models'

export class Row {

	private _columns: Column[]=[];


	get columns(){
		return this._columns;
	}

	push(column:Column){
		this._columns.push(column);
	}
	
}
