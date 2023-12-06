<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {onMounted, ref, toRefs, watch} from "vue"
import * as echarts from 'echarts'
import {selectForce} from "@/services/paper.js";

// 1. 创建echarts实例
let myChart = null;
const target = ref(null)
const graph = ref(null)

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})
const {category} = toRefs(props)
watch(() => category.value, async (newVal) => {

  selectForce(newVal).then(res => {
    graph.value = res.data
  })
  renderChart()
  // const res = await findAllByCategory(newVal)
  // wordData.value = res.data
  // renderChart()
})

onMounted(() => {
  myChart = echarts.init(target.value)
  selectForce("cs.CV").then(res => {
    graph.value = res.data
    renderChart()

  })


})
// 2. 构建 option 配置对象
const renderChart = () => {


  const options = {
    width: "90%",
    height: "90%",
    title: {
      text: '网络图',
      top: 'top',
      left: 'left'
    },
    tooltip: {},
    legend: [],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        data: graph.value.node.map(function (node) {
          return {
            x: (Math.random() - 0.5) * 4000,
            y: (Math.random() - 0.5) * 3000,
            id: node.name,
            name: node.name,
            symbolSize: node.value,
            itemStyle: {
            },
          };
        }),
        links:  graph.value.link.map(function (edge) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              width: edge.value * 0.5,
              curveness: 0.2,
              opacity: 0.7,
            },
          };
        }),
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  };

  myChart.on("click", (params) => {
    console.log(params.data);
  });

  // 3. 通过 实例.setOptions(option) 方法加载配置
  myChart.setOption(options)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

</script>
<style lang="scss" scoped>

</style>
