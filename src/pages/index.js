import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'
import Image from '../components/common/Image'
import SpanList from '../components/common/SpanList'

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: '400px',
    margin: '10% auto',
    marginBottom: '1.45rem',
  },
  h1: {
    padding: '20px 0',
    textAlign: 'center',
  }
}))

const IndexPage = ({ data }) => {
  const classes = useStyles()
  return (
    <Layout>
      <SEO title='Home' />
      <div className={classes.image}>
        <Image data={data} />
        <h1 className={classes.h1}>
          {data.site.siteMetadata.author}
        </h1>
      </div>
      <SpanList />
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
    placeholderImage: file(relativePath: {eq: "images/common/avatar.png"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default IndexPage