import React from 'react';

import './AnimatedGreenCheckMark.style.css'

const style = {
    checkMark: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'block',
        strokeWidth: 2,
        stroke: '#fff',
        strokeMiterlimit: 10,
        boxShadow: 'inset 0px 0px 0px #7ac142',
        animation: 'fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both',
    },
    circle: {
        strokeDasharray: 166,
        strokeDashoffset: 166,
        strokeWidth: 2,
        strokeMiterlimit: 10,
        stroke: '#7ac142',
        fill: 'none',
        animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
    },
    check : {
        transformOrigin: '50% 50%',
        strokeDasharray: 48,
        strokeDashoffset: 48,
        animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
    }
}

const AnimatedCheckMark = () => {
    return (
        <svg style={{...style.checkMark}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle style={{...style.circle}} cx="26" cy="26" r="25" fill="none"/>
            <path style={{...style.check}} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    )
}

export default AnimatedCheckMark;
