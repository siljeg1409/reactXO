import {useState} from 'react';
import Square from './Square';

export type SqareProps = {
    value: "X" | "O" | null;
    isDisabled: boolean;
    handleClick: () => void
}

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
    let [table, setTable] = useState(Array(9).fill(null));
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

    return (
        <>
        {isDone 
        ? <p>The Winner is {isX ? "X" : "O"}</p> 
        : <p>It is {isX ? "X" : "O"} turn</p>}
        {
        [0,3,6].map((i) => (
        <div style={row_style}>
            {[i, i + 1, i + 2].map((j) => (
                <Square key={j} value={table[j]} handleClick={() => handleSqareClick(j)} isDisabled={isDone}/> 
            ))}
        </div>
        ))}
        </>        
    );    

}