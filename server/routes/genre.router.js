const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM genres ORDER BY "name" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});



router.get('/:id', (req, res) => {
  // Add query to get all genres
  const movieID = req.params;
  const sqlParams = [Number(movieID.id)];

  const sqlQuery = `SELECT json_agg(genres.name) AS genres_array
                    FROM "genres"
                    JOIN "movies_genres"
                      ON "genres".id = "movies_genres".genre_id
                    JOIN "movies"
                      ON "movies_genres".movie_id = "movies".id
                    WHERE "movies".id = $1;`;

  console.log('GENRES', sqlParams);
  pool.query(sqlQuery, sqlParams)
    .then(dbRes => {
      res.send(dbRes.rows[0].genres_array);
      console.log('Genre results: ', dbRes.rows[0].genres_array);
    })
    .catch(error => {
      res.sendStatus(500);
    })
});






module.exports = router;