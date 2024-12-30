// App.jsx
import { Container } from '@mui/material';
import './App.css';
import { MainComponent } from './Components/MainComponent';

function App() {
  return (
    <>
      
        {/* Remove maxWidth to allow full-width layout */}
        {/* <div style={{display:"flex",justifyContent:"center"}}> */}
        <Container maxWidth={false} >

          <MainComponent />
        
        </Container>
        {/* </div> */}
     
    </>
  );
}

export default App;
