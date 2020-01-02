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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={classes.root}>
        <main>{children}</main>
      </div>
      <footer className={classes.footer}>
        © {new Date().getFullYear()}, Built with R-AS
        {' '}
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
