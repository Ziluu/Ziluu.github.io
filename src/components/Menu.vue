<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-submenu
            v-for="item in initNav($router.options.routes)"
            :key="item.meta.id"
            :index="item.meta.id"
          >
            <template slot="title">
              <i :class="item.meta.iconclass"></i>
              <span>{{ item.meta.name }}</span>
            </template>
            <el-menu-item
              @click="NavSelect(citem.path)"
              v-for="citem in initNav(item.children)"
              :key="citem.meta.id"
              :index="citem.meta.id"
              :disabled="citem.meta.id > 4 ? true : false"
            >
              <i :class="citem.meta.iconclass"></i>
              <span>{{ citem.meta.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: "Menu",
  methods: {
    // NavOpen(key, keyPath) {
    //   //   console.log(key, keyPath);
    // },
    // NavClose(key, keyPath) {
    //   //   console.log(key, keyPath);
    // },
    NavSelect(indexPath) {
    this.$router.push(indexPath);
    },
    initNav(items) {
      //   console.log(items.filter((item) => item.meta));
      return items.filter((item) => item.meta);
    },
  },
  created() {
    // console.log(this.$router.options);
  },
};
</script>

style.<style lang="scss" scoped>
.tac{
    width: 100%;
    height: 100%;
}
.el-aside {
  color: pink;
}
</style>
