import {Container} from 'react-bootstrap'
import MiApi from './components/MiApi/MiApi'
import ListadoBebidas from './components/listadoBebidas/ListadoBebidas'






const App = () => {
 
  





  return (

    <>
      <header className="py-5"> 
      <h1> buscador de bebidas</h1>
      </header>

      <Container className='mt-5'>
        <MiApi />
        
      </Container>
      

    </>

  )
}

export default App