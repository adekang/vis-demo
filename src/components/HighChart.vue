<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {ref, onMounted, watch, toRefs, getCurrentInstance, defineProps, onBeforeUnmount} from "vue"
import * as echarts from 'echarts'
import dataJson from '../../public/life-expectancy-table.json';
import {getHighChartData, getHighChartIndex} from "@/services/paper.js";
import {useUserStore} from "@/stores/userStore.js";
// 1. 创建echarts实例
let myChart = null;
const target = ref(null)
const authorDatum = ref([])
const graph = ref(null)
const {emit} = getCurrentInstance();
const store = useUserStore()

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})
const {category} = toRefs(props)
watch(() => category.value, async (newVal) => {
  getHighChartIndex(newVal).then(res => {
    authorDatum.value = res.data
    console.log(authorDatum.value)
  })

  getHighChartData(newVal).then(res => {
    graph.value = res.data
    console.log(graph.value)
    renderChart()
  })

  // const res = await findAllByCategory(newVal)
  // wordData.value = res.data
  // renderChart()
})

onMounted(() => {
  renderChart();
  // myChart = echarts.init(target.value)

})
// 2. 构建 option 配置对象
const renderChart = () => {
  if (myChart) {
    // 如果图表实例存在，则在创建新实例之前将其销毁
    myChart.dispose();
  }
  myChart = echarts.init(target.value);

  const countries = authorDatum.value

  const datasetWithFilters = [];
  const seriesList = [];


  echarts.util.each(countries, function (name) {
    let datasetId = 'dataset_' + name;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            // { dimension: 'Month', gte: 1950 },
            {dimension: 'Name', '=': name}
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: name,
      endLabel: {
        show: true,
        formatter: function (params) {
          const valueToEmit = params.value[1];
          emit('endLabelClick', valueToEmit);
          return params.value[1] + ': ' + params.value[0];//索引在第二个而不是第四个 改了
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Month',
        y: 'Value',
        label: ['Name', 'Value'],
        itemName: 'Month',
        tooltip: ['Value']
      }
    });
  });

  const options = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: graph.value//修改的数据
      },
      ...datasetWithFilters
    ],
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      name: '发表论文量'
    },
    grid: {
      right: 140
    },
    series: seriesList
  };

  myChart.on("click", (params) => {
    console.log("发表论文量::", params.data[1])
    store.token = params.data[1]
  });


  // 3. 通过 实例.setOptions(option) 方法加载配置
  myChart.setOption(options)
  window.addEventListener('resize', resized)
}

const resized = () => {
  myChart.resize()
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resized)
  myChart.value?.dispose()
  myChart.value = null
})
</script>
<style lang="scss" scoped>

</style>
