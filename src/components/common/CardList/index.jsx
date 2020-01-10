import React from 'react'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card, CardActionArea, CardMedia, CardContent,
  CardActions, Typography, Grid,
} from '@material-ui/core'

const useStyles = makeStyles({
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
  },
  title: {
    paddingBottom: 0,
    fontSize: '.9rem',
  },
  footer: {
    width: '100%',
    fontSize: '.9rem',
  },
  link: {
    textDecoration: 'none',
  }
})

function CartItem({ title, date, thumbnail, slug }) {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={3}>
      <Link className={classes.link} to={`/blogs${slug}`}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`/thumbnail/${thumbnail}`}
              title='Contemplative Reptile'
            />
            <CardContent className={classes.title}>
              <Typography variant='h6' component='div'>
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Typography  className={classes.footer} align='right' gutterBottom variant='caption' component='span'>
              {date}
            </Typography>
          </CardActions>
        </Card>
      </Link>
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