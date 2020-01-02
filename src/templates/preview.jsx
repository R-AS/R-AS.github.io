import React from 'react'
import { graphql } from 'gatsby'
import CardList from '../components/common/CardList'
import PaperStepper from '../components/common/PaperStepper'

function Preview(props) {
  console.log(props)
  const { data, pathContext: { base } } = props
  return (
    <>
      <CardList list={data.allMarkdownRemark.edges} type={base.split('/')[1]}/>
      <PaperStepper />
    </>
  )
}

export const query = graphql`
  query($base: String!) {
    allMarkdownRemark(filter: { fields: { slug: { regex: $base } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            date(locale: "")
          }
        }
      }
    }
  }
  
`
export default Preview