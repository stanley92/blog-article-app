import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { ArticlesList, ArticlesInsert, ArticlesUpdate } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/articles/list" exact component={ArticlesList} />
                <Route path="/articles/create" exact component={ArticlesInsert} />
                <Route
                    path="/articles/update/:id"
                    exact
                    component={ArticlesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App;