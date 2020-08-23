import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './routes'

export default function Navigation() {
    return (
        <Router>
            <Switch>
                {routes.map((route, idx) => (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <route.layout>
                                <route.component {...props} />
                            </route.layout>
                        )}
                    />
                ))}
            </Switch>
        </Router>
    )
}
