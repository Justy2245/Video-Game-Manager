import React, {useState} from "react";

const Edit = ({ VGames }) => {
    const [VGames1, setVGames] = useState(VGames);
    
    //Add new video game to database via post request
    const editVGame = async event => {
        event.preventDefault();
        try {
            /*const response = await fetch('http://localhost:4000/videogames', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(VGames1)
            });
        window.location ='/';*/
        console.log(VGames.name)
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
                    <input type="text" className="form-control" value = {VGames.name} name = 'name' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" value = {VGames.pathlink} name = 'pathlink' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control" value = {VGames.picturelink} name = 'picturelink' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = {event => editVGame(event)}>
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