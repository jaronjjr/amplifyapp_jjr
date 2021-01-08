import React, { Component } from "react";
import "../../App.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Typography, TextField, Button, Paper, Grid,FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import {createTodo as createTodoMutation} from "../../graphql/mutations";
import { API } from "aws-amplify";
import { getTodo } from "../../graphql/queries";
import { updateTodo } from "../../graphql/mutations";
import { find } from "lodash";
import validator from "../../service/validator";
const styles = (theme) => ({
  root: {
    flexGrow: 1,

    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  table: {
    minWidth: 700,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },

  right: {
    marginLeft: "20",
  },
  textField: {
    width: "12%",
    textAlign: "left",
    font: "normal normal normal 16px Karla",
    letterSpacing: "0px",
    color: "#2B3D51",
    opacity: 1,
    height: "25px",
  },
  paperStyle: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: "3%",
    borderRadius: "10px",
    backgroundColor: "#fdfdfd",
    marginTop: theme.spacing(4),
  },
  arrowIcon: {
    color: "#9e9e9e",
  },
  titleTypography: {
    fontFamily: "Alegreya",
    fontSize: "22px",
    fontStyle: "bold",
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  headingTypography: {
    opacity: "0.8",
    fontFamily: "Alegreya",
    fontSize: "18px",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
    },
  },
  buttonGrid: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  styledButton: {
    border: "1px solid",
    width: "8vw",
    color: "#0B9DBC",
    padding: "10px",

    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      width: "30vw",
    },
  },
  styledClearButton: {
    backgroundColor: "#0B9DBC",
    color: "white",
    padding: "10px",
    width: "8vw",

    marginLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: "#0B9DBC",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
    },
  },
  titleGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      padding: "3%",
    },
  },
  styledTextField: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  ErrorText:{
    color:"red",
    marginLeft:theme.spacing(1.2),
  }
});

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        company: "",
        product_name: ""
      },
      errors: {
        company: "",
        product_name: ""
      },
      rules: {
        company: {
          required: true,
        },
        product_name: {
          required: true,
        },
      }
     
    };
  }

  
  componentDidMount() {
    console.log("$$$$$");
    this.getTodoById();
    
  }

  getTodoById = async () => {
    if (this.props.match.params.id) {
      const apiData = await API.graphql({
        query: getTodo,
        variables: { id: this.props.match.params.id },
      });
console.log("data:",apiData);
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          company: apiData.data.getTodo.company,
          product_name: apiData.data.getTodo.product_name
        },
      });
    }
  };

  validate = (rules, data) => {
    const errors = validator(rules)(data);
    const hasErrors = find(errors, (error) => error !== "");
    this.setState({
      ...this.state,
      errors,
    });
    return !hasErrors;
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };
  onClickArrowButton = () => {
    this.props.navigateTo("/");
  };

  handleClear = () => {
    const tempdata = {
      company: "",
      product_name: "",
    };
    this.setState({ data: tempdata }, () => {});
  };

  handleSubmit = async (input) => {
    const  {rules,data} = this.state;
    if (this.validate(rules, data)) {
      if (this.props.match.params.id) {
        const passData = this.state.data;
        passData.id = this.props.match.params.id;

        const data = await API.graphql({
          query: updateTodo,
          variables: { input: this.state.data }
          
        });

        alert("Product Edited succefully!");
        this.props.navigateTo("/list");
      } else {
        const data = await API.graphql({
          query: createTodoMutation,
          variables: { input: this.state.data },
        });
        console.log("input:", this.state.data);
        alert("Product added succefully!");
        this.props.navigateTo("/list");
      }
    }
  };



  render() {
    const { classes } = this.props;
    const { data,errors } = this.state;
    return (
      <div>
        <Paper elevation={6} className={classes.paperStyle}>
          <Grid
            container
            spacing={3}
            direction="row"
            className={classes.titleGrid}
          >
            <ArrowBackIcon
              className={classes.arrowIcon}
              onClick={this.onClickArrowButton}
            />
            <Typography className={classes.titleTypography}>
              {this.props.match.params.id ? "Edit Details" : "Add Details"}
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.headingTypography}>
                Company Name
              </Typography>
              <TextField
                fullWidth
                type="text"
                name="company"
                value={data.company}
                errors={errors.company ? true : false}
                className={classes.styledTextField}
                onChange={this.handleChange}
                id="outlined-margin-dense"
                margin="dense"
                variant="outlined"
              />
                 {errors.company ? (
                  <FormHelperText className={classes.ErrorText}>
                    {errors.company}
                  </FormHelperText>
                ) : (
                  ""
                )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.headingTypography}>
                Product Name
              </Typography>
              <TextField
                fullWidth
                type="text"
                name="product_name"
                value={data.product_name}
                errors={errors.product_name ? true : false}
                className={classes.styledTextField}
                onChange={this.handleChange}
                id="outlined-margin-dense"
                margin="dense"
                variant="outlined"
              />
                 {errors.product_name ? (
                  <FormHelperText className={classes.ErrorText}>
                    {errors.product_name}
                  </FormHelperText>
                ) : (
                  ""
                )}
            </Grid>
          </Grid>
          <Grid container spacing={5} className={classes.buttonGrid}>
            <Grid item xs={12} md={6} direction="row">
              <Button 
              className={classes.styledButton}
              onClick={this.handleSubmit}>
                 {this.props.match.params.id ? "Edit" : "Add"}
                {/* Add */}
                </Button>
              <Button
                className={classes.styledClearButton}
                onClick={this.handleClear}
              >
                clear
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: (url) => dispatch(push(url)),
  };
}

const StyledHomePage = withStyles(styles)(HomePage);
export default connect(null, mapDispatchToProps)(StyledHomePage);