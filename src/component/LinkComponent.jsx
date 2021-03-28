import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "block",
    width: "25vw",
    transitionDuration: "0.3s",
    height: "20vw",
    margin: "1vw"
  },
  media: {
    height: 140,
  },
});

export default function LinkComponent(props) {
  const classes = useStyles();
  const { url, header, image, description } = props;
  return (
    <Link to={{pathname: url}} target="_blank">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={header} />
          <CardContent>
            <Typography gutterBottom variant="h7" component="h2">
              {header}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </Link>
  );
}
