import React, { useRef, useState, FunctionComponent } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { verifyCodeRequest } from '../apis';
import Routes from '../Routes';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ActionContainer = styled.div`
  margin: 32px;
`;

interface Props {
  codeLength: number;
}

const VerifyCode: FunctionComponent<Props> = ({ codeLength }) => {
  const fieldRefs = useRef<(HTMLInputElement)[]>([]);
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const [serverError, setServerError] = useState<string>('');
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.name.split('-')[1]);
    const nextElement = fieldRefs.current[index + 1];
    if(event.target.value){
      if(nextElement) nextElement.focus();
      if(nextElement) nextElement.value = '';
      setErrors({...errors, [index]: false});
    }
    else {
      setErrors({...errors, [index]: true});
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const numbersOnly = pastedText.replace(/\D/g, '');
    const numbersArray = numbersOnly.split('');
    const indexesWithError = {...errors};
    for (let index = 0; index < fieldRefs.current.length; index++) {
      if(numbersArray[index]) {
        fieldRefs.current[index].value = numbersArray[index];
        fieldRefs.current[index + 1]?.focus();
        indexesWithError[index] = false;
      }
      else {
        indexesWithError[index] = true;
      }
    }
    setErrors(indexesWithError);
  }

  const handleSubmit = async () => {
    let code = '';
    const indexesWithError = {...errors};
    for (let index = 0; index < fieldRefs.current.length; index++) {
      const value = fieldRefs.current[index].value;
      if(value) {
        code = code + fieldRefs.current[index].value;
      }
      else {
        indexesWithError[index] = true;
      }
    }
    setErrors(indexesWithError);
    //Intentionally allow to submit the form with empty fields to test BE server API
    try {
      await verifyCodeRequest(code);
      history.push(Routes.SUCCESS);
    } catch (error) {
      setServerError(error.message);
    }
  }

  return <Container>
    <Typography variant="h3" gutterBottom={true}>Verify code:</Typography>
    {serverError && <Typography gutterBottom={true} color="error">{serverError}</Typography>}
    <Grid container spacing={2} justify="center">
      {[...Array(codeLength)].map((_val, index) => (
        <Grid item key={index}>
          <TextField name={`code-${index}`} 
            type="number" 
            variant="outlined"
            data-testid="input"
            inputRef={(ref) => fieldRefs.current[index] = ref} 
            defaultValue="" inputProps={{max: 9, min: 0}} 
            onChange={handleChange}
            onPaste={handlePaste} 
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>{  
              e.target.value = e.target.value.slice(0,1);
             }}
            error={errors[index] || false}
          />
        </Grid>
      ))}
    </Grid>
    <ActionContainer><Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button></ActionContainer>
  </Container>
}

export default VerifyCode;