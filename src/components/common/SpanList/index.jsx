import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: 'auto',
    width: '70%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

const SpanList = () => {
  const classes = useStyles()
  const data = useStaticQuery(
    graphql`
      query {
        allDirectory(filter: {relativeDirectory: {regex: "/pages\/blogs/"}}) {
          totalCount
          edges {
            node {
              base
            }
          }
        }
      }
    `
  )
  
  return (
    <div className={classes.root}>
      {
        data.allDirectory.edges.map((n, m) => (
          <Link to={`/preview`} key={m}>
            <Chip
              label={n.node.base}
              className={classes.chip}
            />
          </Link>
          
        ))
      }
    </div>
  )
}

export default SpanList