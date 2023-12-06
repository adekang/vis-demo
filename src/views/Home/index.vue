<script setup>
import {ref} from "vue";
import PackageChart from "@/components/PackageChart.vue";
import NetWorkChart from "@/components/NetWorkChart.vue";
import WordChart from "@/components/WordChart.vue";
import PaperListCard from "@/components/PaperListCard.vue";
import HighChart from "@/components/HighChart.vue";
import RoseTypeChart from "@/components/RoseTypeChart.vue";

const selectedPackageData = ref('')// Package图选中的数据
const handlePackageSelected = (data) => {
  selectedPackageData.value = data
  console.log("气泡图选择的类别::", selectedPackageData.value)
}

const name = ref('')
const handleSelectByName = (data) => {
  console.log("网络图选择的名字::", data)
  name.value = data
}

</script>


<template>
  <div class="main-container">
    <div class="left-container">
      <div class="bubble-container item">
        <PackageChart @circleSelected="handlePackageSelected"/>
      </div>
      <div class="word-container item">
        <WordChart :category="selectedPackageData"/>
      </div>
    </div>

    <div class="right-container">
      <div class="top-container net-container item">
        <NetWorkChart :category="selectedPackageData" @selectByName="handleSelectByName"/>
      </div>
      <div class="bottom-container">
        <div class="search-container item">
          <HighChart  :category="selectedPackageData"/>

        </div>
        <div class="high-container item">
          <RoseTypeChart :name="name"/>

        </div>
        <div class="paper-container item">
          <PaperListCard :category="selectedPackageData"/>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>

</template>


<style lang='scss' scoped>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.item {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}


.left-container {
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;

  .bubble-container {
    aspect-ratio: 1 / 1;
    width: 100%;
  }

  .word-container {
    width: 100%;
    flex: 1;
  }
}

.right-container {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-container {
    width: 100%;
    height: 50%;

  }

  .bottom-container {
    display: flex;
    height: 50%;


    .search-container {
      flex: 1;
      height: 100%;
    }

    .high-container {
      flex: 1;
      height: 100%;
    }

    .paper-container {
      flex: 1;
      height: 100%;
    }
  }
}


</style>
