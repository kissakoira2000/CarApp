import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "@mui/material";

export default function EditCar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});

    const handleClickOpen = () => {
        setCar({brand: props.rowData.brand, model: props.rowData.model, color: props.rowData.color, fuel: props.rowData.fuel, year: props.rowData.modelYear, price: props.rowData.price});
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleInputChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value})
    }

    const updatecar = () => {
      props.updatecar(car, props.rowData._links.self.href);
      handleClose();
    }

  return (
    <div>
    <Button onClick={handleClickOpen}>
      Edit
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="brand"
          value={car.brand}
          onChange={e => handleInputChange(e)}  
          label="Brand"
          fullWidth
        />
         <TextField
          margin="dense"
          name="model"
          value={car.model}
          onChange={e => handleInputChange(e)}  
          label="Model"
          fullWidth
        />
          <TextField
          margin="dense"
          name="color"
          value={car.color}
          onChange={e => handleInputChange(e)}  
          label="Color"
          fullWidth
        />
          <TextField
          margin="dense"
          name="fuel"
          value={car.fuel}
          onChange={e => handleInputChange(e)}  
          label="Fuel"
          fullWidth
        />
         <TextField
          margin="dense"
          name="modelYear"
          value={car.modelyear}
          onChange={e => handleInputChange(e)}  
          label="ModelYear"
          fullWidth
        />
          <TextField
          margin="dense"
          name="price"
          value={car.price}
          onChange={e => handleInputChange(e)}  
          label="Price"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={updatecar}>Save</Button>
      </DialogActions>
    </Dialog>
    </div>
);

}