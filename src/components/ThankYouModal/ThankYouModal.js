import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Paper from "../UI/Paper";
import AnimatedCheckMark from "../../assets/icons/react-icons/AnimatedGreenCheckMark/AnimatedGreenCheckMark";

import "./ThankYouModal.style.css";

const ThankYouModal = () => {

    const history = useHistory();
    const { pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => history.push(pathname.replace('/thank-you','')), 2000)
    }, [history, pathname]);

    return (
        <Paper className={"ThankYouModal"}>
            <AnimatedCheckMark />
            <span id={"ThankYouText"}> Zahvaljujemo se na Vašoj narudzbi ! </span>
        </Paper>
    )
}

export default ThankYouModal;
