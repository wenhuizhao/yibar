import React from 'react'
import './App.css'
import AppRouter from './component/RouterComponent'
import Container from '@material-ui/core/Container'

function App() {
  return (
    <div>
      <Container style={style}>
        <AppRouter/>
      </Container>
    </div>
  );
}

const style= {
  padding: 0
}
// const containerStyle = {
//   flex: 1
// }
export default App;
