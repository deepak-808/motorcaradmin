import React, { useState } from 'react';
import Input from '../../Layout/input/Input';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';

const AddEditCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    carImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
      let form = e.target;
      let formData = new FormData(form);
      let formObj = Object.fromEntries(formData.entries())
      console.log('formObj', formObj)
      // const response = await fetch("http://3.106.253.55/v1/admin/car/Addcar");

    try {
      const response = await axios.post('http://3.106.253.55/v1/admin/car/Addcar', formData);
      console.log('API Response:', response.data);
      // Handle the API response as needed
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper sx={{ width: '100%', p: 2 }}>
        <Typography variant="h5" mb={2}>
          Add/Edit Car Details
        </Typography>
        <form onSubmit={submitHandler}>
          <Input
            title="Car Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            title="Car Image"
            type="file"
            name="carImage"
            onChange={handleChange}
            accept="image/*"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEditCar;
