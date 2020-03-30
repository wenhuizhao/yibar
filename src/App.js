import React from 'react'
import './App.css'
import AppRouter from './component/RouterComponent'
import NavBar from './component/NavBar'
import Container from '@material-ui/core/Container'

function App() {
  return (
    <div style={style}>
      <NavBar/>
      <Container style={containerStyle}>
        <AppRouter/>
      </Container>
    </div>
  );
}

const style= {
  display: "flex",
  'flexDirection': "column",
  //'minHeight': "100vh",  
}
const containerStyle = {
  flex: 1
}
export default App;
