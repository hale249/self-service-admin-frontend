<template>
  <a-card title="Form validate">
    <a-form-model id="form" ref="form" :model="form" :rules="rules" :layout="formLayout" @submit.prevent="onSubmit">
      <a-form-model-item ref="name" label="Name" prop="name">
        <a-input
          v-model="form.name"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
          placeholder="Typing name..."
        />
      </a-form-model-item>
      <a-form-model-item label="Activity zone" prop="region">
        <a-select v-model="form.region" placeholder="Select your zone">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      formLayout: 'horizontal',
      form: {
        name: '',
        region: undefined,
      },

      rules: {
        name: [
          { required: true, message: 'Name field is required', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [{ required: true, message: 'Region field is required', trigger: 'change' }],
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
}
</script>

<style scoped>
</style>
