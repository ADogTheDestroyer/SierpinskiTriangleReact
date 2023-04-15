import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Triangle from './components/Triangle';

const root = ReactDOM.createRoot(document.getElementById('root'));

const X = 0, Y = 1; 
var globalTopPoint = [55, 70];
var globalRightPoint = [100, 5];
var globalLeftPoint = [10, 5];

// renders everything in a single root element
function renderAll(quantity) {
  root.render(
    <div>
      <Triangle quantity={quantity} topPoint={globalTopPoint} rightPoint={globalRightPoint} leftPoint={globalLeftPoint}/>
      <div id="formsContainer">
        <PointForm/>
        <NumDotsForm/>
      </div>
    </div>
  )
}

// this is the text form so the use can enter how many dots they want the
// app to draw, then re-renders everything
class NumDotsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '0'};

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
      <div id="forms">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter the number of dots to be draw: <br/>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Draw" />
        </form>
      </div>
    );
  }
}

class PointForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {top: '55, 70', right: '100, 5', left: '10, 5'};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    this.handleSetDefault = this.handleSetDefault.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({top: event.target.value});
  }
  handleChange2(event) {
    this.setState({right: event.target.value});
  }
  handleChange3(event) {
    this.setState({left: event.target.value});
  }

  handleSetDefault(event) {
    event.preventDefault();

    globalTopPoint = [55, 70];
    globalRightPoint = [100, 5];
    globalLeftPoint = [10, 5];

    this.setState({top: '55, 70', right: '100, 5', left: '10, 5'});

    renderAll();
  }

  handleSubmit(event) {
    event.preventDefault();

    globalTopPoint = this.state.top.split(",");
    globalRightPoint = this.state.right.split(",");
    globalLeftPoint = this.state.left.split(",");

    globalTopPoint = [parseInt(globalTopPoint[X]), parseInt(globalTopPoint[Y])];
    globalRightPoint = [parseInt(globalRightPoint[X]), parseInt(globalRightPoint[Y])];
    globalLeftPoint = [parseInt(globalLeftPoint[X]), parseInt(globalLeftPoint[Y])];

    renderAll();
  }

  render() {
    return (
      <div id="forms">
        <form onSubmit={this.handleSubmit}>
          <label>
            Corner Points:<br/>
            <input type="text" value={this.state.top} onChange={this.handleChange1}/> Top<br/>
            <input type="text" value={this.state.right} onChange={this.handleChange2}/> Bottom Right<br/>
            <input type="text" value={this.state.left} onChange={this.handleChange3}/> Bottom Left<br/>
          </label>
          <button type="submit">Set Points</button>
          <button onClick={this.handleSetDefault}>Default</button>
        </form>
      </div>
    );
  }
}

renderAll();