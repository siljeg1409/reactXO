import {useState} from 'react';
import Square from './Square';
import Row from './Row';


type WINNING_LINE = [number, number, number];
const EMPTY_TABLE = Array(9).fill(undefined);
const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

export default function Board(){
    let [table, setTable] = useState(EMPTY_TABLE);
    let [isX, setIsX] = useState(true);
    let [isDone, setIsDone] = useState(false);
    let [winningLine, setWinningLine] = useState<WINNING_LINE>();


    const checkWinner = (board: (string | undefined)[]): WINNING_LINE | undefined => {
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
        if(table[cell]) return;

        let nextTable = table.map((value, index) => index == cell ? isX ? "X" : "O" : value);
        setTable(nextTable);
        
        let line = checkWinner(nextTable);
        if(line){
            setWinningLine(line);
            setIsDone(true);
        }
        else
            setIsX(!isX);
    }

    const resetGame = () => {
        setTable(EMPTY_TABLE)
        setIsDone(false);
        setIsX(true);
        setWinningLine(undefined);
    }

    return (
        <>
        <p className="status">
        {isDone ? "" : `It is ${isX ? "X" : "O"} turn`}
        </p>
        <Row>
            <Square key="0" cellValue={table[0]}  handleClick={() => handleSqareClick(0)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(0) ?? false}/>
            <Square key="1" cellValue={table[1]}  handleClick={() => handleSqareClick(1)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(1) ?? false}/>
            <Square key="2" cellValue={table[2]}  handleClick={() => handleSqareClick(2)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(2) ?? false}/>
        </Row>
        <Row>
            <Square key="3" cellValue={table[3]}  handleClick={() => handleSqareClick(3)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(3) ?? false}/>
            <Square key="4" cellValue={table[4]}  handleClick={() => handleSqareClick(4)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(4) ?? false}/>
            <Square key="5" cellValue={table[5]}  handleClick={() => handleSqareClick(5)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(5) ?? false}/>
        </Row>
        <Row>
            <Square key="6" cellValue={table[6]}  handleClick={() => handleSqareClick(6)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(6) ?? false}/>
            <Square key="7" cellValue={table[7]}  handleClick={() => handleSqareClick(7)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(7) ?? false}/>
            <Square key="8" cellValue={table[8]}  handleClick={() => handleSqareClick(8)} isDisabled={isDone} nextMove={isX ? "X" : "O"} isWinningCell={winningLine?.includes(8) ?? false}/>
        </Row>
        {isDone && <><button className="reset_btn" onClick={resetGame}>Reset</button><p>The Winner is {isX ? "X" : "O"}</p> </>}
        </>        
    );    

}

