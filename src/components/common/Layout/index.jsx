/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core'
import Header from '../Header'
import './index.css'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(230, 230, 230, 0.1)',
  },
  content: {
    margin: '0 auto',
    maxWidth: 960,
    minHeight: '80vh',
    padding: '0px 1.0875rem 1.45rem',
    paddingTop: 0,
    overflow: 'hidden',
  },
  footer: {
    textAlign: 'center',
  }
}))

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={classes.content}>
        <main>{children}</main>
      </div>
      <footer className={classes.footer}>
        © {new Date().getFullYear()}, Built with R-AS
        {' '}
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
