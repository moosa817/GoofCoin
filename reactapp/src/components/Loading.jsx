import React from 'react';

const Loading = () => {
    const styles = `
    body {
        min-height: 100vh;
        font-family: Roboto, Arial;
        color: #ffffff; /* Text color from theme */
        display: flex;
        justify-content: center;
        align-items: center;
        background: #313c87; /* Background color from theme */
    }

    .boxes {
        height: 32px;
        width: 32px;
        position: relative;
        transform-style: preserve-3d;
        transform-origin: 50% 50%;
        margin-top: 32px;
        transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
    }
    
    .boxes .box {
        width: 32px;
        height: 32px;
        top: 0px;
        left: 0;
        position: absolute;
        transform-style: preserve-3d;
    }
    
    .boxes .box:nth-child(1) {
        transform: translate(100%, 0);
        animation: box1 1s linear infinite;
    }

    .boxes .box:nth-child(2) {
        transform: translate(0, 100%);
        animation: box2 1s linear infinite;
    }

    .boxes .box:nth-child(3) {
        transform: translate(100%, 100%);
        animation: box3 1s linear infinite;
    }

    .boxes .box:nth-child(4) {
        transform: translate(200%, 0);
        animation: box4 1s linear infinite;
    }

    .boxes .box > div {
        background: #50acf7; /* Primary color from theme */
        --translateZ: 15.5px;
        --rotateY: 0deg;
        --rotateX: 0deg;
        position: absolute;
        width: 100%;
        height: 100%;
        background: #50acf7;
        top: auto;
        right: auto;
        bottom: auto;
        left: auto;
        transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
    }

    .boxes .box > div:nth-child(1) {
        top: 0;
        left: 0;
        background: #50acf7; /* Primary color from theme */
    }

    .boxes .box > div:nth-child(2) {
        background: #144185; /* Secondary color from theme */
        right: 0;
        --rotateY: 90deg;
    }

    .boxes .box > div:nth-child(3) {
        background: #74f2cc; /* Accent color from theme */
        --rotateX: -90deg;
    }

    .boxes .box > div:nth-child(4) {
        background: #DBE3F4;
        top: 0;
        left: 0;
        --translateZ: -90px;
    }

    @keyframes box1 {
        0%,
        50% {
            transform: translate(100%, 0);
        }
        100% {
            transform: translate(200%, 0);
        }
    }

    @keyframes box2 {
        0% {
            transform: translate(0, 100%);
        }
        50% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(100%, 0);
        }
    }

    @keyframes box3 {
        0%,
        50% {
            transform: translate(100%, 100%);
        }
        100% {
            transform: translate(0, 100%);
        }
    }

    @keyframes box4 {
        0% {
            transform: translate(200%, 0);
        }
        50% {
            transform: translate(200%, 100%);
        }
        100% {
            transform: translate(100%, 100%);
        }
    }
  `;

    return (
        <>
            <style>{styles}</style>
            <div className="boxes">
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default Loading;
