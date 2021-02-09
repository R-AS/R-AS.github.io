import React from 'react'
import { graphql } from 'gatsby'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'

const useStyles = makeStyles(theme => ({
  paragraph: {
    margin: 0,
  },
  type: {
    fontSize: '.9rem',
  },
  content: {
    marginTop: '5%',
    fontSize: '.9rem',
    color: theme.palette.text.primary,
  }
}))

export default ({ data }) => {
  const classes = useStyles()
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <p className={classes.paragraph}>{post.frontmatter.date}</p>
        <p className={classNames(classes.paragraph, classes.type)}>{post.frontmatter.type}</p>
        <p className={classNames(classes.paragraph, classes.type)}>{post.fields.readingTime.text}</p>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        type
      }
      excerpt
      fields {
        readingTime {
          text
        }
      }
    }
  }
`