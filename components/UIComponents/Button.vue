<template>
  <a-card title="Component Button">
    <a-button type="primary" @click="showModalProp">
      Modal prop
    </a-button>
    <a-button type="danger" @click="showModalRef">
      Modal ref
    </a-button>

    <a-button @click="showModalFetchAPI">
      Modal Fetch API
    </a-button>

    <Modal ref="userModal" mask="{false}" :user="user" @emitUser="emitUser"/>
    <ModalRef ref="userModalRef" mask="{false}" :user="user" @emitUser="emitUser"/>
    <ModalFetchAPI ref="formModalFetchAPI" mask="{false}"/>
  </a-card>
</template>
<script>

import Modal from '~/components/UIComponents/Modal/Modal.vue';
import ModalRef from '~/components/UIComponents/Modal/ModalRef.vue';
import ModalFetchAPI from '~/components/UIComponents/Modal/ModalFetchAPI.vue';

export default {
  name: 'Button',
  components: {
    Modal,
    ModalRef,
    ModalFetchAPI
  },

  data() {
    return {
      user: {
        name: 'Alex',
        email: 'alex@gmail.com',
        age: 23
      }
    }
  },

  methods: {
    showModalProp() {
      this.$refs.userModal.visible = true;
    },

    showModalRef() {
      this.$refs.userModalRef.visible = true;
      this.$nextTick(() => {
        Object.assign(this.$refs.userModalRef.form, {...this.user});
      });
    },

    showModalFetchAPI() {
      this.$refs.formModalFetchAPI.visible = true;
    },

    emitUser(value) {

    }
  }
}
</script>

<style scoped>

</style>
