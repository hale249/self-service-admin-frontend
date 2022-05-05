<template>
  <a-modal :visible="visible" title="Modal using refs" centered :maskClosable="false" @cancel="cancel">
    <a-form-model id="form-modal-ref" ref="formModalRef" :model="form" :rules="rules" layout="vertical" @submit.prevent="onSubmit">
      <a-form-model-item label="Name">
        <a-input v-model="form.name" placeholder="Typing name..."/>
      </a-form-model-item>

      <a-form-model-item label="Email">
        <a-input v-model="form.email" placeholder="Typing email..."/>
      </a-form-model-item>
    </a-form-model>

    <template slot="footer">
      <a-button key="back" @click="cancel">
        Cancel
      </a-button>
      <a-button html-type="submit" form="form-modal-ref" type="primary" :loading="loading">
        Save
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'ModalRef',

  data() {
    return {
      visible: false,
      loading: false,
      form: {
        name: undefined,
        email: undefined,
      },

      rules: {
        name: [
          {required: true, message: 'Name field is required'}
        ],
        email: [
          {required: true, message: 'Email field is required'}
        ],
      },
    };
  },

  watch: {},

  methods: {
    onSubmit() {
      this.loading = true;
      this.$emit('emitUser', this.form);
    },

    cancel() {
      this.$refs.formModalRef.resetFields();
      this.visible = false;
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>
