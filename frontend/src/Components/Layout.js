import React, { useEffect, useState } from 'react';
import Input from './Input';
import Edit from './Edit-Delete';
var sorted = 'alpha';

const Layout = () => {

    const [VGames, setVGames] = useState([]);

    //get all of the video games stored in database in alphabetical order
    const getVGames = async () => {
        try {
            const data = await fetch('http://localhost:4000/videogames/alpha');
            const json = await data.json();
            setVGames(json);
        } catch (error) {
            console.log(error.message);
        }
    }
    //get all of the video games stored in database ordered by recently used
    const getVGames1 = async () => {
        try {
            const data = await fetch('http://localhost:4000/videogames/recent');
            const json = await data.json();
            setVGames(json);
        } catch (error) {
            console.log(error.message);
        }
    }

    //launch exe file associated with video game
    const execute = async (event, vg_id) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/videogames/launch/${vg_id}`);
        } catch (error) {
            console.log(error.message);
        }
    } 

    const alpha = (event) => {
        localStorage.setItem('sorted', 'alpha');
        window.location = '/';
    }

    const recent = (event) => {
        localStorage.setItem('sorted', 'recent');
        window.location = '/';
    }

    useEffect(() => {
        if(localStorage.getItem('sorted') === 'recent')
        {
            getVGames1();
        }
        else {
            getVGames();
        }
    }, []);

    return (
        <>  
            
            <div className ='center'>
                <h1>Video Game Manager</h1>
                <Input VGames/>
                <button onClick={alpha} >Sort Alphabetically</button>
                <button onClick={recent} >Sort by recent</button>
            </div>
            <div className ='layout'>
                {VGames.map(VGames => (
                    <section key ={VGames.vg_id}>
                        <img src={`${VGames.picturelink}`} alt=""></img>
                        <h4>{VGames.name}</h4>
                        <button onClick = {event => execute(event, `${VGames.vg_id}`)}>Launch Game</button>
                        <Edit VGames = {VGames}/>
                    </section>
                ))}
            </div>
        </>
    );
};

export default Layout;