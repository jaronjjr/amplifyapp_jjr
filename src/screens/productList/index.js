import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { listTodos } from "../../graphql/queries";
import { API } from "aws-amplify";
import { deleteTodo as deleteTodoMutation } from "../../graphql/mutations";
import { getTodo } from "../../graphql/queries";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f8f8f8",
    color: "black",
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: "Alegreya",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const styles = (theme) => ({
  root: {
    flexGrow: 1,

    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  table: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {},
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
  buttonGrid: {
    marginTop: theme.spacing(10),
    float: "right",
  },
  styledIcon: {
    color: "#0B9DBC",
  },
});
export class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount(){
    this.handleListAllDeatils();
  }

  handleListAllDeatils= async () => {
    try {
      const apiData = await API.graphql({ query: listTodos });

      this.setState({
        ...this.state,
        notes: apiData.data.listTodos.items

      });
      console.log(apiData);
    } catch (error) {
      console.log("Error!");
    }
  };

  handleDelete = async ({ id }) => {
    const newNotesArray = this.state.notes.filter((list) => list.id !== id);
    this.setState({
      ...this.state,
      notes: newNotesArray,
    });

    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
    console.log("notes",id);
    alert("Product deleted successfully");
  };

  onClickAdd = () => {
    this.props.navigateTo("/details");
  };
  onClickEdit = (id) => {
    this.props.navigateTo(`/details/edit/${id}/`);
  };

  render() {
    const { classes } = this.props;
    const {notes}=this.state;
    return (
      <div>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>sl no</StyledTableCell>
                <StyledTableCell align="left">Company Name</StyledTableCell>
                <StyledTableCell align="left">Product Name</StyledTableCell>
                <StyledTableCell align="left">Edit</StyledTableCell>
                <StyledTableCell align="left">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, idx) => (
                <StyledTableRow key={note.id || note.name}>
                  <StyledTableCell component="th" scope="row">
                    {idx + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {note.company}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {note.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <EditIcon className={classes.styledIcon}
                    onClick= {()=>this.onClickEdit(note.id)}/>
                      {/* Delete note
                    </EditIcon> */}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <DeleteIcon className={classes.styledIcon}
                    onClick={()=>this.handleDelete(note)}/>
                      {/* Delete note
                    </DeleteIcon> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button
            className={classes.styledClearButton}
            onClick={this.onClickAdd}
          >
            Add
          </Button>
        </Grid>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    navigateTo: (url) => dispatch(push(url)),
  };
}
const StyledProductList = withStyles(styles)(ProductList);
export default connect(null, mapDispatchToProps)(StyledProductList);
