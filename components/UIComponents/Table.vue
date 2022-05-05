<template>
  <div>
    <a-table :columns="columns" :data-source="data" @change="handleTableChange"/>
  </div>
</template>

<script>
const columns = [
  {}
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
];
export default {
  name: 'Table',
  data() {
    return {
      columns,
      data,
    };
  },

  methods: {
    handleTableChange() {},
  }
}
</script>

<style scoped>

</style>
