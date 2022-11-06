import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('SET_ACTIVE_MOVIE', setActiveMovie);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('CREATE_NEW_MOVIE', createNewMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}

function* setActiveMovie(action) {

    try {
        const activeMovie = yield axios.get(`/api/movie/${action.payload}`);
        console.log('get active movie', activeMovie.data);
        yield put({ type: 'SET_ACTIVE_MOVIE', payload: activeMovie.data });
        console.log('Finally Active', activeMovie.data);
    } catch {
        console.log('setActiveMovie failed');
    }

}

function* fetchGenres(action){
    console.log('😀')
    try {
        const activeMovieGenres = yield axios.get(`/api/genre/${action.payload}`);
        console.log('get active movie genre', activeMovieGenres.data);
        yield put({ type: 'SET_GENRES', payload: activeMovieGenres.data });
        console.log('Active Genres', activeMovieGenres.data);
    } catch {
        console.log('setActiveMovie failed');
    }

}

/// POST NEW MOVIE INFO TO DATABASE AND ADD NEW MOVIE TO REDUX STORE
function* createNewMovie(action){
    console.log('👨‍👩‍👧')
    try {
        yield axios.post('/api/movie', {data: action.payload})
        console.log('add new movie', action.payload);
        yield put({type: 'CREATE_NEW_MOVIE', payload: action.payload})
    }catch {
        console.log('POST new movie failed')
    }

}






// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        case 'CREATE_NEW_MOVIE':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const activeMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_MOVIE':
            return action.payload
        default:
            return state;
    }
}


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        activeMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
