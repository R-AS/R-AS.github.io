/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, title, keyword }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const { author, url } = site.siteMetadata

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:keywords',
          content: `R-AS's blog, frontend, aerial photography, ${keyword}`,
        },
        {
          property: 'title',
          content: title,
        },
        {
          property: 'description',
          content: metaDescription,
        },,
        {
          property: 'keywords',
          content: `R-AS's blog, frontend, aerial photography, ${keyword}`,
        },
        {
          property: 'author',
          content: 'ZHENG & R-AS',
        },
        {
          property: 'og:author',
          content: 'ZHENG & R-AS',
        },
      ]}
    >
      <link rel="canonical" href='https://r-as.github.io' />
      {title && <meta property="og:title" content={title} />}
      {title && <meta property="title" content={title} />}
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      {metaDescription && <meta property="description" content={metaDescription} />}
      {author && <meta property="og:author" content={author} />}
      {author && <meta property="author" content={author} />}
      {url && <meta property="og:url" content={url} />}
      {url && <meta property="url" content={url} />}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
  keyword: '',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string,
}

export default SEO
