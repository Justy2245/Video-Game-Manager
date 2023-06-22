const express = require('express');
const cors = require('cors');
const pool = require('./database.js')
const app = express();

//using cors to let frontend request to backend
//localhost:5000 for database access
//localhost:3000 for react app
app.use(cors());
app.use(express.json());

//Routes

//add new video game
app.post('/videogames', async(req, res) => {
    try {
        const { name, pathlink, picturelink } = req.body;
        
        const newVGame = await pool.query (
            'INSERT INTO videogames (name, pathlink, picturelink) VALUES($1, $2, $3) RETURNING *', [name, pathlink, picturelink]
        );
        res.json(newVGame.rows[0]);
        console.log(name);
    } catch (error) {
        console.error(error.message);
    }
});

//get all video games in alphabet order
app.get('/videogames/alpha', async(req, res) => {
    try {
        const getVGames = await pool.query('SELECT * FROM videogames ORDER BY name');
        res.json(getVGames.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get all video games in recent order
app.get('/videogames/recent', async(req, res) => {
    try {
        const getVGames = await pool.query('SELECT * FROM videogames ORDER BY time_used DESC');
        res.json(getVGames.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//launching video game via pathlink
app.get('/videogames/launch/:vg_id', async(req, res) => {
    try {
        const { execFile } = require('child_process');
        const { vg_id } = req.params;
        const getVGame = await pool.query(`SELECT * FROM videogames WHERE vg_id = ${vg_id}`);
        
        //getting date and formatting for database
        //data used for sorting by recently opened
        const months = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', 
                        May: '05', Jun: '06', Jul: '07', Aug: '08',
                        Sep: '09', Oct: '10', Nov: '11', Dec: '12'};
        var startdate = new Date();
        startdate = String(startdate);
        //split string into components
        var [dWeek, month, day, year, time] = startdate.split(' ');
        month = months[month];
        //change data into proper format 'yyy-mm-dd 00:00:00'
        var final = year + '-' + month + '-' + day + ' ' + time;
        console.log(final);

        //update time_used value
        const setTime = await pool.query(`UPDATE videogames SET time_used = '${final}' WHERE vg_id = ${vg_id}`);

        //execute file
        const child = execFile(getVGame.rows[0].pathlink, (error) => {
            console.log(error);
        });

        res.json('Successfully launched');
    } catch (error) {
        console.error(error.message);
    }
});

//editing video game
app.put('/videogames/:vg_id', async(req, res) => {
    try {
        const { vg_id } = req.params;
        const { name, pathlink, picturelink } = req.body;
        const updateVGames = await pool.query(
            'UPDATE videogames SET name = $1, pathlink = $2, picturelink = $3 WHERE vg_id = $4',
            [name, pathlink, picturelink, vg_id]
        );
        res.json('Updated Video Game');
    } catch (error) {
        console.error(error.message);
    }
});

//delete video game
app.delete('/videogames/:vg_id', async(req, res) => {
    try {
        const { vg_id } = req.params;
        const deleteVGames = await pool.query(
            'DELETE FROM videogames WHERE vg_id = $1',
            [vg_id]
        );
        res.json('Deleted Video Game');
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(4000);