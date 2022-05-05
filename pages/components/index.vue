<template>
  <a-card title="Define base components" style="min-height: 50vh">
    <a-row :gutter="[16,16]">
      <a-col :span="12">
        <Form />
      </a-col>
      <a-col :span="12">
        <Modal />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import Form from '~/components/UIComponents/Form.vue';
import Modal from '~/components/UIComponents/Button.vue';
export default {
  name: 'index',
  components: {
    Form,
    Modal,
  }
}
</script>

<style scoped>

</style>
