import React from 'react'
import Img from 'gatsby-image'

const Image = ({ data }) => (
  <Img fluid={data.placeholderImage.childImageSharp.fluid} />
)

export default Image
