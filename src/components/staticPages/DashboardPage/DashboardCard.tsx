import React from 'react';
import { Card, Button, CardContent, CardActions, CardActionArea, Typography, CardMedia } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import LinkWrapper from '../../common/LinkWrapper';

interface Props {
  title: string;
  count: number;
  link: string;
  image: string;
  addNewLink: string;
}

const DashboardCard: React.FC<Props> = (props) => {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <LinkWrapper to={props.link}>
          <CardMedia
            style={{ height: 0, marginTop: '30', paddingTop: '56.25%' }}
            image={props.image}
            title={props.title}
          />
        </LinkWrapper>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b style={{ fontSize: 20 }}>{props.count}</b> {props.title} are available
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* style={{display: 'flex', justifyContent: 'flex-end'}} */}
      <CardActions>
        <LinkWrapper to={props.link}>
          <Button>Details</Button>
        </LinkWrapper>

        <LinkWrapper to={props.addNewLink}>
          <Button>Add New</Button>
        </LinkWrapper>
      </CardActions>
    </Card>
  );
};

export default DashboardCard;
