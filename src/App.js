import React from 'react';
import './App.css';
import Home from './views/Home';
import BoardDetails from './views/BoardDetails';
import ninjaLogo from './styles/assets/ninja.jpeg';
import { BrowserRouter , Switch, Route, Link } from "react-router-dom";


const Top = () => {
return <div className='top'>
  <Link to="/"><img alt="Dev ninja" src={ninjaLogo}/></Link>
</div>
}

const App = (props)  => {


  return (
        <BrowserRouter>
        <Top/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={BoardDetails} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
