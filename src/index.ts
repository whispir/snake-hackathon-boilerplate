import { startMatrixApplication, clearMatrix, setCell } from "node-cli-character-matrix";

const N_ROWS = 5;
const N_COLUMNS = 5;
const INTERVAL_MS = 100;

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	onTick: (matrix, tickCount, exit) => {
		const clearedMatrix = clearMatrix(matrix);
		const newMatrix = setCell(clearedMatrix, tickCount % N_ROWS, tickCount % N_COLUMNS, 'X');

		if (tickCount > 20) {
			exit("Thank you for playing!");
		}
		return {newMatrix, newState: null};
	},
	initialState: null,
});