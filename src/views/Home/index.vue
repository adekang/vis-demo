<script setup>
import PackageChart from "@/components/PackageChart.vue";
import NetWorkChart from "@/components/NetWorkChart.vue";
import WordChart from "@/components/WordChart.vue";
import PaperListCard from "@/components/PaperListCard.vue";
</script>


<template>
  <div class="main-container">
    <div class="left-container">
      <div class="bubble-container item">
        <PackageChart/>
      </div>

      <div class="search-container item">

      </div>
    </div>

    <div class="right-container">
      <div class="top-container net-container item">
        <NetWorkChart/>
      </div>
      <div class="bottom-container">
        <div class="word-container item">
          <WordChart/>
        </div>
        <div class="high-container item">
        </div>
        <div class="paper-container item">
          <PaperListCard/>
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

  .search-container {
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


    .word-container {
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
