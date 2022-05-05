<template>
  <a-layout-sider v-model="collapsed" collapsible @collapse="$emit('collapse', $event)">
    <div class="logo-wrapper">
      <nuxt-link to="/">
        <Logo :width="collapsed ? 30 : 120" :type="collapsed ? 'icon-only-white' : 'white'" />
      </nuxt-link>
    </div>

    <a-menu
      theme="dark"
      mode="inline"
      :selectedKeys="selectedKeys"
      :openKeys="open_keys"
      @openChange="(keys) => (open_keys = keys.slice(-1))"
    >
      <template v-for="menu_item in menu">
        <a-sub-menu :key="menu_item.key" v-if="menu_item.submenu">
          <span slot="title">
            <a-icon :type="menu_item.icon" />
            <span>{{ menu_item.name }}</span>
          </span>

          <a-menu-item v-for="sub_item in menu_item.submenu" :key="sub_item.key">
            <nuxt-link :to="sub_item.path">
              <span class="nav-text">{{ sub_item.name }}</span>
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item :key="menu_item.key" v-else>
          <nuxt-link :to="menu_item.path">
            <a-icon :type="menu_item.icon" />
            <span class="nav-text">{{ menu_item.name }}</span>
          </nuxt-link>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import Logo from '~/components/Layouts/Logo.vue';

const renderMenu = (isAdmin) => {
  return [
    {
      key: 'components',
      name: 'Components',
      icon: 'home',
      path: '/components',
    },
  ];
};

export default {
  components: {
    Logo,
  },

  created() {
    this.menu = renderMenu(this.isAdmin);
    this.checkOpenKeys();
  },

  watch: {
    '$route.name': function () {
      this.checkOpenKeys();
    },
  },

  data() {
    return {
      collapsed: false,
      menu: [],
      open_keys: [],
    };
  },

  computed: {
    selectedKeys() {
      for (const menu_item of this.menu) {
        if (menu_item.submenu) {
          for (const sub_menu_item of menu_item.submenu) {
            if (this.$route.name.split('___')[0].startsWith(sub_menu_item.key)) return [sub_menu_item.key];
          }
        } else if (this.$route.name.split('___')[0].startsWith(menu_item.key)) return [menu_item.key];
      }

      return [];
    },
  },

  methods: {
    checkOpenKeys() {
      const route_name = this.$route.name.split('___')[0];
      const menu_item = this.menu.find(
        (menu) => menu.submenu && menu.submenu.map(({ key }) => key).includes(route_name)
      );

      this.open_keys = menu_item ? [menu_item.key] : [];
    },

    onOpenChange(open_keys) {
      this.open_keys = open_keys.slice(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-wrapper {
  height: 48px;
  padding-left: 24px;
  display: flex;
  align-items: center;
}

::v-deep .ant-badge {
  position: absolute;
  right: 16px;
  top: 12px;

  &-count {
    box-shadow: none;
    min-width: 18px;
    height: 18px;
    font-size: 8px;
    line-height: 18px;
  }
}
</style>
