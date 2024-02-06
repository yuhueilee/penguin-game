import React from "react";

import { colorByPlayerID } from "./Consts";

export function PenguinIcon(playerID: number): JSX.Element {
    const color = colorByPlayerID[playerID];

    return (
        <div>
            {playerID} {color}
        </div>
    );
}
