<template>
  <div class="wrapper">
    <div ref="target" style="width: 100%;height: 600px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import * as echarts from 'echarts'

// 1. 创建echarts实例
let mChart = null;
const target = ref(null)

onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2. 构建 option 配置对象
const renderChart = () => {
  const options = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
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
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;


  .target {
    flex: 1;
  }
}
</style>
