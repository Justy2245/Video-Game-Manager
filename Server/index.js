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

//get all video games
app.get('/videogames', async(req, res) => {
    try {
        const getVGames = await pool.query('SELECT * FROM videogames ORDER BY name');
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
        console.log(getVGame.rows[0].pathlink);
        const child = execFile(getVGame.rows[0].pathlink, (error) => {
            console.log(error);
        });
        res.send('Successfully launched');
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

app.listen(4000);