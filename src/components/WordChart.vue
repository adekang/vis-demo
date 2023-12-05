<template>
  <div ref="target" style="width: 80%;height: 80%;"></div>
</template>

<script setup>
import {ref, onMounted, watch} from "vue"
import * as echarts from 'echarts'
import 'echarts-wordcloud';
import data from '../../public/FeHelper-20221225225857.json'
import {findAllByCategory} from "@/services/index.js";

const wordData = ref()

// 1. 创建echarts实例
let mChart = null;
const target = ref(null)
onMounted(async () => {
  const res = await findAllByCategory("Statistics")
  console.log(res)
  wordData.value = res.data
  mChart = echarts.init(target.value)
  renderChart()
})
// 2. 构建 option 配置对象
const renderChart = () => {
  const options = {
    tooltip: {},
    series: [{
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      rotationRange: [-90, 90],
      shape: 'pentagon',
      width: 600,
      height: 400,
      drawOutOfBound: true,
      textStyle: {
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: wordData.value
    }]
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
