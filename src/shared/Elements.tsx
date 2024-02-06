import "../styles/Elements.scss";

import React from "react";

import { colorByPlayerID } from "./Consts";

export function PenguinIcon(playerID: number): JSX.Element {
    const color = colorByPlayerID[playerID];

    return (
        <div className="grid">
            <div className="body">
                <div className="face">
                    <div className="eyes">
                        <div className="eye1">
                            <div className="eyeBall1"></div>
                        </div>
                        <div className="eye2">
                            <div className="eyeBall2"></div>
                        </div>
                    </div>
                    <div className="mouth"></div>
                </div>
                <div className="feet">
                    <div className="foot"> </div>
                    <div className="foot"></div>
                </div>
                <div className="wings">
                    <div className="wing1"></div>
                    <div className="wing2"></div>
                </div>
                <div className="belly"></div>
                <div className="card">
                    <div className="id">
                        <h1>{playerID}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
