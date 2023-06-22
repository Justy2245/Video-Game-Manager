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
app.get('/videogames', async(req, res) => {
    try {
        const getVGames = await pool.query('SELECT * FROM videogames');
        res.json(getVGames.rows);
    } catch (error) {
        console.error(error.message);
    }
});
app.put('/videogames/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        /*const updateVGames = await pool.query(
            'UPDATE videogames SET '
        )*/
        console.log(id);
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(4000);