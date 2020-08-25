import React from 'react';
import interrogacion from './assets/img/interrogacion.png'
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
        src: "https://via.placeholder.com/150",
        founded : false ,
        show : 'close'
      },
      {
        name: 'imgTwo',                
        src: "https://via.placeholder.com/160",
        founded : false,
        show : 'close'
      },
      {
        name: 'imgThree',                
        src: "https://via.placeholder.com/170",
        founded : false,
        show : 'close'
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
    return(
      <div>
        <button 
          className ="px-6 py-3 border-solid border-2 border-black rounded-md outline-none pointer leading-none text-lg font-semibold"
          onClick = {() => this.sendInfoToCardArr(seeMe)}
        >
            {this.props.btnText}
        </button>
      </div>
    )
  }
}

class ImgContainer extends React.Component{
  constructor(props){
    super(props)

    this.getImgName = this.getImgName.bind(this)
  }
  getImgName(theName, showState){
    this.props.imgName(theName, showState)
  }
  render(){
    return(
      <div 
        className = "two-faces-card relative w-full h-full"
        onClick = {()=> this.getImgName(this.props.altName, this.props.showState)}
      >
        <img 
          className = {
            this.props.showState === 'open' 
            ? "w-full back-face back-face-show" 
            : "w-full back-face"
          }
          src={this.props.srcUrl} 
          alt={this.props.altName}          
        />
        <div 
          className = {
            this.props.showState === 'open' 
            ? "front-face w-full absolute top-0 left-0 bg-yellow-200 h-full front-face-hide" 
            : "front-face w-full absolute top-0 left-0 bg-yellow-200 h-full"
          }
        >
          <img className = "w-full h-full " src = {interrogacion} alt="interrogacion"/>
        </div>        
      </div>
    )
  }
}

class YouWin extends React.Component{
  render(){
    return(
      <div>
        {this.props.areYouWinner === true 
        ?<h2 className = 'text-2xl font-semibold'>*Ganaste felicidades*</h2> 
        :<div></div>
        }
      </div>
    )
  }
}

class CardsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      allMixImg : [],
      picName : null,
      imgId : null,
      youWin : false,
    }
  }

  getArrImg(stateName, imgInfoArr){
    this.setState({
      [stateName]:imgInfoArr ,
      youWin: false
    })
  }

  getNameImg(theName, index){
    if(this.state.allMixImg[index].founded !== true){
      this.setState({
        imgId : index
      })
      this.setState({
        picName : theName
      })
      this.setState(prevState => ({
        allMixImg: prevState.allMixImg.map(
          (el, key) => index === key ? {...el, show: 'open'}: el
        )
      }))
    }  
  }

  areYouWining(){
    let boolArr = []
    this.state.allMixImg.map(item =>{
      return boolArr.push(item.founded)
    })
    let youWinArr = boolArr.filter(item => item === false)
    return youWinArr.length
  }

  cardFailHide = (myPrevState)=>{
    this.setState(prevState => ({
      allMixImg: prevState.allMixImg.map(
        (el, key) => myPrevState.imgId === key ? {...el, show: 'close'}: el
      )
    }))
    this.setState(prevState => ({
      allMixImg: prevState.allMixImg.map(
        (el, key) => this.state.imgId === key ? {...el, show: 'close'}: el
      )
    }))
  }

  componentDidUpdate (prevProps,prevState) {

    if((this.state.picName !== null && prevState.picName !== null)){      
      if((prevState.picName === this.state.picName) && (prevState.imgId !== this.state.imgId) ){
        
        // cambiando el atributo founded de false a true
        let foundedArr = [...this.state.allMixImg]            
            foundedArr[prevState.imgId].founded = true
            foundedArr[this.state.imgId].founded = true
        this.setState({
          allMixImg : foundedArr
        }) 
        if(this.areYouWining(prevState) === 0){
          this.setState({
            youWin : true
          })
        }
        // limpia el state para que no guarde el anterior y poder trabajar con los clicks
        this.setState({
          picName : null
        })
        console.log('son iguales')
      }
      if((prevState.picName !== this.state.picName)&& (prevState.imgId !== this.state.imgId) ){ 
        setTimeout(() => this.cardFailHide(prevState), 700)
        this.setState({
          picName : null
        })
      }
    }
  }

  render(){
    console.log(this.state.youWin)
    return(
      <div className = 'w-full inline-flex justify-center flex-col items-center'>
        <YouWin areYouWinner = {this.state.youWin}/>
        {this.state.allMixImg.length !== 0
          ?<ul className = " inline-flex flex-wrap p-0 mx-0 mb-8 w-3/6 justify-center">
            {this.state.allMixImg.map((item,index) =>(
              <li className = "list-none w-3/12 mx-5 my-5 relative" key = {index}>
                <ImgContainer 
                  srcUrl = {item.src}
                  altName = {item.name}       
                  showState = {item.show}
                  imgName = {(picName) => this.getNameImg(picName, index )}                   
                />
              </li>
            ))}
          </ul>
          :<h2 className = "text-2xl font-bold mb-10">Aun no inicias</h2>
        }
        <CardsBtn 
          youWin = {this.state.youWin} 
          btnText = {this.state.allMixImg.length !== 0 ? 'Nuevo Juego' : 'Start'}
          imgArrGet = {(imgArr) => this.getArrImg('allMixImg',imgArr)}
        />
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    return(
      <div className = " inline-flex flex-col w-full justify-center">
        <h1 className = "text-center mb-12 font-bold text-3xl">Hello world</h1>
        <CardsContainer />
      </div>
    )
  }
}

export default App;

