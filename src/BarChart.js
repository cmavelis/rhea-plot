import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { min, max } from 'd3-array'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'

const getJSONData = (fileName) => {
    // populate wordList from adjacent file
    let data = '';
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                data = xhr.responseText;
            }
        }
    };
    xhr.open('GET', fileName, false);
    xhr.send(null);

    return data
};


class BarChart extends Component {
   constructor(props){
       super(props);
       this.createBarChart = this.createBarChart.bind(this);
       this.width = 1000;
       this.height = 500;
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node;
       const data = JSON.parse(getJSONData('RHEAtest.json'));
       const dataQ1Q3 = JSON.parse(getJSONData('RHEAQ1Q3test.json'));

       const xMin = min(dataQ1Q3, (d) => { return d.x });
       const xMax = max(dataQ1Q3, (d) => { return d.x });
       const yMin = min(dataQ1Q3, (d) => { return d.y });
       const yMax = max(dataQ1Q3, (d) => { return d.y });

      const yScale = scaleLinear()
         .domain([yMin, yMax])
         .range([this.height, 0]);
      const xScale = scaleLinear()
         .domain([xMin, xMax])
         .range([0, this.width]);
      let lineJSON = line()
            .x(function(d) { return xScale(d['x'])})
            .y(function(d) { return yScale(d['y'])});
      let pathString = lineJSON(data);
      let pathQ1Q3 = lineJSON(dataQ1Q3);
      const xAxis = axisBottom(xScale);
      const yAxis = axisLeft(yScale);


    select(node)
        .append('path')
        .attr('d', pathQ1Q3)
        .attr("transform", "translate(" + 50 + ",0)")
        .style("fill", "gray")
        .style("opacity", "0.2")
        .style("stroke", "gray");

    select(node)
        .append('path')
        .attr('d', pathString)
        .attr("transform", "translate(" + 50 + ",0)")
        .style("fill", "none")
        .style("stroke", "steelblue");

    select(node)
        .append('g')
        .attr("transform", "translate(50," + this.height + ")")
        .call(xAxis);

   select(node)
        .append('g')
        .attr("transform", "translate(" + 50 + ",0)")
        .call(yAxis)
   }

render() {
      return <svg ref={node => this.node = node}
      width={this.width + 50} height={this.height + 30}>
      </svg>
   }
}
export default BarChart
