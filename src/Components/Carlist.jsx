import React, { useState, useEffect } from 'react';
import  { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from '@mui/material';
import Addcar from './AddCar';
import EditCar from './EditCar';


export default function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
  }

  const deleteCar = (link) => {
    if (window.confirm('Are you sure you want to delete?')) 
    fetch(link, {method: 'DELETE'})
    .then(res => fetchdata())
    .catch(err => console.error(err))
  }

  const saveCar = (car) => {
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(res => fetchdata())
    .catch(err => console.error(err))
  }

  const updatecar = (car, link) => {
    fetch(link, {
      method: "PUT", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(res => fetchdata())
    .catch(err => console.error(err))
  }

  const columns = [
    { headerName: "Brand", field: "brand", filter: true},
    { headerName: "Model", field: "model", filter: true},
    { headerName: "Color", field: "color", filter: true},
    { headerName: "Fuel", field: "fuel", filter: true},
    { headerName: "ModelYear", field: "modelYear", filter: true},
    { headerName: "Price", field: "price", filter: true},
    { headerName: "", filterable: false, sortable: false, width: 150, cellRenderer: row => <EditCar updatecar={updatecar} rowData={row.data} saveCar={saveCar}/>},
    { headerName: "", field: "_links.self.href", filter: false, sortable: false, width: 150,
      cellRenderer: row => <Button color='warning' onClick={() => deleteCar(row.value)}>Delete</Button>}
  ];

  return (
    <div className='ag-theme-alpine' style={{height: '800px', width: '100%'}}>
      <Addcar saveCar={saveCar}/>
      <AgGridReact rowData={cars} columnDefs={columns}/>
    </div>
  );
}