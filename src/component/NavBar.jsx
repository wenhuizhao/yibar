import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { Tabs } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";
import HeaderBackground from "../images/HeaderBackground.png";
import { useHistory } from "react-router-dom";
import { default as useMediaQuery } from "@material-ui/core/useMediaQuery";

const style = {
  flexGrow: 1
};

const menus = [
  { label: "Home", page: "./" },
  { label: 'Covid19', page: "./yibar" },
  { label: "About", page: "./about" }
];
const Nav = ({ value, setValue }) => {
  let history = useHistory();
  //console.log('nav value,setValue ', value, setValue)
  return (
    useMediaQuery("(min-width:675px)") && (
      <Grid
        container
        style={navStyle}
        justify={"flex-end"}
        alignItems="flex-end"
      >
        <Tabs
          onChange={(e, v) => {
            history.push(menus[v].page);
            console.log("setvalue", v);
            setValue(v);
          }}
          value={value}
          aria-label="Navigation Tabs"
        >
          {menus.map((menu)=>(
              <Tab label={menu.label} key={menu.page}/>
          ))}
        </Tabs>
      </Grid>
    )
  );
};

const NavBar = ({ value, setValue }) => {
  //console.log('navbar value:', value)
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event,index) => {
    console.log(index);
    setSelectedIndex(index)
    setAnchorEl(null);
    history.push(menus[index].page);
  };
  return (
    <div>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={toolBarStyle}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {menus.map((menu, index) => (
              <MenuItem
                key={index}
                selected={index===selectedIndex}
                onClick={(event)=>handleMenuClick(event, index)}
              >
                {menu.label}
              </MenuItem>
            ))}
          </Menu>
          {useMediaQuery("(min-width:675px)") && (
            <Typography variant="h6" style={style}>
              Yibar
            </Typography>
          )}
          {/* <Button color="inherit"></Button> */}
          <Nav value={value} setValue={setValue} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const appBarStyle = {
  height: "88px",
  backgroundColor: "#00B5E2",
  backgroundImage: `url(${HeaderBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
};
const toolBarStyle = {
  height: "100%"
};
const navStyle = {
  height: "100%",
  marginBottom: "2px"
};
export default NavBar;
