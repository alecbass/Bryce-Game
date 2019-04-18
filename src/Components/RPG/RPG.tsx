import * as React from "react";
import { RPGContextProvider } from "./Context";
import RPGMap from "./Map/Map";

const ScreenRPG: React.FC = props => {

    return (
        <RPGContextProvider>
            <RPGMap />
        </RPGContextProvider>
    );

}

export default ScreenRPG;