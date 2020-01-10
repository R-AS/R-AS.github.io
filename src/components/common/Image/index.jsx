import React from 'react'
import Img from 'gatsby-image'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  img: {
    zIndex: -1,
  },
}))

const Image = ({ data }) => {
  const classes = useStyles()
  return (
    <Img className={classes.img} fluid={data.placeholderImage.childImageSharp.fluid} />
  )
}

export default Image
