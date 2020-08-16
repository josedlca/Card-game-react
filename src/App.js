import React from 'react';

function CardArr(){
  let cardsArr = [
              {
                name: 'imgOne',                
                src: "https://via.placeholder.com/150"
              },
              {
                name: 'imgTwo',                
                src: "https://via.placeholder.com/160"
              },
              {
                name: 'imgThree',                
                src: "https://via.placeholder.com/170"
              }              
  ]
  let cardsArrCopy = [...cardsArr]

  cardsArrCopy.map((item) => (
    cardsArr.push(item)
  ))

  function shuffle(arr) {
    var i, j, temp
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
  };

  let shuffleArr = shuffle(cardsArr)
  console.log(shuffleArr)
  return(
    <div className = 'card-container'>
      <ul>
        {shuffleArr.map((item,index) => (
          <li key ={index}>
            <img src = {item.src} alt={item.name}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

class App extends React.Component{
  render(){
    return(
      <div className = "principal-container">
        <h1>Hello world</h1>
        <CardArr />
      </div>
    )
  }
}

export default App;

