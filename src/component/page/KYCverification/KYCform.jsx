import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Basicinfo from '../KYCverification/BasicInfo';
import Address from '../KYCverification/Address';
import LegalInfo from '../KYCverification/LegalInfo';
import LegalDoc from '../KYCverification/LegalDoc';
const steps = ['Basic Details',  'Address' ,'Legal Info','Legal DOC'];

 function KYCform() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handleSubmit=()=>{
    console.log();
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
       
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box  className="  lg:ml-52  flex flex-col justify-center w-full lg:w-10/12 bg-black lg:mt-20 mt-20   " sx={{ height:"40%" ,borderRadius:"10px",backgroundColor:"white",   boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}   >
      <Stepper className='  lg:rounded-t-lg  bg-stone-300  text-white  sm:p-4  h-16 ' activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography  variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step sx={{color:"white"}} className='text-white' key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ textAlign:"center",  mt:8}}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
           <div className='flex justify-center items-center mx-12 gap-10 lg:mr-5'>
            <Button onClick={handleReset}className='sm:w-32 w-24  '
             sx={{  my:3, bgcolor:"#68428A",  height:"40px", borderRadius:"20px",color:"black"  }}>Reset</Button>
             <Button onSubmit={handleSubmit} className='sm:w-32 w-24 '
               sx={{ my:3, bgcolor:"#68428A",  height:"40px", borderRadius:"20px" ,color:"black" }}>Submit</Button>
             </div>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            {activeStep===0 && <Basicinfo handleNext={handleNext}/>}
            {activeStep===1 && <Address/>}
            {activeStep===2 && <LegalInfo/>}
            {activeStep===3 && <LegalDoc/>}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              
              disabled={activeStep === 0}
              onClick={handleBack}
            
              sx={{ mx:5, mb:3, backgroundColor:"gray", height:"40px", borderRadius:"20px" ,color:"black" }}

              className=' sm:w-32 w-16'
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} className='w-32 item-center flex justify-center' sx={{  borderRadius:"20px", backgroundColor:"lightgreen" ,mb:3}}>
                Skip
              </Button>
            )}
       


       
            <Button onClick={handleNext} 
             sx={{ h:8, color:"black" , borderRadius:"20px", bgcolor:"#68428A" ,mx:8,mb:3  }}
            >

             
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>

            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
export default KYCform