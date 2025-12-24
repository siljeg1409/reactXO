
import type {SqareProps} from './Board';
import "../App.css";

export default function Square({value, handle_click, is_disabled, next_move, is_winning_cell}: SqareProps){
    let disabled = is_disabled || (value != null);

    return (
        <button className={`square ${is_winning_cell ? "winner" : ""}`} onClick={handle_click} disabled={disabled} data-next_value={value ? "" : next_move}>{value}</button>
    ); 

}