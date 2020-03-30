import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from "react"
import HomeComponent from "./HomeComponent"
import GraphComponent from "./GraphComponent"
import MorgageComponent from './MorgageComponent'

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={HomeComponent} />
                        <Route path="/morgage" component={MorgageComponent} />
                        <Route path="/graph" component={GraphComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    //marginTop:'20px'
    flex:1
}

export default AppRouter;