<template>
  <div>
    <div class="user_header">
      <div><strong>首页</strong>/应用管理/用户管理</div>
      <el-input v-model="name" placeholder="姓名"></el-input>

      <el-button size="small" type="primary" @click="userSearch"
        >查询</el-button
      >
      <el-button size="small" type="primary" @click="userAdd">新增</el-button>
    </div>
    <div class="user_main">
      <template>
        <el-table
          ref="userTable"
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="userSelect"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" label="#" width="50" prop="id">
          </el-table-column>
          <el-table-column label="姓名" width="120" prop="name">
          </el-table-column>
          <el-table-column label="性别" width="120" prop="sex">
            <template slot-scope="scope">
              {{ scope.row.sex ? "女" : "男" }}
            </template>
          </el-table-column>
          <el-table-column label="年龄" width="120" prop="age">
          </el-table-column>
          <el-table-column label="生日" width="120" prop="birthday">
          </el-table-column>
          <el-table-column label="地址" prop="address"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="userEdit(scope.row)"
                type="default"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="userDel(scope.row.id)"
                type="danger"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="danger"
          size="small"
          @click="userDelAll()"
          style="margin-top: 20px"
          >批量删除</el-button
        >
        <el-pagination
          style="margin-top: 20px; float:right;"
          layout="prev, pager, next"
          :total="total"
          :page-size="pagesize"
          :current-page="pageno"
          @current-change="pageChange"
        >
        </el-pagination>
      </template>
    </div>
    <UserAddEdit
      v-if="ishow"
      :value="value"
      :state="state"
      @close="close"
    ></UserAddEdit>
  </div>
</template>

<script>
import UserAddEdit from "./UserAddEdit";
export default {
  name: "User",
  components: {
    UserAddEdit,
  },
  data() {
    return {
      state: "", //判断是编辑或新增
      ishow: false, //判断编辑/弹出框是否出现
      userList: [], //用户数据
      userSelectList: [], //选中的用户ID
      name: "", //根据用户名查询
      pageno: 1, //要查询的页码
      pagesize: 10, //每一页显示多少条数据
      total: 0, //一共有多少条用户数据
      value: "", //回显使用的数据
    };
  },
  mounted() {
    this.initUserList();
  },
  methods: {
    //初始化用户数据
    async initUserList() {
      let res = await this.$http.post("/api/user/list", {
        name: this.name,
        pageno: this.pageno,
        pagesize: this.pagesize,
      });
      this.userList = res.data.list;
      this.total = res.data.total;
      //   console.log(res);
      //   console.log(this.userList);
    },
    //拿到选中的用户的ID
    userSelect(user_list) {
      //   console.log(e);
      let ids = [];
      user_list.forEach(function(item) {
        ids.push(item.id);
      });
      this.userSelectList = ids;
    },
    //搜索功能(点击搜索键)
    userSearch() {
      this.initUserList();
    },
    userAdd() {
      this.state = "新增";
      this.ishow = true;
    },
    userEdit(value) {
      this.value = value;
      console.log(value);
      this.state = "编辑";
      this.ishow = true;
    },
    //删除单个用户
    userDel(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$http.get("/api/user/del", { params: { id } });
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.initUserList();
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      });
    },
    //批量删除用户
    userDelAll() {
      this.$confirm("确定全部删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$http.post("/api/user/batchdel", {
          ids: this.userSelectList,
        });
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.initUserList();
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      });
    },
    //分页功能(点击分页键)
    pageChange(curPage) {
      this.pageno = curPage;
      this.initUserList();
    },
    close() {
      this.ishow = !this.ishow;
    },
  },
};
</script>

<style lang="scss" scoped>
.user_header {
  .el-input {
    width: 200px;
    margin: 15px 15px 15px 0;
  }
}
</style>
