import React from 'react';
import '../index.css';

const X = 0, Y = 1; 

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

    this.props.changeTopPoint(55, 70);
    this.props.changeRightPoint(100, 5);
    this.props.changeLeftPoint(10, 5);

    this.setState({top: '55, 70', right: '100, 5', left: '10, 5'});

    this.props.renderAll();
  }

  handleSubmit(event) {
    event.preventDefault();

    const topPoint = this.state.top.split(",");
    const rightPoint = this.state.right.split(",");
    const leftPoint = this.state.left.split(",");

    this.props.changeTopPoint(parseInt(topPoint[X]), parseInt(topPoint[Y]));
    this.props.changeRightPoint(parseInt(rightPoint[X]), parseInt(rightPoint[Y]));
    this.props.changeLeftPoint(parseInt(leftPoint[X]), parseInt(leftPoint[Y]));

    this.props.renderAll();
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

export default PointForm;