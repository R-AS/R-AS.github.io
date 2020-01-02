import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '80vh',
    justifyContent: 'center',
  },
  list: {
    display: 'grid',
    margin: 'auto',
    width: '80vw',
    height: '50vh',
    gridTemplateColumns: 'repeat(4, 23.5%)',
    gridTemplateRows: 'repeat(2, 45%)',
    gridGap: '3% 2%',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 120,
  },
  title: {
    paddingBottom: 0,
  },
  footer: {
    width: '50%',
    fontSize: '.9rem',
  },
})

function CartItem({ type, title, date }) {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        />
        <CardContent className={classes.title}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography className={classes.footer} gutterBottom variant='caption' component='span'>
          {type}
        </Typography>
        <Typography  className={classes.footer} align='right' gutterBottom variant='caption' component='span'>
          {date}
        </Typography>
      </CardActions>
    </Card>
  )
}

function CardList({ type, list }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {
          list.map((n, m) => (
            <CartItem
              key={m}
              type={type}
              title={n.node.frontmatter.title}
              date={n.node.frontmatter.date}
            />
          ))
        }
      </div>
    </div>
  )
}

export default CardList