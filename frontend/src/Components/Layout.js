import React, { useEffect, useState } from 'react';
import Input from './Input';
import Edit from './Edit';

const Layout = () => {
    
    const [VGames, setVGames] = useState([]);

    //Get all of the video games stored in database
    const getVGames = async () => {
        try {
            const data = await fetch('http://localhost:4000/videogames');
            const json = await data.json();
            setVGames(json);
        } catch (error) {
            console.log(error.message)
        }
    }

    //Launch exe file associated with video game
    const execute = (event, pathlink) => {
        const { execFile } = require('child_process');
        console.log(pathlink);
        /*const child = execFile('C:/Users/Justin/AppData/Local/Postman/Postman.exe', (error) => {
            console.log(error);
        });*/
    } 

    useEffect(() => {
        getVGames();
    }, []);

    return (
        <>  
            <div className ='center'>
                <h1>Video Game Manager</h1>
                <Input VGames/>
            </div>
            <div className ='layout'>
                {VGames.map(VGames => (
                    <section key ={VGames.vg_id}>
                        <img src={`${VGames.picturelink}`} alt=""></img>
                        <h4>{VGames.name}</h4>
                        <button onClick = {event => execute(event, `${VGames.pathlink}`)}>Launch Game</button>
                        <Edit VGames = {VGames}/>
                    </section>
                ))}
            </div>
        </>
    );
};

export default Layout;