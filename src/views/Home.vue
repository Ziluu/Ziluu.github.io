<template>
  <el-container class="home-container">
    <el-header>
      <el-dropdown @command="ClickAccount">
        <span class="el-dropdown-link">
          你好<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="b">设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <Menu></Menu>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "../components/Menu";
export default {
  name: "Home",
  components: { Menu },
  methods: {
    ClickAccount(command) {
      if (command == "logout") {
        this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let res = await this.$http.get("/api/user/logout");
          //   console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            //移除session
            sessionStorage.removeItem("username");
            this.$router.push("/login");
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-main{
    background-color: wheat;
}
.el-header {
  text-align: end;
  background-color: #eee;
  color: #333;
  line-height: 60px;
}

.el-dropdown-link {
  cursor: pointer;
  color: deeppink;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
