<template>
  <a-row type="flex" justify="center">
    <a-col :span="20" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 7 }" :xxl="{ span: 5 }">
      <a-spin :spinning="loading" size="large">
        <a-card>
          <Logo type="icon-only" width="50" class="text-center" />

          <h2 class="text-center mb-6">
            Self service admin
          </h2>

          <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
            <a-form-model-item style="padding-bottom: 1rem">
              <a-input
                v-decorator="[
                  'username',
                  {
                    rules: [{ required: true, message: 'Vui lòng nhập username!' }]
                  }
                ]"
                placeholder="Username"
                name="username"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>

            <a-form-model-item style="padding-bottom: 1rem">
              <a-input-password
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
                  }
                ]"
                type="password"
                placeholder="Mật khẩu"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input-password>
            </a-form-model-item>

            <a-form-model-item class="text-center" style="padding-bottom: 1rem">
              <a-button type="primary" html-type="submit" class="w-1/2">
                Đăng nhập
              </a-button>
            </a-form-model-item>
          </a-form>
        </a-card>
      </a-spin>
    </a-col>
  </a-row>
</template>

<script>
import Logo from '~/components/Layouts/Logo.vue';

export default {
  layout: 'public',
  components: {
    Logo
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },

  data() {
    return {
      loading: false
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields(async (err, data) => {
        if (!err) {
          try {
            this.loading = true;
            let response = await this.$auth.loginWith('local', { data });

            this.loading = false;
          } catch (err) {
            this.loading = false;
            this.$message.error('Đăng nhập không thành công');
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
