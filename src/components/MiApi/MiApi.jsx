import {Button,Form,Row,Col,Alert,} from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ListadoBebidas from '../listadoBebidas/ListadoBebidas'

const MiApi = () => {

    const [categorias, setCategorias] = useState([])
    const [filtro,setFiltro] = useState("")
    const [bebidas,setBebidas] = useState ([])
    const [alerta,setAlerta] = useState("")
    const [busqueda, setBusqueda] = useState({
        nombre: "",
        categoria: ""
    })

// consumiendo la API de categoria 
    const getData = async () => {
      try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
  
        const {data} = await axios (url)
  
        setCategorias(data.drinks)
        
      } catch (error) {
        console.log(error)
        
      }
    }
// consumiendo la API de bebidas 
    const dataBebida = async datos => {
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

        const {data} = await axios(url)
        setBebidas(data.drinks)
  
        
      } catch (error) {
        console.log(error)
        
      }
    }
// usando el efect para renderizar solo una vez 
    useEffect (() => {
      getData()
  
    }, [])

// agregando el evento al boton 

    const handleSubmit = e => {
        e.preventDefault()

        if(Object.values(busqueda).includes("")){
            setAlerta('todos los campos son obligatorios')
            return

        }
        setAlerta('')
        dataBebida(busqueda)

    }

    const buscarBebida = (e) => {
        setFiltro(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (terminoDeBusqueda) => {
        const resultadosBusqueda = bebidas.filter((elemento) => {
            if(elemento.strDrink.toString().toLowerCase().includes(terminoDeBusqueda.toLowerCase())){
                return elemento

            }
        })
        setBebidas(resultadosBusqueda)
    }
  




  return (
    <>
    <Form
    onSubmit={handleSubmit}
    >
        {alerta && <Alert variant='danger' className='text-center'>  {alerta}</Alert>}
        <Row>
            <Col md={6}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='nombre'>Nombre bebida</Form.Label>

                    <Form.Control
                    id='nombre'
                    type='text'
                    placeholder='Ej: tequila, Vodka,Etc'
                    name='nombre'
                    value={busqueda.nombre}
                    onChange={e => setBusqueda({
                        ...busqueda,
                        [e.target.name] : e.target.value
                    })}
                    />

                </Form.Group>

                <Button
                variant='danger'
                type='submit'
                className='text-uppercase w-100'
                >
                    buscar bebida
                    
                </Button>
            </Col>
            <Col md={6}>
            <   Form.Group className='mb-3'>
                    <Form.Label htmlFor='categoria'>Categoria Bebida</Form.Label>

                    <Form.Select
                    id='categoria'
                    name='categoria'
                    value={busqueda.categoria}
                    onChange={e => setBusqueda({
                        ...busqueda,
                        [e.target.name] : e.target.value
                    })}
                    
                    >
                        <option>- Selecciona Categoria -</option>
                        {categorias.map( categoria => (
                            <option
                            key={categoria.strCategory}
                            value={categoria.strCategory}
                            >
                                {categoria.strCategory}
                            </option>
                        ))}

                       
                        

                    </Form.Select>

                </Form.Group>
            </Col>

        </Row>
    </Form>

    <Form>
        <Row>
            
            <Col md={12}>
                <Form.Group className='mb-3 mt-3'>
                    <Form.Label htmlFor='nombre'>Filtrar bebida por el titulo</Form.Label>
                    <Form.Control
                        id='name'
                        type='text'
                        placeholder='Nombre de la bebida'
                        name='nombre'
                        value={filtro}
                        onChange={buscarBebida}
                        />


                </Form.Group>
                
  
            </Col>
        </Row>

        <Row className='mt-5'>
            {bebidas.map ( bebida => (
                <ListadoBebidas
                    key={bebida.idDrink}
                    trago = {bebida}
                
                />

            )) }
        </Row>

    </Form>

        

    
    </>
    
  )
}

export default MiApi