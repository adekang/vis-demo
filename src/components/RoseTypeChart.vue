<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import * as echarts from 'echarts'
// 1. 创建echarts实例
let myChart = null;
const target = ref(null)

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()
})

// 2. 构建 option 配置对象
const renderChart = () => {
  const options = {
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          {value: 40, name: 'rose 1'},
          {value: 38, name: 'rose 2'},
          {value: 32, name: 'rose 3'},
          {value: 30, name: 'rose 4'},
          {value: 28, name: 'rose 5'},
          {value: 26, name: 'rose 6'},
          {value: 22, name: 'rose 7'},
          {value: 18, name: 'rose 8'}
        ],
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
