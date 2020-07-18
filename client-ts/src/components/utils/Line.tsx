import React from 'react';

interface Props {
    showRed: boolean;
}

const Line: React.FC<Props> = ({ showRed }) => {
    return (
        <div className="box">
            <div className={`box-sm ${showRed ? 'red-bg' : 'b1'}`}></div>
            <div className={`box-sm ${showRed ? 'pink-bg' : 'b2'}`}></div>
            <div className={`box-sm ${showRed ? 'purple-bg' : 'b3'}`}></div>
        </div>
    )
}

export default Line;