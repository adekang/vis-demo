<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {ref, onMounted, watch} from "vue"
import * as echarts from 'echarts'
import dataJson from '../../public/life-expectancy-table.json';
// 1. 创建echarts实例
let mChart = null;
const target = ref(null)

onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2. 构建 option 配置对象
const renderChart = () => {
  const countries = [
    'Finland',
    'France',
    'Germany',
    'Iceland',
    'Norway',
    'Poland',
    'Russia',
    'United Kingdom'
  ];
  const datasetWithFilters = [];
  const seriesList = [];


  echarts.util.each(countries, function (country) {
    let datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params) {
          return params.value[3] + ': ' + params.value[0];
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'Year',
        tooltip: ['Income']
      }
    });
  });

  const options = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: dataJson
      },
      ...datasetWithFilters
    ],
    title: {
      text: '高产作者'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Income'
    },
    grid: {
      right: 140
    },
    series: seriesList
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
