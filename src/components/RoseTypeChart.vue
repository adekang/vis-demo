<template>
  <div ref="target" style="width: 100%;height: 100%;"></div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, toRefs, watch} from "vue"
import * as echarts from 'echarts'
import {selectByCategory, selectByName} from "@/services/paper.js";
import {useUserStore} from "@/stores/userStore.js";
// 1. 创建echarts实例
let myChart = null;
const target = ref(null)
const store = useUserStore()
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const {name} = toRefs(props)
watch(() => name.value, async (newVal) => {
  const res = await selectByName(newVal)
  targetData.value = res.data
  renderChart()
})


const targetData = ref()

onMounted(() => {
  myChart = echarts.init(target.value)
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
        data: targetData.value.map(function (item) {
          return {
            name: item.target,
            value: item.value
          }
        })
      }
    ]
  };

  myChart.on("click", (params) => {
    console.log("name::", params.data);
    store.token = params.data.name
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
