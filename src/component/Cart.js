import { useEffect, useState } from 'react';
import Cards from './Cards';
import { Grid, Container } from '@mui/material';
import axios from 'axios';
import Loader from './Loader';

function Cart({
  notifySuccess
}) {

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const handleClick = (id) => {
    setisLoading(true);
    axios.delete(`/api/shop/removeproduct/${id}`)
      .then(() => {
        getCartList();
        setisLoading(false);
        notifySuccess('Item deleted Successfully');
      })
  }

  const getCartList = () => {
    axios.get("/api/shop/CartList")
      .then((res) => {
        setCartItems(res.data.listproducts);
        setisLoading(false);
      })
  }

  useEffect(() => {
    getCartList();
  }, [])

  // console.log(cartItems)

  return (
    <>

      <Container style={{ paddingTop: '100px' }}>
        <Grid container spacing={3}>
          {
            cartItems && cartItems.map((data, index) => {
              return <Cards textValue='Remove from Cart' data={data} key={index} handleClick={handleClick} />
            })
          }
        </Grid>
      </Container>
      <Loader isLoading={isLoading} />
    </>
  );
}

export default Cart;
