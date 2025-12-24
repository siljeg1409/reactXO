
import type {SqareProps} from './Board';

export default function Square({value, handleClick, isDisabled}: SqareProps){

    let square_style = {
        border: "1px solid black",
        width: "100px",
        height: "100px",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        backgroundColor: "indigo",
        color: "#FFF"
    };

    return (
        <button style={square_style} onClick={handleClick} disabled={isDisabled}>{value}</button>
    ); 
    
}