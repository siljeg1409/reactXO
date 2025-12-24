import "../App.css";
import type { ReactNode } from "react";

type RowProps = {
  children: ReactNode;
};

export default function Row({children}: RowProps){
    return (
        <div className="row">
            {children}
        </div>
    );
}