<template>
  <div class="paper-list">
    <div class="input-search">
      <a-input-search
          v-model:value="value"
          placeholder="请输入文章关键字"
          enter-button
          @search="onSearch"
      />
    </div>
    <div class="list">
      <a-list item-layout="horizontal" :data-source="listData">
        <template #renderItem="{ item }">
          <a-list-item @click="showDrawer(item)">
            <a-list-item-meta
                :description="item.authors"
            >
              <template #title>
                <span>{{ item.title }}</span>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>


  <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      title="文章详情"
      placement="right"
      width="35%"
  >
    <div class="right">
      <p class="title">{{ drawerData.title }}</p>
      <p class="author">{{ drawerData.authors }}</p>
      <p class="update">
        {{ drawerData.updateDate }} {{ drawerData.journal }}
      </p>
      <p class="update">
        {{ drawerData.doi }}
      </p>
      <p class="abstract">
        {{ drawerData.paperAbstract }}
      </p>

      <p class="update">
        category: {{ drawerData.categories }}
      </p>
    </div>
  </a-drawer>
</template>


<script setup>
import {ref, toRefs, watch} from "vue";
import {findAllByCategory, selectByCategory} from "@/services/paper.js";

const listData = ref([]);
const open = ref(false);
const value = ref('');

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})
const {category} = toRefs(props)
watch(() => category.value, async (newVal) => {
  const res = await selectByCategory(newVal)
  listData.value = res.data
})


const onSearch = (searchValue) => {
  findAllByCategory(searchValue).then(res => {
    listData.value = res.data
  })
};


const drawerData = ref({})
const showDrawer = (item) => {
  open.value = true;
  drawerData.value = item
};

</script>


<style>
.paper-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
  overflow-y: auto;
}

.ant-list-item {
  border: 1px solid transparent;
  transition: 0.25s;
}

.ant-list-item:hover {
  border-color: #4096ff;
}

.input-search {
  margin: 20px;
}

.title {
  font-size: 20px;
  font-weight: 400;
  text-align: justify;
  padding: 20px 10px 10px;
}

.author {
  font-size: 14px;
  font-weight: 200;
  text-align: left;
  padding: 10px;
  color: rgba(128, 128, 128, 0.7);
}

.update {
  font-size: 14px;
  font-weight: 200;
  text-align: left;
  padding: 0 10px 10px;
  color: rgba(128, 128, 128, 0.7);
}

.abstract {
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
  padding: 20px 10px;
}
</style>
