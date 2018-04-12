import React, { Component } from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import { Provider } from 'react-redux';
import {HashRouter,Route} from 'react-router-dom';
import store from './stores/store';

//add routing configuration

class App extends Component {
    state = {title: null};

    handleOnTitleChange = (e) => {
        this.setState({
            title: e
        });
    }
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                <HashRouter>
                    <div>
                        {/*<MovieHeader subTitle={this.state.title}/>*/}
                        {/*<Route exact path="/" render={()=><MovieList onTitleChange={this.handleOnTitleChange} />}/>*/}
                        {/*<Route path="/movielist" render={()=><MovieList onTitleChange={this.handleOnTitleChange} />}/>*/}
                        {/*<Route path="/movie" render={()=><Movie onTitleChange={this.handleOnTitleChange}/>}/>*/}
                        <MovieHeader />
                        <Route exact path="/" render={()=> <MovieList />}
                    </div>
                </HashRouter>
                </Provider>
            </div>
        );
    }
}

export default App;