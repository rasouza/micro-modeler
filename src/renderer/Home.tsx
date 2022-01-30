import { Affix, Button } from '@mantine/core';
import { HomeIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

export default function Home() {
  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#area')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background', 'white')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // eslint-disable-next-line promise/catch-or-return
    const jsonData = d3
      .json(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json'
      )
      .then((data: any) => {
        // Initialize the links
        const link = svg
          .selectAll('line')
          .data(data.links)
          .join('line')
          .style('stroke', '#aaa');

        // Initialize the nodes
        const node = svg
          .selectAll('circle')
          .data(data.nodes)
          .join('circle')
          .attr('r', 20)
          .style('fill', '#69b3a2');

        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
          link
            .attr('x1', function (d) {
              return d.source.x;
            })
            .attr('y1', function (d) {
              return d.source.y;
            })
            .attr('x2', function (d) {
              return d.target.x;
            })
            .attr('y2', function (d) {
              return d.target.y;
            });

          node
            .attr('cx', function (d) {
              return d.x + 6;
            })
            .attr('cy', function (d) {
              return d.y - 6;
            });
        }

        // Let's list the force we wanna apply on the network
        d3.forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
          .force(
            'link',
            d3
              .forceLink() // This force provides links between nodes
              .id(function (d) {
                return d.id;
              }) // This provide  the id of a node
              .links(data.links) // and this the list of links
          )
          .force('charge', d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
          .force('center', d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
          .on('end', ticked);
        return '';
      });
  }, []);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Button>
          <HomeIcon size={24} />
        </Button>
        <Button>
          <HomeIcon size={24} />
        </Button>
      </Affix>
      <div id="area" />
    </div>
  );
}
