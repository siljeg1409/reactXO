
import type {SqareProps} from './Board';
import "../App.css";

export default function Square({value, handleClick, isDisabled, nextMove}: SqareProps){



    return (
        <button className="square" onClick={handleClick} disabled={isDisabled} data-next_value={value ? "" : nextMove}>{value}</button>
    ); 

}