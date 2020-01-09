import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/common/Layout'
import SEO from '../components/common/Seo'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(pathToSlugField: "frontmatter.path")
      frontmatter {
        title
        date
      }
      excerpt
    }
  }
`