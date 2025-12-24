
import "../App.css";

type FooterProps = {
    handleResetGame: () => void;
}

export default function Footer({ handleResetGame }: FooterProps){
    
    return (
        <>
        <button 
        className="reset_btn" 
        onClick={handleResetGame}
        >
        Reset
        </button>
        </>);
}