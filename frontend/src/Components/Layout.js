import React, { useEffect, useState } from 'react';
import Input from './Input';

const Layout = () => {
    
    const [VGames, setVGames] = useState([]);

    const getVGames = async () => {
        try {
            const data = await fetch('http://localhost:4000/videogames');
            const json = await data.json();
            setVGames(json);
            console.log(VGames);
        } catch (error) {
            console.log(error.message)
        }
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
                    </section>
                ))}
            </div>
        </>
    );
};

export default Layout;