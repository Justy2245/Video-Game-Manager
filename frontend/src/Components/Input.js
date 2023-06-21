import React, {useState} from "react";

const Input = ({ VGames }) => {
    const [VGames1, setVGames] = useState(VGames);
    
    //Add new video game to database via post request
    const addVGame = async event => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/videogames', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(VGames1)
            });
        window.location ='/';
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target='#mainModal'>
                Add New Game
            </button>
        </div>

        <div className="modal" id ='mainModal'>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <input type="text" className="form-control" placeholder ='Enter Name' name = 'name' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" placeholder ='Enter Path (Ex: D:/folder/folder1/name.exe)' name = 'pathlink' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control" placeholder ='Enter Picture Link' name = 'picturelink' onChange ={event => setVGames({...VGames1, [event.target.name]: event.target.value})}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = {event => addVGame(event)}>
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