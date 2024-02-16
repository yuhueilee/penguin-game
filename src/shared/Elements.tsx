import "../styles/Elements.scss";

import React from "react";

import { colorByPlayerID } from "./Consts";

export function PenguinIcon(
    playerID: number,
    ratio: number,
    active: boolean
): JSX.Element {
    const colorStyle = colorByPlayerID[playerID];
    const gridStyle = "grid " + colorStyle;
    const scaleStyle = {
        transform: "scale(" + ratio + ")",
    };
    const bodyStateStyle = active ? "body active" : "body";

    return (
        <div style={scaleStyle}>
            <div className={gridStyle}>
                <div className={bodyStateStyle}>
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
        </div>
    );
}

export function PenguinLabourIcon(
    playerID: number,
    ratio: number,
    active: boolean
): JSX.Element {
    if (playerID === -1) {
        return <></>;
    }

    const colorStyle = colorByPlayerID[playerID];
    const labourStyle = "penguinLabour " + colorStyle;
    const scaleStyle = {
        transform: "scale(" + ratio + ")",
    };
    const bodyStateStyle = active ? "body active" : "body";

    return (
        <div className={labourStyle}>
            <div style={scaleStyle}>
                <div className={bodyStateStyle}>
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
            </div>
        </div>
    );
}

export function FishIcon(amount: number, ratio: number): JSX.Element {
    const scaleStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transform: "scale(" + ratio + ")",
    };

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
            return (
                <div style={scaleStyle}>
                    <div className="fish-1">{fishPart}</div>
                </div>
            );
        case 2:
            return (
                <div style={scaleStyle}>
                    <div className="fish-2">{fishPart}</div>
                    <div className="fish-2">{fishPart}</div>
                </div>
            );
        case 3:
            return (
                <div style={scaleStyle}>
                    <div className="fish-3">{fishPart}</div>
                    <div className="fish-3">{fishPart}</div>
                    <div className="fish-3">{fishPart}</div>
                </div>
            );
    }
    return <></>;
}

export function FishBoxIcon(
    amount: number,
    playerID: number,
    ratio: number
): JSX.Element {
    const scaleStyle = {
        transform: "scale(" + ratio + ")",
    };

    let blackFish = (
        <div className="blackFish">
            <div className="eye"></div>
            <div className="tails">
                <div className="tail1"></div>
                <div className="tail2"></div>
            </div>
        </div>
    );

    const boxStyle = "box " + colorByPlayerID[playerID];

    return (
        <div style={scaleStyle}>
            <div className="fishBox">
                <div className="tf-1">{blackFish}</div>
                <div className="tf-2">{blackFish}</div>
                <div className="tf-3">{blackFish}</div>
                <div className="tf-4">{blackFish}</div>
                <div className={boxStyle}>
                    <h1>{amount}</h1>
                </div>
            </div>
        </div>
    );
}

export function Celebration(): JSX.Element {
    return (
        <div className="allRibbons">
            <div className="ribbon1"></div>
            <div className="ribbon2"></div>
            <div className="ribbon3"></div>
            <div className="ribbon4"></div>
            <div className="ribbon5"></div>
            <div className="ribbon6"></div>
            <div className="ribbon7"></div>
            <div className="ribbon8"></div>
            <div className="ribbon9"></div>
            <div className="ribbon10"></div>
            <div className="ribbon11"></div>
            <div className="ribbon12"></div>
            <div className="ribbon13"></div>
            <div className="ribbon14"></div>
            <div className="ribbon15"></div>
            <div className="ribbon16"></div>
            <div className="ribbon17"></div>
            <div className="ribbon18"></div>
            <div className="ribbon19"></div>
            <div className="ribbon20"></div>
            <div className="ribbon21"></div>
            <div className="ribbon22"></div>
            <div className="ribbon23"></div>
            <div className="ribbon24"></div>
            <div className="ribbon25"></div>
            <div className="ribbon26"></div>
            <div className="ribbon27"></div>
            <div className="ribbon28"></div>
            <div className="ribbon29"></div>
            <div className="ribbon30"></div>
            <div className="ribbon31"></div>
            <div className="ribbon32"></div>
            <div className="ribbon33"></div>
            <div className="ribbon34"></div>
            <div className="ribbon35"></div>
            <div className="ribbon36"></div>
            <div className="ribbon37"></div>
            <div className="ribbon38"></div>
            <div className="ribbon39"></div>
            <div className="ribbon40"></div>
            <div className="ribbon41"></div>
            <div className="ribbon42"></div>
            <div className="ribbon43"></div>
            <div className="ribbon44"></div>
            <div className="ribbon45"></div>
            <div className="ribbon46"></div>
            <div className="ribbon47"></div>
            <div className="ribbon48"></div>
            <div className="ribbon49"></div>
            <div className="ribbon50"></div>
        </div>
    );
}
