import React, { useState } from 'react'
import { useStaticQuery, Link, graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, IconButton, InputBase, MenuList, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  keywordList: {
    position: 'relative',
    overflowY: 'scroll',
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
  keywordItem: {
    width: '100%',
    color: '#000000cc',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}))

// 关键词单项
const KeywordList = ({ list }) => {
  const classes = useStyles()
  return (
    <div className={classes.keywordList} style={{display: list.length ? 'block' : 'none'}}>
      <Paper>
        <MenuList>
          {
            list.map((n, m) => (
              <MenuItem key={m}>
                <Link className={classes.link} to={`blogs${n.node.fields.slug}`}>
                  <p className={classes.keywordItem}>{n.node.frontmatter.title}</p>
                </Link>
              </MenuItem>
            ))
          }
        </MenuList>
      </Paper>
    </div>
  )
}

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  const titleList = Object.assign([], data.allMarkdownRemark.edges)
  const classes = useStyles()
  const [keywordArr, setKeywordArr] = useState([])

  const handleChange = ({ target: { value } }) => {
    if (value.trim().length) {
      const filterKeyword = titleList.filter((n) => {
        return n.node.frontmatter.title.indexOf(value.trim()) >= 0
      })
      setKeywordArr(filterKeyword)
    } else {
      setKeywordArr([])
    }
  }

  return (
    <>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Search Posts'
          inputProps={{ 'aria-label': 'search posts' }}
          onChange={handleChange}
        />
        <IconButton type='submit' className={classes.iconButton} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
      <KeywordList list={keywordArr} />
    </>
    
  )
}