import "../styles/Elements.scss";

import React from "react";

import { colorByPlayerID } from "./Consts";

export function PenguinIcon(playerID: number): JSX.Element {
    const colorStyle = colorByPlayerID[playerID];
    const gridStyle = "grid " + colorStyle;
    const cardStyle = "card " + colorStyle;

    return (
        <div className={gridStyle}>
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
                <div className={cardStyle}>
                    <div className="id">
                        <h1>{playerID}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PenguinLabourIcon(playerID: number): JSX.Element {
    return (
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
                <div className="wing1">
                    <div className="knife"></div>
                </div>
                <div className="wing2">
                    <div className="spoon"></div>
                </div>
            </div>
            <div className="belly"></div>
        </div>
    );
}

export function FishIcon(amount: number): JSX.Element {
    let fishPart = (
        <>
            <div className="eye"></div>
            <div className="tails">
                <div className="tail1"></div>
                <div className="tail2"></div>
            </div>
        </>
    );

    switch (amount) {
        case 1:
            return <div className="fish-1">{fishPart}</div>;
        case 2:
            return (
                <>
                    <div className="fish-2">{fishPart}</div>
                    <div className="fish-2">{fishPart}</div>
                </>
            );
        case 3:
            return (
                <>
                    <div className="fish-3">{fishPart}</div>
                    <div className="fish-3">{fishPart}</div>
                    <div className="fish-3">{fishPart}</div>
                </>
            );
    }
    return <></>;
}

export function FishBoxIcon(amount: number): JSX.Element {
    let blackFish = (
        <div className="blackFish">
            <div className="eye"></div>
            <div className="tails">
                <div className="tail1"></div>
                <div className="tail2"></div>
            </div>
        </div>
    );

    return (
        <div className="fishBox">
            <div className="tf-1">{blackFish}</div>
            <div className="tf-2">{blackFish}</div>
            <div className="tf-3">{blackFish}</div>
            <div className="tf-4">{blackFish}</div>
            <div className="box">
                <h1>{amount}</h1>
            </div>
        </div>
    );
}
