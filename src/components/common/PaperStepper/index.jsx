import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '70vh',
  },
  stepper: {
    background: '#fff',
  },
}))
const list = [1, 2, 3, 4, 5]
function PaperStepper () {
  const theme = useTheme()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = list.length;

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