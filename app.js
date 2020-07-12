document.addEventListener('DOMContentLoaded',()=>{

    const grid = document.querySelector('grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

     //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


  let currentPosition = 4
  let currentRotation = 0
  // randomly selecting tetromino and showing 1st rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]
  let nextRandom = 0

  //draw tetromino
  function draw(){
      current.forEach(index => {
          squares[currentPosition + index].classList.add('tetromino')
      })
  }
//undraw teromino
  function undraw(){
      current.forEach( index =>{
        squares[currentPosition + index].classList.remove('tetromino')
      })
  }

  //draw()

  //make tetromino move down

  timerId = setInterval(moveDown,100)

  //function to move tetromino acording to keys
  function control(e){
    if(e.keyCode===37){
      moveLeft()
    }
    else if(e.keyCode===38){
      //rotate
      rotate()
    }
    else if(e.keyCode===39){
      //moveright
      moveRight()
    }
    else if(e.keyCode===40){
      //movedown
    }
  }

  document.addEventListener('keyup',control)

  function moveDown(){
      undraw()
      currentPosition+=width
      draw()
      freeze()
  }

  //freeze function -> to take care of tetromino that has reached the bottom of the screen

  function freeze(){
      if(current.some(index=> squares[currentPosition+index+width].classList.contains('taken'))){
        
        
        current.forEach(index=> squares[currentPosition+index].classList.add('taken'))

        // again start a new tetromino
        random = nextRandom
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
      }

  }

  // function to move tetromino left till the boundary

  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index=> (currentPosition+index) % width ===0)
    if (!isAtLeftEdge)
      currentPosition-=1

    if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
      currentPosition+=1
    }

    draw()
  }

  // function to move tetromino right till the boundary

  function moveRight(){
    undraw()
    const isAtRightEdge = current.some(index=> (currentPosition+index) % width ===  width-1)
    if (!isAtRightEdge)
      currentPosition+=1

    if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
      currentPosition-=1
    }

    draw()
  }

  function rotate(){
    undraw()
    currentRotation = (currentRotation+1) % 4
    current = theTetrominoes[random][currentRotation]
    draw() 
  }



  //show next tetromino in mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  // tetrominos without rotation
  const upNextTetromino =[
    [1,displayWidth+1,displayWidth+2,displayWidth*2 +2], //lTetromino
    [0,displayWidth,displayWidth+1,displayWidth*2+1], //zTetromino
    [1,displayWidth,displayWidth+1,displayWidth+2],//tTetromino
    [0,1,displayWidth,displayWidth+1], //oTetromino,
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] //iTetromino
  ]

  //display tetromino in minigrid

  function displayShape(){
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })

    upNextTetromino[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }
})