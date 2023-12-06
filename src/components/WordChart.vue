<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {onMounted, ref, toRefs, watch} from "vue"
import * as echarts from 'echarts'
import 'echarts-wordcloud';
import {findAllByCategory} from "@/services/index.js";

const wordData = ref()

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})
const {category} = toRefs(props)
watch(()=>category.value, async (newVal) => {
  const res = await findAllByCategory(newVal)
  wordData.value = res.data
  renderChart()
})


// 1. 创建echarts实例
let mChart = null;
const target = ref(null)
onMounted(async () => {
  mChart = echarts.init(target.value)


  // const res = await findAllByCategory("Statistics")
  // wordData.value = res.data
  // renderChart()
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
