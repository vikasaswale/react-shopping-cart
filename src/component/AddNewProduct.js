import React, { useState } from 'react'
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddNewProduct({
  notifySuccess,
  notifyWarning,
  notifyError
}) {

  const initialState = {
    name: '',
    price: '',
    images: ''
  }

  const navigate = useNavigate();

  const [data, setData] = useState(initialState);

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

    axios.post("/api/shop/addnewproduct", data)
      .then(result => {
        if (result.data.statusCode === 200) {
          notifySuccess('Product Added Successfully');
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          notifyWarning('Product Not Added');
        }
      })
      .catch(e => {
        // console.log("dfdfdf", e.message)
        notifyError(e.message);
      })

    setData(initialState);
  }

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

    </>
  )
}

export default AddNewProduct