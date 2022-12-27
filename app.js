import express from 'express'
import axios from 'axios'
import { APIkey } from './secrets.js'

const PORT = 9898

const app = express()

app.set('view engine', 'ejs')

app.use((req, _, next) => {
    // console.log('new request:', req.method, req.url)
    next()
})

app.use(express.static('assets'))

app.get('/movie/:id', (req, res) => {
    const id = req.params.id
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}&language=en-US`)
        .then(response => {
            res.render('movie', { movie: response.data })
        })
})
app.get('/', (_, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en-US&page=1`)
        .then(response => {
            res.render('moviesHome', { movies: response.data.results })
        })
})

app.listen(PORT, () => console.log('Port', PORT))