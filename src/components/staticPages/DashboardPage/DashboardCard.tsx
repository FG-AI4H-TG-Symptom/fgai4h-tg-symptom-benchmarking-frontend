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
  showFull?: boolean;
}

const useBadgeStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#FF9173',
    borderColor: '#fff',
    borderWidth: '1px',
    borderStyle: 'solid',
    width: 30,
    height: 30,
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
  },
});

const CardMediaBadge: React.FC<{ badgeContent: React.ReactNode }> = ({ badgeContent }) => {
  const classes = useBadgeStyles();
  return (
    <div className={classes.root} style={{}}>
      {badgeContent}
    </div>
  );
};

const DashboardCard: React.FC<Props> = ({ title, count, link, image, addNewLink, showFull = true }) => {
  const useStyles = makeStyles({
    root: {
      maxWidth: showFull ? 345 : 260,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <LinkWrapper to={link}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={title}>
            <CardMediaBadge badgeContent={count} />
          </CardMedia>
          <CardContent>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            {showFull && (
              <Typography variant="body2" color="textSecondary" component="p">
                <b style={{ fontSize: 20 }}>{count}</b> {title} are available
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </LinkWrapper>
      {showFull && (
        <CardActions>
          <LinkWrapper to={link}>
            <Button>Details</Button>
          </LinkWrapper>

          <LinkWrapper to={addNewLink}>
            <Button>Add New</Button>
          </LinkWrapper>
        </CardActions>
      )}
    </Card>
  );
};

export default DashboardCard;
