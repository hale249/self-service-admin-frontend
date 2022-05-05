<template>
  <a-tooltip :visible="hovered" @visibleChange="handleHoverChange">
    <template slot="title">
      sao chép
    </template>

    <a-tooltip
      trigger="click"
      :visible="clicked"
      @visibleChange="handleClickChange"
    >
      <template slot="title">
        <a-icon type="check" :style="{ color: '#00c38c' }" /> đã sao chép
      </template>

      <a-button
        type="primary"
        icon="copy"
        size="small"
        @click="copyToClipboard(text)"
      >
      </a-button>
    </a-tooltip>
  </a-tooltip>
</template>

<script>
export default {
  props: ["text"],

  data() {
    return {
      clicked: false,
      hovered: false
    };
  },
  methods: {
    copyToClipboard() {
      var input = document.createElement("input");
      input.setAttribute("value", this.text);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);

      setTimeout(() => {
        this.clicked = false;
      }, 1000);
    },

    handleHoverChange(visible) {
      this.clicked = false;
      this.hovered = visible;
    },
    handleClickChange(visible) {
      this.clicked = visible;
      this.hovered = false;
    }
  }
};
</script>
