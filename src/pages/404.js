import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'
import Image from '../components/common/Image'

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: '300px',
    margin: '10% auto',
  },
  title: {
    marginTop: '50px',
    textAlign: 'center',
    color: '#ffffff',
  }
}))

const NotFoundPage = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title='404: Not found' />
      <div className={classes.image}>
        <Image data={data} />
      </div>
      <h1 className={classes.title}>NOT FOUND</h1>
    </Layout>
  )
}

export const query = graphql`
  query {
    placeholderImage: file(relativePath: { eq: "images/common/gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default NotFoundPage
