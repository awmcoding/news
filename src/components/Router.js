import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from "../App";
import SingleNews from "./SingleNews";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} exact />
            <Route path="/news/:id" component={SingleNews} />
        </Switch>
    </BrowserRouter>
)

export default Router;