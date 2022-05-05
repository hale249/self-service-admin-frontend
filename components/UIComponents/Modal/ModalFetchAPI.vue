<template>
  <a-modal :visible="visible" title="Modal using fetch api" centered :maskClosable="false" @cancel="cancel">
    <template v-if="isLoading">
      <a-spin />
    </template>
    <template v-else>
      <a-form-model id="form-modal-fetch-api" ref="formModalFetchAPI" :model="form" :rules="rules" layout="vertical"
                    @submit.prevent="onSubmit">
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
        <a-button html-type="submit" form="form-modal-fetch-api" type="primary" :loading="loading">
          Save
        </a-button>
      </template>
    </template>
  </a-modal>
</template>

<script>
import {fetchData} from '@/api/fakeData.js';

export default {
  name: 'ModalFetchAPI',

  data() {
    return {
      visible: false,
      loading: false,
      isLoading: false,
      form: {
        name: undefined,
        email: undefined,
      },
      user: {},
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

  watch: {
    visible(val) {
      if (val) {
        this.fetchData();
      }
    }
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      fetchData().then(response => {
        this.isLoading = false;
        this.user = response.data;
      }).catch(error => {
      })
    },
    onSubmit() {
      this.loading = true;
    },

    cancel() {
      this.$refs.formModalFetchAPI.resetFields();
      this.visible = false;
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>
