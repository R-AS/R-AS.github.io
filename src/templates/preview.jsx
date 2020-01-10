import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import CardList from '../components/common/CardList'
import PaperStepper from '../components/common/PaperStepper'

function Preview(props) {
  const { data, pathContext: { base } } = props
  const tagCount = 8
  const allFiles = Object.assign([], data.allMarkdownRemark.edges)
  const pageCount = Math.ceil(allFiles.length / tagCount)
  const [skip, setSkip] = useState(0)
  const [tagList, setTagList] = useState(allFiles)

  useEffect(() => {
    setTagList(allFiles.slice(skip, skip + tagCount))
    setSkip(skip + 8)
  }, [])

  const skipFn = (n) => {
    setTagList(allFiles.slice(skip, n * tagCount))
    setSkip(skip + tagCount)
  }
  return (
    <>
      <CardList list={tagList} type={base.split('/')[1]}/>
      <PaperStepper pageCount={pageCount} skipFn={skipFn}/>
    </>
  )
}

export const query = graphql`
  query($base: String!) {
    allMarkdownRemark(filter: {fields: {slug: {regex: $base}}}) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
            date(locale: "")
            thumbnail
          }
        }
      }
    }
  }
`
export default Preview