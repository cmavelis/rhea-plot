import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max, range } from 'd3-array'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import parse from 'csv-parse'


const getData = (fileName) => {
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

    const stream = parse(data, {
        delimiter: ','
    });
    const output = [];

    stream.on('readable', () => {
        let record;
        while (record = stream.read()) {
            output.push([parseFloat(record[0]), parseFloat(record[1])])
        }
    });

    return output
};


class BarChart extends Component {
   constructor(props){
      super(props);
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node;
      // const data =getData('RHEAtest.csv');
      const data = [[1825, 31753], [1825, 41753], [1825, 51753], [6825, 61753]];
      console.log(data);
      const dataMax = 70000;
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, 500]);
      const xAxis = axisBottom(1825,5000).ticks(100);

    var lineGenerator = line();
    var pathString = lineGenerator(data);

    select(node)
        .selectAll('path')
        .data([1])
        .enter()
        .append('path');

    select(node)
        .selectAll('path')
        .data([1])
        .exit()
        .remove();

    select(node)
        .selectAll('path')
        .attr('d', pathString)
        .style("fill", "none")
        .style("stroke", "steelblue")
    select(node)
        .append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 10 + ")")
        .call(xAxis)
   }

render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default BarChart
