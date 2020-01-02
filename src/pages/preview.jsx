import React from "react"
import { graphql } from 'gatsby'

function Preview(data) {
  console.log(data)
  return (
    <h1>en</h1>
  )
}

export const data = graphql`
  query {
    allMarkdownRemark(filter: {fields: {slug: {regex: "/react/"}}}) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }  
`

export default Preview