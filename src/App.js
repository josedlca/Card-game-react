import React from 'react';
class CardsBtn extends React.Component{
  constructor(props){
    super(props)
    this.sendInfoToCardArr = this.sendInfoToCardArr.bind(this)
  }

  sendInfoToCardArr(ourImgArr){
    this.props.imgArrGet(ourImgArr)
  }

  render(){
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
    function double(){
    let oldArr = [...cardsArr]
    cardsArr = cardsArr.concat(oldArr)
    return cardsArr
    }
    double()
    let seeMe = []
    function arrMixer(arr){
      var i, j, temp
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      seeMe= arr    
      return seeMe
    }
    arrMixer(cardsArr)

    if( seeMe.length !== 0){
      return(
        <div>
          <button onClick = {() => this.sendInfoToCardArr(seeMe)}>Start</button>
        </div>
      )
    }
  }
}

class ImgContainer extends React.Component{
  constructor(props){
    super(props)

    this.getImgName = this.getImgName.bind(this)
  }
  getImgName(theName){
    this.props.imgName(theName)
  }
  render(){
    return(
      <React.Fragment>
        <img 
          src={this.props.srcUrl} 
          alt={this.props.altName}
          onClick = {()=> this.getImgName(this.props.altName)}
        />
      </React.Fragment>
    )
  }
}


class CardsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      allMixImg : [],
      picName : [],
      imgId : [],
      saveCorrectAns : []
    }
  }

  getArrImg(stateName, imgInfoArr){
    this.setState({
      [stateName]:imgInfoArr 
    })
  }

  getNameImg(theName,index){
    this.setState(state =>{
      const imgId = state.imgId.concat(index)
      return {imgId}                    
    })
    this.setState(state =>{
      const picName = state.picName.concat(theName)
      return {picName}                    
    })
  }

  componentDidUpdate () {
    const {picName, imgId} = this.state 
    if(picName.length === 2){
      if(picName[0] === picName[1] && imgId[0] !== imgId[1]){
        this.setState({
          picName: []
        })
        this.setState(state =>{
          const saveCorrectAns = state.saveCorrectAns.concat(imgId)
          return {saveCorrectAns}                    
        })
        this.setState({
          imgId : []
        })
        return console.log('son iguales')
      }else{        
        this.setState({
          picName: []
        })
        this.setState({
          imgId : []
        })
        return console.log('son diferentes o precionaste 2 veces los mismo')
      }                          
    }
  }

  render(){
    console.log( 'the id',this.state.imgId)
    console.log('the arr of id',this.state.saveCorrectAns)
    return(
      <div className = 'card-container'>
        {this.state.allMixImg.length !== 0
          ?<ul>
            {this.state.allMixImg.map((item,index) =>(
              <li key = {index}>
                <ImgContainer 
                  srcUrl = {item.src}
                  altName = {item.name}
                  imgName = {(picName) => this.getNameImg(picName, index)}
                />
              </li>
            ))}
          </ul>
          :<h2>Aun no inicias</h2>
        }
        <CardsBtn 
          imgArrGet = {(imgArr) => this.getArrImg('allMixImg',imgArr)}
        />
      </div>
    )
  }
}


class App extends React.Component{
  render(){
    return(
      <div className = "principal-container">
        <h1>Hello world</h1>
        <CardsContainer />
      </div>
    )
  }
}

export default App;

