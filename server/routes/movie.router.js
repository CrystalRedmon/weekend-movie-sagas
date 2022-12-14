const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
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

  const movieID = req.params;
  // GET INFO FOR DETAILS VIEW
  const detailsQuery = `SELECT "title", "poster", "description"
                        FROM "movies"
                        WHERE "id" = $1;`

  // USED NUMBER TO CONVERT FROM STRING TO INT
  const sqlParams = [Number(movieID.id)]
  pool.query(detailsQuery, sqlParams)
    .then(dbRes => {
      res.send(dbRes.rows[0]);
      console.log('DB GET details successful: ', dbRes.rows[0]);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('DB GET details failed: ', error);
    })


})

router.post('/', (req, res) => {

  console.log(req.body);
  const newMovie = (req.body.data)
  // USED NUMBER TO CONVERT FROM STRING TO INT
  const genreID = Number(newMovie.genre);

  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [newMovie.title, newMovie.poster, newMovie.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);`;

      const sqlParams = [
        createdMovieId,
        genreID
      ]

      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, sqlParams).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;