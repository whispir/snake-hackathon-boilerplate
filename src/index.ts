import { startMatrixApplication, clearMatrix, setCell, KeyPress } from "node-cli-character-matrix";

const N_ROWS = 15;
const N_COLUMNS = 15;
const INTERVAL_MS = 300;

/**
 * Functional/folding style of state management
 */

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	initialState: {

	},
	onTick: (matrix, tickCount, exit, keyPress, oldState) => {

		return {
			newMatrix, 
			newState: {
		
			}
		}; 

	}
});


