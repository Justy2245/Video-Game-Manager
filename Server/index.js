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
        
        /*const newVGame = await pool.query (
            'INSERT INTO videogames (name, pathlink, picturelink) VALUES($1, $2, $3) RETURNING *', [name, pathlink, picturelink]
        );
        res.json(newVGame.rows[0]);*/
        console.log(pathlink);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(4000);