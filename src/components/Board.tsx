import {useState} from 'react';
import Square from './Square';

export type SqareProps = {
    value: "X" | "O" | null;
    is_disabled: boolean;
    next_move: string;
    is_winning_cell: boolean;
    handle_click: () => void
}

const EMPTY_TABLE = Array(9).fill(null);
const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  

export default function Board(){
    let [table, setTable] = useState(EMPTY_TABLE);
    let [isX, setIsX] = useState(true);
    let [isDone, setIsDone] = useState(false);
    let [winningLine, setWinningLine] = useState<[number, number, number] | null>(null);

    let row_style = {display: "flex"};

    function checkWinner(board: (string | null)[]): any{
       for (const [a, b, c] of WINNING_LINES) {
        if (
            board[a] !== null &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return [a, b, c];
        }
    }
    return null;
    }

    function handleSqareClick(cell: number){
        if(table[cell]) return;

        let nextTable =table.map((value, index) => index == cell ? isX ? "X" : "O" : value);
        setTable(nextTable);
        let line = checkWinner(nextTable);
        if(line){
            setWinningLine(line);
            setIsDone(true);
        }
        else
            setIsX(!isX);
    }

    function resetGame(){
        setTable(EMPTY_TABLE)
        setIsDone(false);
        setIsX(true);
        setWinningLine(null);
    }

    return (
        <>
        {isDone 
        ? <><button className="reset_btn" onClick={resetGame}>Reset</button><p>The Winner is {isX ? "X" : "O"}</p></>
        : <p><b>It is {isX ? "X" : "O"} turn</b></p>}
        {
        [0,3,6].map((i) => (
        <div style={row_style}>
            {[i, i + 1, i + 2].map((j) => (
                <Square 
                key={j} 
                value={table[j]} 
                handle_click={() => handleSqareClick(j)} 
                is_disabled={isDone} 
                next_move={isX ? "X" : "O"} 
                is_winning_cell={winningLine?.includes(j) ?? false}
                /> 
            ))}
        </div>
        ))}
        </>        
    );    

}