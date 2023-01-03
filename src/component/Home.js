import Cards from './Cards';

import { Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";
function Home({
  notifySuccess,
  notifyWarning
}) {

  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const navigate = useNavigate();

  const getproductlist = () => {
    axios.get("/api/shop/productlist")
      .then(result => {
        setProducts(result.data.listproducts);
        setisLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getCartList = () => {
    axios.get("/api/shop/CartList")
      .then((res) => {
        setCartItems(res.data.listproducts || [])
      })
  }

  useEffect(() => {
    getproductlist();
    getCartList();
  }, [])

  const handleClick = (id) => {
    const data = {
      Id: id
    }

    if (!isFound(id)) {
      axios.post("/api/shop/addproduct", data)
        .then(result => {
          if (result.data.statusCode === 200) {
            notifySuccess('Product Added in cart');
          } else {
            notifyWarning('Product Not Added in cart');
          }

        })

      setCartItems([
        ...cartItems,
        data
      ])

    } else {
      notifyWarning('Product Already in Cart');
    }
  }

  const handleDelete = (id) => {

    if (!isNaN(id)) {
      setisLoading(true);
      axios.delete(`/api/shop/deleteproduct/${id}`)
        .then(result => {
          if (result.data.statusCode === 200) {
            getproductlist();
            setisLoading(false);
            notifySuccess('Product Deleted Successfully');
          } else {
            notifyWarning('Product Not Deleted');
          }
        })
    } else {
      notifyWarning('Something went wrong');
    }
  }

  const handleEdit = (id) => {
    if (!isNaN(id)) {
      navigate(`/edit/${id}`);
    } else {
      navigate(`/`);
    }
  }

  const isFound = id => {
    return cartItems && cartItems.length !== 0 && cartItems.some(element => {
      if (element.id === id || element.Id === id) {
        return true;
      }

      return false;
    });
  };

  // console.log("cartItems",cartItems)

  return (
    <>
      <Container style={{ paddingTop: '100px' }}>
        <Grid container spacing={3}>
          {
            products && products.map((data, index) => {
              return <Cards handleClick={handleClick} handleDelete={handleDelete} handleEdit= {handleEdit} textValue='Cart' isHome={true} data={data} key={index} />
            })
          }
        </Grid>
      </Container>
      <Loader isLoading={isLoading} />
    </>
  );
}

export default Home;
