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
    background: '#303030',
    color: '#fff',
  },
  button: {
    color: '#fff !important',
  },
  disabled: {
    color: '#b2b2b2 !important'
  }
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
          <Button
            className={activeStep === maxSteps - 1 ? classes.disabled : classes.button}
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button
            className={activeStep === 0 ? classes.disabled : classes.button}
            size='small'
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  )
}

export default PaperStepper