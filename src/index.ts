import { startMatrixApplication, clearMatrix, setCell, KeyPress } from "node-cli-character-matrix";

const N_ROWS = 15;
const N_COLUMNS = 15;
const INTERVAL_MS = 300;


type Position = {
	x: number; 
	y: number; 
}

type Snake = Position[];

function addVector(position: Position, vector: Position) : Position {
	return {
		x:position.x + vector.x, 
		y: position.y + vector.y
	}
}

function getVector(keyPress: KeyPress | null) : Position | null {
	if (keyPress) {
		switch (keyPress.name) {
			case "down": {
				return {
					x: 0,
					y: 1,
				}
			}
			case "up": {
				return {
					x: 0,
					y: -1,
				}
			}

			case "left": {
				return {
					x: -1,
					y: 0,
				}
			}

			case "right": {
				return {
					x: 1,
					y: 0,
				}
			}

			default: {
				return null; 
			}
		}
	}


	return null;

}

function updateSnake(snake: Snake, vector: Position, didGrow: boolean) {

	const newHead = addVector(snake[0], vector); 
	
	const body = snake.slice(0, -1); 
	const tail = snake[snake.length-1]; 
	const newSnake = [newHead, ...body, ...(didGrow? [tail] : [])]; 
	return newSnake; 
}

function arePositionsSame(p1: Position, p2: Position) : boolean {
	return p1.x === p2.x  && p1.y === p2.y; 
}

function generateRandomFruit(snake: Snake, nRows: number, nColumns: number) : Position {

	const randomPosition = {
		x: Math.floor(Math.random() * nColumns), 
		y: Math.floor(Math.random() * nRows)
	}

	const positionIsInSnake = snake.find((v) => v.x === randomPosition.x && v.y === randomPosition.y); 
	if (positionIsInSnake) {
		return generateRandomFruit(snake, nRows, nColumns); 
	}
	return randomPosition;
}

function drawMatrix  (matrix, snake: Snake, fruit: Position)  {
	const clearedMatrix = clearMatrix(matrix);

	const addedSnake = snake.reduce((acc, cur) => {
		return setCell(acc, cur.y, cur.x, 'X'); 
	}, clearedMatrix); 

	const addFruit = setCell(addedSnake, fruit.y, fruit.x, 'O'); 

	return addFruit; 

}


/**
 * Functional/folding style of state management
 */

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	initialState: {
		snake: [{
			x: 5, 
			y: 5
		}] as Snake, 
		fruit: {
			x: 10, 
			y: 10, 
		},
		snakeState: {
			direction: {
				x: -1, 
				y: 0
			}
		} 
	},
	onTick: (matrix, tickCount, exit, keyPress, oldState) => {

		const {snake, fruit, snakeState} = oldState; 

		const snakeHead = snake[0]; 
		
		const didGrow = arePositionsSame(snakeHead, fruit);
		const newVector = getVector(keyPress) || snakeState.direction; 


		const newSnake = updateSnake(oldState.snake, newVector, didGrow); 

		console.log(newSnake);

		const newFruit = didGrow ? generateRandomFruit(snake, N_ROWS, N_COLUMNS) : fruit; 


		const newMatrix = drawMatrix(matrix, newSnake, newFruit); 


		return {
			newMatrix, 
			newState: {
				snake: newSnake, 
				fruit: newFruit, 
				snakeState: {
					direction: newVector
				}
			}
		}; 

	}
});


