import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Bar from "../appBar";

const styles = (theme) => ({
  content: {
    flexGrow: 1,

    padding: "4%",
  },
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Bar />
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);