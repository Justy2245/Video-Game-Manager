import React from "react";

const Input = ({ VGames }) => {
    
    const addVGame = () => {
        console.log('temp');
    }

    return (
        <>
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${VGames.vg_id}`}>
                Add New Game
            </button>
        </div>

        <div className="modal" id={`id${VGames.vg_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <input type="text" className="form-control" placeholder ='Enter Name'/>
                    <input type="text" className="form-control mt-2 mb-2" placeholder ='Enter Path (Ex: D:/folder/folder1/name.exe)'/>
                    <input type="text" className="form-control" placeholder ='Enter Picture Link'/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal">
                        Add
                    </button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">
                        Close
                    </button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Input;