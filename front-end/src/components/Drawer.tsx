import React, { useState } from "react";
import { Drawer, IconButton, makeStyles, Theme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: "transparent",
  },
  icon: {
    color: "white",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  navlinks: {
    display: "flex",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.34)",
    boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.09)",
    borderRadius: "56px",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "12px",
    margin: theme.spacing(1),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid yellow",
      cursor: "pointer",
    },
  },
}));

const DrawerComponent = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor={"top"}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.navlinks}>
          <Link to="#" className={classes.link}>
            Home
          </Link>
          <Link to="#about" className={classes.link}>
            About us
          </Link>
          <Link to="#contact" className={classes.link}>
            Roadmap
          </Link>
          <Link to="#faq" className={classes.link}>
            FAQ
          </Link>
          <Link to="#faq" className={classes.link}>
            Team
          </Link>
        </div>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.icon}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};
export default DrawerComponent;
