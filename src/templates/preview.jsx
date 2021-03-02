import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Header from '../components/common/Header'
import CardList from '../components/common/CardList'
import PaperStepper from '../components/common/PaperStepper'

function Preview(props) {
  const { data, pathContext: { base } } = props
  const tagCount = 8
  const allFiles = Object.assign([], data.allMarkdownRemark.edges)
  const pageCount = Math.ceil(allFiles.length / tagCount)
  const [tagList, setTagList] = useState(allFiles)

  useEffect(() => {
    setTagList(allFiles.slice(0, tagCount))
  }, [])

  const skipFn = (n) => {
    const start = (n - 1) * tagCount
    const end = n * tagCount
    setTagList(allFiles.slice(start, end))
  }

  return (
    <>
      <Header siteTitle='R-AS Blog' />
      <CardList list={tagList} type={base.split('/')[1]}/>
      <PaperStepper pageCount={pageCount} skipFn={skipFn} />
    </>
  )
}

export const query = graphql`
  query($base: String!) {
    allMarkdownRemark(filter: {fields: {slug: {regex: $base}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
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