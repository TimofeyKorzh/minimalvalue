import React, { useEffect, useState } from 'react';


import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.scss';

import { Container } from '@material-ui/core';

const TITLE = 'Нищета';
function App() {

  const [RUB, setRub] = useState(109);
  const inflation_rate = 1.28;



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




  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch("https://api.currencyapi.com/v3/latest?apikey=DLiY9BRrZHRKE51b0KvuYwImfC7XmSpN9K7XkrSB", requestOptions)
    .then(function(response){
      return response.json();
    })
    .then(function(result){
      console.log(result.data.RUB.value);

      setRub(result.data.RUB.value*inflation_rate)

    })
  
  }, []);
  

  
  console.log(RUB)
  return (
    
    <MuiThemeProvider theme ={THEME}>
    <div className='app-container'>
    <Container maxWidth="sm">
    <div className='centering'> 
        <p>x {" < "} {Math.round(2.3*RUB)}k - лютейшая нищета на грани выживания</p>
        <p>{Math.round(2.3*RUB)}k {" < "} x {" < "} {Math.round(6.2*RUB)}k - обычная нищета, ипотека на 20 лет, кино и рестораны раз в неделю, еда из ашана</p>
        <p>{Math.round(6.2*RUB)}k {" < "} x {" < "} {Math.round(10.8*RUB)}k - нормальная жизнь, счет в армянском или грузинском банке, внж, ипотека на 10 лет, машина среднего класса (B, C)</p>
        <p>{Math.round(10.8*RUB)}k {" < "} x {" < "} {Math.round(15.6*RUB)}k - хорошая жизнь,счет в европейском или американском банке, европейский паспорт, ипотека на 5 лет, путешествия</p>
        <p>x {" > "} {Math.round(15.6*RUB)}k - достаточно хорошая жизнь, офшоры на Кипре, американский паспорт, ипотека на 2 года, машина бизнес класса, девушка</p>
        <p></p>
        <p><i>Сделано <a href="https://monetka.name">Монетой</a>, для канала <a href="https://t.me/lovedeathtransformers">Alex Wortega</a></i></p>
        
        
    </div>
    </Container>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
//{generatedText.pending&&
  //<div className='result pending'>Подождите!</div>}
  //
