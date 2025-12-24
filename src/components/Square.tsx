
import "../App.css";

export type SqareProps = {
    cellValue?: "X" | "O";
    isDisabled: boolean;
    nextMove: string;
    isWinningCell: boolean;
    handleClick: () => void
}

export default function Square(props: SqareProps){
    const disabled = props.isDisabled || (props.cellValue != null);
    const win_cls = props.isWinningCell ? ' winner' : '';
    const next_value = props.cellValue ? "" : props.nextMove;
    console.log(props.isWinningCell);
    
    return (
        <button 
        className={`square${win_cls}`} 
        onClick={props.handleClick} 
        disabled={disabled} 
        data-next_value={next_value}
        >
        {props.cellValue}
        </button>
    ); 
}