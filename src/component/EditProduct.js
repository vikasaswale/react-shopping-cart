import React, { useEffect, useState } from 'react'
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams  } from "react-router-dom";
import Loader from './Loader';

function EditProduct({
  notifySuccess,
  notifyWarning,
  notifyError
}) {

    const { id } = useParams();

  const initialState = {
    name: '',
    price: '',
    images: ''
  }

  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const [isLoading, setisLoading] = useState(true);


  const handleChange = (e) => {
    // console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {

    e.preventDefault();
    // console.log(data);

    axios.put(`/api/shop/editproduct/${id}`, data)
      .then(result => {
        console.log(result)
        if (result.data.statusCode === 200) {
          notifySuccess('Product Edited Successfully');
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
            notifyError('Product Not Found');
        }
      })
      .catch(e => {
        // console.log("dfdfdf", e.message)
        notifyError(e.message);
      })
  }

  const getSingleProduct = () => {
    axios.get(`/api/shop/singleproduct/${id}`)
      .then(result => {
        if (result.data.statusCode === 200) {
        // console.log(result.data.listproducts)
        setData(result.data.listproducts[0]);
        setisLoading(false);
        }
        else{
            navigate('/')
            notifyError('Product Not Found');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(()=>{
    getSingleProduct();
  }, [])

  return (
    <>
      <Container style={{ paddingTop: '100px' }}>
        <form style={{ textAlign: 'center' }}>
          <TextField
            style={{ width: '90%', margin: "5px" }}
            type="text"
            label="Name"
            value={data.name}
            name='name'
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: "90%", margin: "5px" }}
            type="text"
            label="Price"
            value={data.price}
            name='price'
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: "90%", margin: "5px" }}
            type="text"
            label="Images"
            value={data.images}
            name='images'
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <Button variant="contained" color="primary" onClick={handleClick}>
            save
          </Button>

        </form>
      </Container>
      <Loader isLoading={isLoading} />
    </>
  )
}

export default EditProduct