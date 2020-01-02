import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '20px',
    backgroundColor: '#333333',
  },
  span: {
    padding: '0px 10px',
  },
  font: {
    color: '#fff',
    textDecoration: 'none',
  }
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} position='static'>
      <Toolbar display='flex'>
        <Box flexGrow={1}>
          <Typography variant='h6'>
            <Link
              className={classes.font}
              to='/'
            >
              {siteTitle}
            </Link>
          </Typography>
        </Box>
        
        <Typography>
          <Link
            className={classNames(classes.span, classes.font)}
            to='/'
          >
            首页
          </Link>
        </Typography>
        <Typography>
          <Link
            className={classNames(classes.span, classes.font)}
            to='/about'
          >
            关于
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
