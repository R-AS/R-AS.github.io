import React from 'react'
import { makeStyles } from '@material-ui/core'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: '300px',
    margin: '10% auto',
  },
  container: {
    display: 'flex',
    height: '60vh',
    alignItems: 'center',
  },
  title: {
    marginTop: '50px',
    textAlign: 'center',
    color: '#ffffff',
  }
}))

const NotFoundPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title='About' />
      <div className={classes.container}>
        <h1 className={classes.title}>
          A blog site that records aerial photography and front-end development.
        </h1>
      </div>
    </Layout>
  )
}

export default NotFoundPage
