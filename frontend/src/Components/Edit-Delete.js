import React, {useState} from "react";

const Edit = ({ VGames }) => {
    const [VGames1, setVGames] = useState(VGames);
    
    //edit video game via PUT request
    const editVGame = async event => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/videogames/${VGames.vg_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(VGames1)
            });
        window.location ='/';
        } catch (error) {
            console.error(error.message);
        }
    };
    //delete video game via DELETE request
    const deleteVGame = async event => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/videogames/${VGames.vg_id}`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(VGames1)
            });
            window.location ='/';
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            <button type="button" data-toggle="modal" data-target={`#id${VGames.vg_id}`}>
                Edit/Delete
            </button>

        <div className="modal" id = {`id${VGames.vg_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <input type="text" className="form-control" value = {VGames1.name} name = 'name' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" value = {VGames1.pathlink} name = 'pathlink' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control" value = {VGames1.picturelink} name = 'picturelink' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = {event => deleteVGame(event)}>
                        Delete
                    </button>
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = {event => editVGame(event)}>
                        Edit
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

export default Edit;