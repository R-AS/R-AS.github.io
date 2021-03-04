import React from 'react'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card, CardActionArea, CardMedia, CardContent,
  CardActions, Typography, Grid, Slide,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '80vh',
    justifyContent: 'center',
  },
  list: {
    margin: 'auto',
    width: '80vw',
    minHeight: '50vh',
  },
  card: {},
  media: {
    height: 120,
    backgroundColor: theme.palette.warning.light,
  },
  title: {
    paddingTop: 8,
    paddingBottom: 0,
    // fontSize: '.9em',
  },
  footer: {
    paddingTop: 0,
    width: '100%',
    fontSize: '.8rem',
  },
  link: {
    textDecoration: 'none',
  },
  cardTitle: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}))

function CartItem({ title, date, thumbnail, slug, index }) {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={3}>
      <Slide direction='down' in timeout={200 + (index * 30)} key={index}>
        <div>
          <Link className={classes.link} to={`/blogs${slug}`}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`/thumbnail/${thumbnail}`}
                  title='Contemplative Reptile'
                />
                <CardContent className={classes.title}>
                  <Typography className={classes.cardTitle} variant='subtitle1' component='div'>
                    {title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography className={classes.footer} align='right' gutterBottom variant='body2' component='span'>
                  {date}
                </Typography>
              </CardActions>
            </Card>
          </Link>
        </div>
      </Slide>
    </Grid>
  )
}

function CardList({ list }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid 
        className={classes.list}
        container
        spacing={2}
      >
        {
          list.map((n, m) => (
            <CartItem
              key={m}
              index={m}
              title={n.node.frontmatter.title}
              date={n.node.frontmatter.date}
              thumbnail={n.node.frontmatter.thumbnail}
              slug={n.node.fields.slug}
            />
          ))
        }
      </Grid>
    </div>
  )
}

export default CardList