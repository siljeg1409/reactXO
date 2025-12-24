import {useReducer} from 'react';
import Square from './Square';
import Row from './Row';
import Footer from './Footer';

type WINNING_LINE = [number, number, number];
type Cell = "X" | "O" | undefined;
type State = {
table: Cell[];
isX: boolean;
isDone: boolean;
winningLine?: WINNING_LINE;
};
type Action =
| { type: "MOVE"; cell: number }
| { type: "WIN"; line: WINNING_LINE }
| { type: "RESET" };


const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

const INITIAL_STATE: State = {
    table: Array(9).fill(undefined),
    isX: true,
    isDone: false,
    winningLine: undefined,
    };

export default function Board(){
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { table, isX, isDone, winningLine } = state;
    const current_player = isX ? "X" : "O";

    const checkWinner = (board: Cell[]): WINNING_LINE | undefined => {
    for (const [a, b, c] of WINNING_LINES) {
        if (
            board[a] !== undefined &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return [a, b, c];
        }
    }
    }

    const handleSqareClick = (cell: number) => {
        if (state.isDone || state.table[cell]) return;
        const nextTable = [...state.table];
        nextTable[cell] = current_player;
        const line = checkWinner(nextTable);
        dispatch({ type: "MOVE", cell });
        if (line) {
            dispatch({ type: "WIN", line });
        }
    };
    const handleResetGame = () => {
        dispatch({ type: "RESET" });
    };

    function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "MOVE": {
            if (state.isDone || state.table[action.cell]) return state;
            const table = [...state.table];
            table[action.cell] = state.isX ? "X" : "O";
            return {
            ...state,
            table,
            isX: !state.isX,
            };
        }
        case "WIN":
            return {
            ...state,
            isDone: true,
            winningLine: action.line,
            };
        case "RESET":
            return INITIAL_STATE;
        }
    }

    return (
        <>
        <p className="status">
            {isDone ? `The winner is ${current_player}` : `It is ${current_player} turn`}
        </p>
        <Row>
            <Square key="0" cellValue={table[0]}  handleClick={() => handleSqareClick(0)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(0) ?? false}/>
            <Square key="1" cellValue={table[1]}  handleClick={() => handleSqareClick(1)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(1) ?? false}/>
            <Square key="2" cellValue={table[2]}  handleClick={() => handleSqareClick(2)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(2) ?? false}/>
        </Row>
        <Row>
            <Square key="3" cellValue={table[3]}  handleClick={() => handleSqareClick(3)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(3) ?? false}/>
            <Square key="4" cellValue={table[4]}  handleClick={() => handleSqareClick(4)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(4) ?? false}/>
            <Square key="5" cellValue={table[5]}  handleClick={() => handleSqareClick(5)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(5) ?? false}/>
        </Row>
        <Row>
            <Square key="6" cellValue={table[6]}  handleClick={() => handleSqareClick(6)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(6) ?? false}/>
            <Square key="7" cellValue={table[7]}  handleClick={() => handleSqareClick(7)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(7) ?? false}/>
            <Square key="8" cellValue={table[8]}  handleClick={() => handleSqareClick(8)} isDisabled={isDone} nextMove={current_player} isWinningCell={winningLine?.includes(8) ?? false}/>
        </Row>
        {isDone && <Footer handleResetGame={handleResetGame}/>} 
        </>        
    );    

}

