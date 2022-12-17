import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function drawTriangle(quantity) {
  let key = 0;
  root.render(
    <div>
      <NumDotsForm/>
      {generateDots(quantity).map(dot => 
        <div key={"dot" + key++}>{dot}</div>
      )}
      
    </div>
  );
}

function pointIsValid(xPos, yPos) {
  const fr = (-33/25) * xPos + 132;
  const fl = (33/25) * xPos;

  if(xPos >= 50) {
    return yPos < fr;
  } else {
    return yPos < fl;
  }
}

function generateFirstPoint() {
  let xPos;
  let yPos;
  do {
    xPos = Math.floor(Math.random() * 50) + 25;
    yPos = Math.floor(Math.random() * 33) + 33;
  }while (!pointIsValid(xPos, yPos));

  return [xPos, yPos];
}

function generateDots(quantity) {  
  var dots = [];

  //triangle container
  dots.push(<div id='top'></div>);
  dots.push(<div id='right'></div>);
  dots.push(<div id='left'></div>);

  let point, xPos, yPos, setPoint;
  point = generateFirstPoint();

  for (var i = 0; i < quantity; i++) {
    if(i > 0) {
      point = calculateNextPoint(point);
    }
    xPos = point[0].toFixed(2);
    yPos = point[1].toFixed(2);

    setPoint = {
      position: "absolute",
      left: xPos+"vh",
      bottom: yPos+"vh"
    }
    dots.push(<div className='dot' style={setPoint}></div>);
  }
  return dots;
}

function calculateNextPoint(point) {
  let xPos = point[0];
  let yPos = point[1];

  let trianglePoint = Math.floor(Math.random() * 3) + 1;

  switch(trianglePoint) {
    case 1: // top -> (50, 66)
      return [(50+xPos)/2, (66+yPos)/2];

    case 2: // right -> (75, 33)
      return [(75+xPos)/2, (33+yPos)/2];

    default: // left -> (25, 33)
      return [(25+xPos)/2, ((33+yPos)/2)];
  }
}

class NumDotsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    drawTriangle(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter the number of dots to be draw: 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

drawTriangle();