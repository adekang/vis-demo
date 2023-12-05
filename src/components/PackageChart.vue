<script setup>
import {onMounted, ref,getCurrentInstance } from "vue";
import * as d3 from 'd3'; // 引入D3.js库
import dataJson from '../../public/data.json';
import {useElementSize} from "@vueuse/core";

const container = ref(null);
const {width, height} = useElementSize(container)
const emit = getCurrentInstance().emit; // 获取 emit 方法

onMounted(() => {
  // 在组件挂载后，初始化和绘制图表
  drawChart(container.value);
});


function drawChart(container) {
  const margin = {top: 10, right: 10, bottom: 10, left: 10}
  //  TODO 一定要是一个正方形的容器
  const widthEl = height.value;
  const heightEl = height.value;


  const color = d3.scaleLinear()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

  // Compute the layout.
  const pack = data => d3.pack()
      .size([widthEl, heightEl])
      .padding(3)
      (d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value));


  const root = pack(dataJson);

  // Create the SVG container.
  const svg = d3.select(container)
      .append("svg")
      .attr("viewBox", `-${widthEl / 2} -${heightEl / 2} ${widthEl} ${heightEl}`)
      .attr("width", widthEl)
      .attr("height", heightEl)

  // Append the nodes.
  const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")
      // .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on("click", (event, d) => {
        if (!d.children) { // 检查是否为叶子节点
          const selectedName = d.data.name;
          emit('circleSelected', selectedName);
          event.stopPropagation(); // 阻止事件传播
          return; // 如果是叶子节点，执行完传值操作后退出函数
        }

          focus !== d && (zoom(event, d), event.stopPropagation());
        // 剩余的放大缩小操作

      });


  // Append the text labels.
  const label = svg.append("g")
      // .style("font", "40px Arial")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

  label.filter(d => d.r) // Filter nodes with radius property
      .style("font", d => `${Math.min(d.r * 2, 20)}px Arial`);

  // Create the zoom behavior and zoom immediately in to the initial focus node.
  svg.on("click", (event) => zoom(event, root));
  let focus = root;
  let view;
  zoomTo([focus.x, focus.y, focus.r * 2]);

  function zoomTo(v) {
    const k = widthEl / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {



    focus = d;
    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });



    label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });


    // if (!d.children) {
    //   console.log(123)
    //   const selectedName = d.data.name;
    //   console.log(d.data.name);
    //   emit('circleSelected', selectedName);
    //   return; // 如果是叶子节点，退出函数
    // }


  }

  return svg.node();
}
</script>

<template>
  <div ref="container" class="dd"></div>
</template>

<style lang="css">
.dd {
  width: 100%;
  height: 100%;
}
</style>
