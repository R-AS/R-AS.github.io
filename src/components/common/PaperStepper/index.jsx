import React, { useState, useEffect } from 'react'
import {
  makeStyles, useTheme, MobileStepper, Button,
} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '70vw',
  },
  stepper: {
    background: '#fff',
  },
}))

function PaperStepper (props) {
  const { pageCount, skipFn = false } = props
  const theme = useTheme()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = pageCount;

  useEffect(() => {
    if (skipFn) skipFn(activeStep + 1)
  }, [activeStep])

  const handleNext = () => {
    setActiveStep(preActiveStep => preActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(preActiveStep => preActiveStep - 1)
  }

  return (
    <div className={classes.root}>
      <MobileStepper
        className={classes.stepper}
        steps={maxSteps}
        position='static'
        variant='text'
        activeStep={activeStep}
        nextButton={
          <Button size='small'  onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direaction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  )
}

export default PaperStepper