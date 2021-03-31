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

function SEO({ description, lang, title, keyword, path = '' }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
          }
        }
      }
    `
  )

  const { author, url } = site.siteMetadata
  const metaDescription = description || site.siteMetadata.description
  const urlStr = `${url}/${path}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      // meta={[
      //   {
      //     name: 'description',
      //     content: metaDescription,
      //   },
      //   {
      //     property: 'og:title',
      //     content: title,
      //   },
      //   {
      //     property: 'og:description',
      //     content: metaDescription,
      //   },
      //   {
      //     property: 'og:type',
      //     content: 'website',
      //   },
      //   {
      //     property: 'og:keywords',
      //     content: `R-AS's blog, frontend, aerial photography, ${keyword}`,
      //   },
      //   {
      //     property: 'title',
      //     content: title,
      //   },
      //   {
      //     property: 'description',
      //     content: metaDescription,
      //   },,
      //   {
      //     property: 'keywords',
      //     content: `R-AS's blog, frontend, aerial photography, ${keyword}`,
      //   },
      //   {
      //     property: 'author',
      //     content: 'ZHENG & R-AS',
      //   },
      //   {
      //     property: 'og:author',
      //     content: 'ZHENG & R-AS',
      //   },
      // ]}
    >
      <link rel="canonical" href='https://r-as.github.io' />
      {title && <meta name="title" content={title} />}
      {author && <meta name="author" content={author} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {urlStr && <meta name="url" content={urlStr} />}
      {keyword && <meta name="keywords" content={`R-AS's blog, frontend, aerial photography, ${keyword}`} />}

      {title && <meta name="og:title" content={title} />}
      {metaDescription && <meta name="og:description" content={metaDescription} />}
      {author && <meta name="og:author" content={author} />}
      {urlStr && <meta name="og:url" content={urlStr} />}
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
