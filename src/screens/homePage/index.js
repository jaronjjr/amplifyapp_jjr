import React, { Component } from 'react';
// import logo from './logo.svg';
import '../../App.css';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import { listNotes } from './graphql/queries';
// import { createNote as createNoteMutation, deleteNote as deleteNoteMutation , updateNote as updateNoteMutation} from './graphql/mutations';
// import { API, Storage } from 'aws-amplify';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    table: {
      minWidth: 700,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    right:{
      marginLeft:"20"
  
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
  
  }));
  const initialFormState = { name: '', description: '' }
  
  export class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:{
            company:"",
            product_name:"",
            description:""
            }
        }
    }

    handleChange = (event) => {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            [event.target.name]: event.target.value,
          },
       
        });
        console.log(this.state.data)
      };

render (){

    const{classes}=this.props;
    const {data}=this.state
    return (
      <div className="App">
       
        <form>
                <div className={classes.root}>
                <TextField
                  fullWidth
                  type="text"
                  name="company"
                  value={data.company}
                //   errors={errors.employeeId ? true : false}
                  onChange={this.handleChange}
                  id="outlined-margin-dense"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  type="text"
                  name="product_name"
                  value={data.product_name}
                //   errors={errors.employeeId ? true : false}
                  onChange={this.handleChange}
                  id="outlined-margin-dense"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  type="text"
                  name="description"
                  value={data.description}
                //   errors={errors.employeeId ? true : false}
                  onChange={this.handleChange}
                  id="outlined-margin-dense"
                  margin="dense"
                  variant="outlined"
                />
                {/* <TextField
                  label="Note"
                  id="outlined-size-small"
                  
                  variant="outlined"
                  size="small"
                  value={formData.name}  
                  onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                  />
                  <TextField
                  label="Description"
                  id="outlined-size-small"
                  
                  variant="outlined"
                  size="small"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                  /> */}
                  
                  <Button variant="contained" color="primary">Add Note</Button>
  
                </div>
          </form>
  
        <div style={{marginBottom: 20}}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
              <StyledTableCell>Note</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              
              <StyledTableCell align="left">Delete</StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
          {/* {notes.map(note => (
            <StyledTableRow key={note.id || note.name}>
              <StyledTableCell component="th" scope="row">{note.name}</StyledTableCell>
              <StyledTableCell align="left">{note.description}</StyledTableCell>
              
              <StyledTableCell align="left">
              <DeleteIcon onClick={() => deleteNote(note)}>Delete note</DeleteIcon>
              </StyledTableCell>
            </StyledTableRow>
         
             
            ))
          } */}
          </TableBody>
          </Table>
          </TableContainer>
        </div>
       
        {/* <AmplifySignOut /> */}
      </div>
    );
  }
}
export default HomePage