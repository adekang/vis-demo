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
          <HighChart :category="selectedPackageData"/>
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
$borderWidth: 15px;

.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.item {
  padding: $borderWidth;
  outline-offset: 2px;
  outline: RGB(253, 126, 50) solid 1px;
  border-width: 1px;
  border-radius: 4px;
  box-shadow: rgba(253, 126, 20, 0.2) 0px 7px 29px 0px;
}


.left-container {
  padding: $borderWidth;
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;

  .bubble-container {
    aspect-ratio: 1 / 1;
    width: 100%;
  }

  .word-container {
    margin-top: $borderWidth;
    width: 100%;
    flex: 1;
  }
}

.right-container {
  padding: $borderWidth $borderWidth $borderWidth 0;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-container {
    width: 100%;
    height: 60%;
  }

  .bottom-container {
    margin-top: $borderWidth;
    display: flex;
    height: 40%;


    .search-container {
      margin-right:$borderWidth;
      flex: 1;
      height: 100%;
    }

    .high-container {
      margin-right: $borderWidth;
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
