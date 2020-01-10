import React from 'react'
import { makeStyles } from '@material-ui/core'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: '300px',
    margin: '10% auto',
  },
  title: {
    marginTop: '50px',
    textAlign: 'center',
  }
}))

const NotFoundPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title='404: Not found' />
      <h1 className={classes.title}>NOT THING HERE</h1>
    </Layout>
  )
}

export default NotFoundPage
