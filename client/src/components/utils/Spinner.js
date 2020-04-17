import React from 'react';

const Spinner = () => {
    return (
        <div className="row">
            <div className="col s5"/>
            <div className="col s4">
                <div className="preloader-wrapper big active center">
                    <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col s4"/>
        </div>
    )
}

export default Spinner;