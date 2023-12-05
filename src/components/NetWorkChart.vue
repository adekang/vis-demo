<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {onMounted, ref, toRefs, watch} from "vue"
import * as echarts from 'echarts'
import graph from '../../public/les-miserables.json'

// 1. 创建echarts实例
let mChart = null;
const target = ref(null)

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})
const {category} = toRefs(props)
watch(()=>category.value, async (newVal) => {
  // const res = await findAllByCategory(newVal)
  // wordData.value = res.data
  // renderChart()
})

onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2. 构建 option 配置对象
const renderChart = () => {
  graph.nodes.forEach(function (node) {
    node.label = {
      show: node.symbolSize > 30
    };
  });

  const options = {
    title: {
      text: '网络图',
      top: 'top',
      left: 'left'
    },
    tooltip: {},
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        })
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
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

  // 3. 通过 实例.setOptions(option) 方法加载配置
  mChart.setOption(options)
  window.addEventListener('resize', () => {
    myChart.resize()

  })
}

</script>
<style lang="scss" scoped>

</style>
