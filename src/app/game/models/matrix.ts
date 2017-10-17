import { Row } from './models'
export class Matrix {

	private _columnsSize;
	private _rowsSize;
	private _rows:Row[]=[];

	constructor(columnsSize, rowsSize) {

		this._rowsSize=rowsSize;
		this._columnsSize=columnsSize;
	}

	get rows(){
		return this._rows;
	}

	get rowsSize(){
		return this._rowsSize;
	}

	get columnsSize(){
		return this._columnsSize;
	}

	public push(row:Row){
		this._rows.push(row);
	}

}
