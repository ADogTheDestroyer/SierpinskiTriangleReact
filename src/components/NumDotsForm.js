import React from 'react';
import '../index.css';

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
    event.preventDefault();
    this.props.renderAll(this.state.value);
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

export default NumDotsForm;