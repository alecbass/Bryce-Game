import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

interface Props {
    target?: string;
    dispatch: any;
}

const Battle: React.FC<Props> = props => {


    function getTarget() {
        return props.target ? document.getElementById(props.target) : document.getElementById("document");
    }
    return (
        <div>Battle</div>
    );
};

export default connect((state) => ({ }))(Battle);