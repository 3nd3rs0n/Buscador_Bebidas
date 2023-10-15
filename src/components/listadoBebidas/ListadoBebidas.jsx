import {Col,Card,Button} from 'react-bootstrap'

const ListadoBebidas = ({trago}) => {
  return (
    <Col md={6} lg={3}>
      <Card className='mb-4'>
        <Card.Img
        variant='top'
        src={trago.strDrinkThumb}
        alt={`Imagen de ${trago.strDrink}`}
        
        />
        
      </Card>

      <Card.Body>
        <Card.Title> {trago.strDrink} </Card.Title>
        <Card.Text> ALGO MAS </Card.Text>
        <Button 
        variant={'warning'}
        className='w-100 text-uppercase mt-2'> 
          ver receta
        </Button>

      </Card.Body>

    
    </Col>
  )
}

export default ListadoBebidas