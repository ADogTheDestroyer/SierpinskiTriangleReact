import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// renders everything in a single root element
function renderAll(quantity) {
  let key = 0;
  root.render(
    <div>
      <div id="formContainer">
        <NumDotsForm/>
      </div>
      
      {
        generateDots(quantity).map(dot => 
          <div key={"dot" + key++}>{dot}</div> // React requires that each element of a list has a unique key
        )
      }
    </div>
  );
}

// checks if a point is within the area of the triangle
function pointIsValid(xPos, yPos) {
  const fr = (-33/25) * xPos + 132; //function of the right side of the triangle
  const fl = (33/25) * xPos;        //function of the left side of the triangle

  if(xPos >= 50) { //check which side of the triangle the point is on
    return yPos < fr;
  } else {
    return yPos < fl;
  }
}

// generates the a random point within the area of the triangle
function calculateFirstPoint() {
  let xPos;
  let yPos;
  do {
    xPos = Math.floor(Math.random() * 50) + 25;
    yPos = Math.floor(Math.random() * 33) + 33;
  } while (!pointIsValid(xPos, yPos));

  return [xPos, yPos];
}

// calculates the next point to plot, ie the mid point between a randomly
// chosen corner point, and the previous plotted point
function calculateNextPoint(point) {
  let xPos = point[0];
  let yPos = point[1];

  // picks one of the three corners at random
  let trianglePoint = Math.floor(Math.random() * 3) + 1;

  // returns the midpoint between 'point' and the randomly chosen corner point
  switch(trianglePoint) {
    case 1: // top corner @(50, 66)
      return [(50+xPos)/2, (66+yPos)/2];

    case 2: // right bottom corner @(75, 33)
      return [(75+xPos)/2, (33+yPos)/2];

    default: // left bottom @(25, 33)
      return [(25+xPos)/2, ((33+yPos)/2)];
  }
}

// generates the html of all the dots, which will be rendered in drawTriangle()
function generateDots(quantity) {  
  var dots = [];

  //the three corners of the triangle
  dots.push(<div id='top'></div>);
  dots.push(<div id='right'></div>);
  dots.push(<div id='left'></div>);

  let point, xPos, yPos, setPoint;
  point = calculateFirstPoint();

  for (var i = 0; i < quantity; i++) {
    if(i > 0) {
      point = calculateNextPoint(point);
    }
    xPos = point[0].toFixed(2); // two decimal points for precision sake
    yPos = point[1].toFixed(2);

    setPoint = { // sets the location of the point
      position: "absolute",
      left: xPos+"vh",
      bottom: yPos+"vh"
    }
    dots.push(<div className='dot' style={setPoint}></div>);
  }
  return dots;
}

// this is the text form so the use can enter how many dots they want the
// app to draw, then re-renders everything
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
    renderAll(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter the number of dots to be draw: 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Draw" />
      </form>
    );
  }
}

renderAll();