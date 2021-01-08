import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {  AmplifySignOut } from '@aws-amplify/ui-react'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "",
    flexGrow: 1,
  },
});
class Bar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "#0B9DBC" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              PluginHive
            </Typography>
            <AmplifySignOut />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(Bar);