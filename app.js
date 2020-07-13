document.addEventListener('DOMContentLoaded',()=>{

    const grid = document.querySelector('grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    let timerId
    let score = 0

    const colors=[
      'orange',
      'red',
      'purple',
      'green',
      'pink'
    ]
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
          squares[currentPosition + index].style.backgroundColor = colors[random]
      })
  }
//undraw teromino
  function undraw(){
      current.forEach( index =>{
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor =''
      })
  }

  //draw()

  //make tetromino move down

  //timerId = setInterval(moveDown,100)

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
      moveDown()
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
        addScore()
        gameOver()
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
      square.style.backgroundColor = ''
    })

    upNextTetromino[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }


  // add functionality to start button
  startBtn.addEventListener('click', () => {
    if (timerId){
      clearInterval(timerId)
      timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown,1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
    }
  })

  //add score
  function addScore(){
    for(let i=0;i<199;i+=width){
        const row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

        if (row.every(index => squares[index].classList.contains('taken'))){
          score+=10
          scoreDisplay.innerHTML = score
          row.forEach(index => {
            squares[index].classList.remove('taken')
            squares[index].classList.remove('tetromino')
            squares[index].style.backgroundColor = ''
          })
          const squaresRemoved = squares.splice(i,width)
          console.log(squaresRemoved)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
    }
  }

  //game over

  function gameOver(){
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
    }
  }
})