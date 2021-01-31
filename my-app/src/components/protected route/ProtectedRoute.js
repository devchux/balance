import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, user, error, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                if (user && !error) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: props.location
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute
