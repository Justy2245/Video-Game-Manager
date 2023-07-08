import React, { useEffect, useState } from 'react';
import Input from './Input';
import Edit from './Edit-Delete';
var sorted = 'alpha';

const Layout = () => {

    const [VGames, setVGames] = useState([]);

    //get all of the video games stored in database in alphabetical order
    const getVGamesAlpha = async () => {
        try {
            const data = await fetch('http://localhost:4000/videogames/alpha');
            const json = await data.json();
            setVGames(json);
        } catch (error) {
            console.log(error.message);
        }
    };
    //get all of the video games stored in database ordered by recently used
    const getVGamesRecent = async () => {
        try {
            const data = await fetch('http://localhost:4000/videogames/recent');
            const json = await data.json();
            setVGames(json);
        } catch (error) {
            console.log(error.message);
        }
    };

    const searchGames = async (input) => {
        var searchValue;
        VGames.filter(value => value.name.toLowerCase() === input.toLowerCase()).map(filteredValue => (
           searchValue = filteredValue
        ));
        if(searchValue != null)
        {
            const data = await fetch(`http://localhost:4000/videogames/search/${searchValue.name}`);
            const json = await data.json();
            setVGames(json);
        }
        else {
            getVGamesAlpha();
        }
    };

    //launch exe file associated with video game
    const execute = async (event, vg_id) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/videogames/launch/${vg_id}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    //change to alpha to sort alphabetically on refresh
    const alpha = (event) => {
        localStorage.setItem('sorted', 'alpha');
        window.location = '/';
    };

    //change to recent to sort by recently launch on refresh
    const recent = (event) => {
        localStorage.setItem('sorted', 'recent');
        window.location = '/';
    };

    useEffect(() => {
        if(localStorage.getItem('sorted') === 'recent')
        {
            getVGamesRecent();
        }
        else {
            getVGamesAlpha();
        }
    }, []);

    return (
        <>  
            <div className = 'mainBody'>
                <div className ='header'>
                    <h1>Video Game Manager</h1>
                    <Input VGames/>
                    <button className = 'mt-2' onClick={alpha} >Sort Alphabetically</button>
                    <button onClick={recent} >Sort by recent</button>
                    <div className='text-center mt-3'>
                        <input label="search" className='w-40' onChange = {event => searchGames(event.target.value)}/>
                    </div>
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
            </div>
        </>
    );
};

export default Layout;