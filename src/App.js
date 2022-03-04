import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
//import Button from './components/Button';
import Button from '@material-ui/core/Button'
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.scss';
import { postGenerateTextEndpoint } from './utils';
//import {Helmet} from "react-helmet";

import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';
const TITLE = 'Нищета';
function App() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  //const [model, setModel] = useState('gpt2');
  const model = "345M";
  const [temperature, setTemperature] = useState(1);
  const [lenght, setLenght] = useState(20);
  const [generatedText, postGenerateText] = postGenerateTextEndpoint();

  const [RUB, setRub] = useState(109);

  const handleChange = (event) => {
    setText(event.target.value);
  };


  useEffect(() => {
    document.title = TITLE;
 }, []);
  
  const THEME = createMuiTheme({
    typography: {
     "fontFamily": `sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    },
 });

 const styles = {
  root: {
    marginLeft: 5
  }
}
const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={10}
    style={{marginLeft: "0.5em"}}
  />
))
const AdornedButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <Button size="large" style={{ marginTop: '1em', marginBottom: '1em', width: 'fit-content', paddingBottom: '2em', backgroundColor: 'transparent'}}

    color="primary"
    {...rest}>
       
      {children}
      {loading && <SpinnerAdornment  {...rest} />}
      
    </Button>
  )
}
 
  const generateText = () => {
    generatedText.complete = false;
    postGenerateText({ text, temperature, lenght });
    setToggle(false);
  }
  if (generatedText.complete && !generatedText.error && !toggle){
    setText(text+generatedText.data.result);
    setToggle(true);
  }
  //var RUB = 109;

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  function getCurrency(){
  return fetch("https://freecurrencyapi.net/api/v2/latest?apikey=74697630-9bb4-11ec-ab75-37843d4875b0", requestOptions)
    .then(function(response){
      return response.json();
    })
    .then(function(result){
      console.log(result);
      setRub(result.data)

    })
  }
  

  useEffect(() => {

    fetch("https://freecurrencyapi.net/api/v2/latest?apikey=74697630-9bb4-11ec-ab75-37843d4875b0", requestOptions)
    .then(function(response){
      return response.json();
    })
    .then(function(result){
      console.log(result);
      setRub(result.data.RUB)

    })
  
  }, []);
  

  
  console.log(RUB)
  return (
    
    <MuiThemeProvider theme ={THEME}>
    <div className='app-container'>
      
    <div className='centering'> 
        <p>x {" < "} {Math.round(2.3*RUB)}k  лютейшая нищета на грани выживания</p>
        <p>{Math.round(2.3*RUB)}k {" < "} x {" < "} {Math.round(6.2*RUB)}k - обычная нищета, ипотека на 20 лет, кино и рестораны раз в неделю, еда из ашана</p>
        <p>{Math.round(6.2*RUB)}k {" < "} x {" < "} {Math.round(10.8*RUB)}k - нормальная жизнь, ипотека на 10 лет, машина среднего класса (B, C)</p>
        <p>{Math.round(10.8*RUB)}k {" < "} x {" < "} {Math.round(15.6*RUB)}k - хорошая жизнь, ипотека на 5 лет, путешествия</p>
        <p>x {" > "} {Math.round(15.6*RUB)}k - достаточно хорошая жизнь, ипотека на 2 года, машина бизнес класса, девушка</p>
        <p></p>
        <p><i>Сделано <a href="https://monetka.name">Монетой</a>, для канала <a href="https://t.me/lovedeathtransformers">Alex Wortega</a></i></p>
        
        
    </div>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
//{generatedText.pending&&
  //<div className='result pending'>Подождите!</div>}
  //
