import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Chip, Slide } from '@material-ui/core'

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
    borderRadius: '5px',
    color: '#ffffff',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  link: {
    textDecoration: 'none',
  },
}))


const SpanList = () => {
  const classes = useStyles()

  const {
    palette: {
      primary, secondary, error, warning, info, success,
    } = {},
  } = useTheme()
  const colors = [primary.light, secondary.light, error.light, warning.light, info.light, success.light]

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
          <Slide direction='right' in timeout={200 + (m * 30)} key={m}>
            <Link className={classes.link} to={`/blogs/${n.node.base}`}>
              <Chip
                label={n.node.base}
                className={classes.chip}
                style={{ backgroundColor: colors[m % colors.length] }}
              />
            </Link>
          </Slide>
          
        ))
      }
    </div>
  )
}

export default SpanList