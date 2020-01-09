const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages/blogs' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allDirectory(filter: {relativeDirectory: {regex: "/pages\/blogs/"}}) {
        edges {
          node {
            base
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/blogs${node.fields.slug}`,
      component: path.resolve('./src/templates/blog-post.jsx'),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  result.data.allDirectory.edges.forEach(({ node }) => {
    createPage({
      path: `/blogs/${node.base}`,
      component: path.resolve('./src/templates/preview.jsx'),
      context:{
        base: `/${node.base}/`,
      }
    })
  })
}