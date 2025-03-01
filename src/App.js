import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Request from './components/Request';
import NewRequest from './components/Request/NewRequest';
import Chat from './components/Chat';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/requests/new" component={NewRequest} />
                <Route path="/requests/:id" component={Request} />
                <Route path="/chats/:requestId" component={Chat} />
            </Switch>
        </Router>
    );
};

export default App;