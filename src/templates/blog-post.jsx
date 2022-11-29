import React from 'react'
import { graphql } from 'gatsby'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Slide, Chip } from '@material-ui/core'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'

const useStyles = makeStyles(() => ({
  root: {
    color: '#fff',
  },
  paragraph: {
    margin: 0,
  },
  type: {
    fontSize: '.9rem',
  },
  content: {
    marginTop: '5%',
    fontSize: '.9rem',
    color: '#ffffff',
  },
  chip: {
    borderRadius: '5px',
    color: '#ffffff',
    height: 30,
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const post = data.markdownRemark
  console.log('🚀 -> file: blog-post.jsx -> line 34 -> post', data)

  const {
    palette: {
      primary, secondary, error, warning, info, success,
    } = {},
  } = useTheme()
  const colors = [primary.light, secondary.light, error.light, warning.light, info.light, success.light]
  const bases = data.allDirectory.edges.map(n => n.node.base)
  const colorIndex = bases.indexOf(post.frontmatter.type) || 0
  
  const path = (post.fileAbsolutePath.match(/pages\/(.+).md/) || [])[1] || ''

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        keyword={post.frontmatter.title}
        path={path}
      />
      <div className={classes.root}>
        <Slide direction='down' in timeout={300}>
          <h1>{post.frontmatter.title}</h1>
        </Slide>
        <Slide direction='right' in timeout={700}>
          <div>
            <p className={classes.paragraph}>{post.frontmatter.date}</p>
            <Chip
              label={post.frontmatter.type}
              className={classes.chip}
              style={{ backgroundColor: colors[colorIndex % colors.length] }}
            />
            <p className={classNames(classes.paragraph, classes.type)}>{post.fields.readingTime.text}</p>
          </div>
        </Slide>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fileAbsolutePath
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
    allDirectory(filter: {relativeDirectory: {regex: "/pages\/blogs/"}}) {
      totalCount
      edges {
        node {
          base
        }
      }
    }
  }
`
