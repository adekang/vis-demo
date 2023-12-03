<script setup>
import PackageChart from "@/components/PackageChart.vue";
</script>


<template>
  <div class="main-container">
    <div class="top-container">
      <div class="bubble-container">
        <PackageChart/>
      </div>

      <div class="net-container">
      </div>
    </div>

    <div class="bottom-container">
      <div class="word-container"></div>
      <div class="high-container"></div>
      <div class="paper-container"></div>
    </div>
    <div>
    </div>
  </div>

</template>


<style lang='scss' scoped>
.main-container {
  border: 1px solid red;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-container {
  border: 1px solid red;
  width: 100%;
  height: 50%;
  display: flex;

  .bubble-container {
    border: 1px solid pink;
    width: 40%;
    height: 100%;
  }


  .net-container {
    border: 1px solid pink;
    width: 60%;
    height: 100%;
  }


}

.bottom-container {
  border: 1px solid red;
  width: 100%;
  height: 50%;
  display: flex;

  .word-container {

    border: 1px solid pink;
    width: 40%;
    height: 100%;
  }

  .high-container {
    border: 1px solid pink;
    width: 40%;
    height: 100%;
  }

  .paper-container {
    border: 1px solid pink;
    width: 20%;
    height: 100%;
  }
}

</style>
