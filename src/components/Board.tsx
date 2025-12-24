import {useState} from 'react';
import Square from './Square';

export type SqareProps = {
    value: "X" | "O" | null;
    isDisabled: boolean;
    nextMove: string;
    handleClick: () => void
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

    let row_style = {display: "flex"};

    function checkWinner(board: (string | null)[]){
       return WINNING_LINES.some(([a, b, c]) => board[a] != null && board[a] == board[b] && board[a] == board[c]);
    }

    function handleSqareClick(cell: number){
        if(table[cell]) return;

        let nextTable =table.map((value, index) => index == cell ? isX ? "X" : "O" : value);
        setTable(nextTable);
        let winner = checkWinner(nextTable);
        if(winner)
            setIsDone(true);
        else
            setIsX(!isX);
    }

    function resetGame(){
        setTable(EMPTY_TABLE)
        setIsDone(false);
        setIsX(true);
    }

    return (
        <>
        {isDone 
        ? <><button className="reset_btn" onClick={resetGame}>Reset</button><p>The Winner is {isX ? "X" : "O"}</p></>
        : <p>It is {isX ? "X" : "O"} turn</p>}
        {
        [0,3,6].map((i) => (
        <div style={row_style}>
            {[i, i + 1, i + 2].map((j) => (
                <Square key={j} value={table[j]} handleClick={() => handleSqareClick(j)} isDisabled={isDone} nextMove={isX ? "X" : "O"}/> 
            ))}
        </div>
        ))}
        </>        
    );    

}