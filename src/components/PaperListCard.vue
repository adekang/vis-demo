<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>


<script setup>
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
</script>


<style>
.ant-list-item{
  border: 1px solid transparent;
  transition: 0.25s;
}
.ant-list-item:hover{
  border-color: #4096ff;
}
</style>
