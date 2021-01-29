import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CurrencySelect from "./currencySelect";
import { investmentsAPI } from "../../axios";
import { makeStyles } from "@material-ui/styles";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formText: {
    color: theme.palette.text.primary,
  },
}));

export default function FormDialog({ campaignId, multiple, campaignName }) {
  const classes = useStyles();

  //STATES

  const [open, setOpen] = useState(false);

  const [inputs, setInputs] = useState({
    campaign_id: campaignId,
    user_name: "",
    investment_amount: "",
    currency: "",
  });

  const [investmentStatus, setInvestmentStatus] = useState({
    isInvalid: false,
    isSuccessful: false,
    errorMessage: "",
  });

  //HANDLERS
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvalid = () => {
    setInvestmentStatus({
      ...investmentStatus,
      isInvalid: false,
    });
  };

  const handleInvest = (e) => {
    e.preventDefault();
    console.log(inputs);
    investmentsAPI
      .post("", inputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setInvestmentStatus({
          ...investmentStatus,
          isInvalid: true,
          errorMessage: error.response.data.message,
        });
      });
  };

  //RETURN

  return (
    <div>
      <Snackbar
        open={investmentStatus.isInvalid}
        autoHideDuration={6000}
        onClose={handleInvalid}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleInvalid} severity="error">
          {investmentStatus.errorMessage}
        </Alert>
      </Snackbar>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Invest
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Invest in {campaignName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.formText}>
            For this campaign you need to invest a multiple of £{multiple}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="user_name"
            label="Name"
            type="text"
            fullWidth
            color="primary"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="investment_amount"
            name="investment_amount"
            label="Investment amount"
            type="number"
            fullWidth
            onChange={handleChange}
            color="inherit"
          />
          <CurrencySelect onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className={classes.formText}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleInvest} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
