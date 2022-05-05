<template>
  <a-layout style="min-height: 100vh">
    <Sider @collapse="collapsed = $event" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" />

    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px', transition: 'all 0.2s' }">
      <a-layout-header>
        <a-dropdown>
          <div class="d-flex align-items-center cursor-pointer">
            <a-avatar :size="24" icon="user" style="margin-right: 8px" />
            {{ $auth.user.username }}
          </div>

          <a-menu slot="overlay">
            <a-menu-item @click="{}">
              <a-icon type="user" />
              <span>Profile</span>
            </a-menu-item>
            <a-menu-item @click="{}">
              <a-icon type="setting" />
              <span>Cài đặt</span>
            </a-menu-item>
            <a-menu-item @click="$auth.logout()">
              <a-icon type="logout" />
              <span>Đăng xuất</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>

      <a-layout-content class="m-6">
        <a-config-provider :locale="locale">
          <nuxt />
        </a-config-provider>
      </a-layout-content>

      <a-layout-footer class="text-center"> Powered by Self service admin </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Sider from '~/components/Layouts/Sider.vue';
import locale from '~/lang/ant-design-vue/vi.js';

export default {
  components: {
    Sider,
  },

  data() {
    return {
      locale,
      collapsed: false,
    };
  },

  computed: {},
};
</script>

<style lang="scss" scoped></style>
