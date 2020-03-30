import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderBackground from '../images/HeaderBackground.png'

const style = {
    flexGrow: 1
}
const NavBar = () => {
    return (
        <div>
            <AppBar position="static" style={appBarStyle}>
                <Toolbar>
                    {/* <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" style={style}>
                        Yibar
                    </Typography>
                    {/* <Button color="inherit"></Button> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const appBarStyle = {
    height: '88px',
    backgroundColor: '#00B5E2',
    backgroundImage: `url(${HeaderBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
}
export default NavBar;