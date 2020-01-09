import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, IconButton, InputBase, TextField } from '@material-ui/core'
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
}))

export default () => {
  const classes = useStyles()
  return (
    <Paper component='form' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search Posts'
        inputProps={{ 'aria-label': 'search posts' }}
      />
      <IconButton type='submit' className={classes.iconButton} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}