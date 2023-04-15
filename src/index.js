import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Triangle from './components/Triangle';
import NumDotsForm from './components/NumDotsForm';
import PointForm from './components/PointForm';

const root = ReactDOM.createRoot(document.getElementById('root'));

var globalTopPoint = [55, 70];
var globalRightPoint = [100, 5];
var globalLeftPoint = [10, 5];

function changeTopPoint(x, y) {
  globalTopPoint = [x, y];
}

function changeRightPoint(x, y) {
  globalRightPoint = [x, y];
}

function changeLeftPoint(x, y) {
  globalLeftPoint = [x, y];
}

// renders everything in a single root element
function renderAll(quantity) {
  root.render(
    <div>
      <Triangle
        quantity={quantity}
        topPoint={globalTopPoint}
        rightPoint={globalRightPoint}
        leftPoint={globalLeftPoint}
      />
      <div id="formsContainer">
        <PointForm
          renderAll={renderAll}
          changeTopPoint={changeTopPoint}
          changeRightPoint={changeRightPoint}
          changeLeftPoint={changeLeftPoint}
        />
        <NumDotsForm renderAll={renderAll} />
      </div>
    </div>
  )
}

renderAll();