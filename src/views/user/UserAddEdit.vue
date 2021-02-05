<template>
  <el-dialog
    :title="state"
    width="60%"
    :visible="true"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="AddEditForm"
      :rules="AddEditRules"
      ref="AddEditForm"
      class="AddEditForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          placeholder="请输入姓名"
          type="text"
          v-model="AddEditForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="AddEditForm.sex" :label="0">男</el-radio>
        <el-radio v-model="AddEditForm.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number
          v-model="AddEditForm.age"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <div class="block">
          <el-date-picker
            v-model="AddEditForm.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="textarea" v-model="AddEditForm.address"> </el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      @click="submitForm(AddEditForm)"
      style="margin-top:100px"
      >确 定
    </el-button>
    <el-button @click="close">取 消</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: ["state", "value"],
  data() {
    return {
      radio: "",
      status: this.status,
      AddEditForm: {
        name: "",
        sex: "",
        age: "",
        birthday: "",
        address: "",
        id:"",
      },
      AddEditRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.state == "编辑") {
      this.AddEditForm.name = this.value.name;
      this.AddEditForm.sex = this.value.sex;
      this.AddEditForm.age = this.value.age;
      this.AddEditForm.birthday = this.value.birthday;
      this.AddEditForm.address = this.value.address;
      this.AddEditForm.id = this.value.id;
    }
  },
  methods: {
    //点击确定按钮
    async submitForm(value) {
      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, // 月份
          "d+": this.getDate(), // 日
          "h+": this.getHours(), // 小时
          "m+": this.getMinutes(), // 分
          "s+": this.getSeconds(), // 秒
          "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
          S: this.getMilliseconds(),
          // 毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      this.AddEditForm.birthday = new Date(value.birthday).Format("yyyy-MM-dd"); //把今天的日期格式化为2012-01-20类型的日期
      //添加模式
      if (this.state == "新增") {
        let res = await this.$http.post("/api/user/add", {
          name: this.AddEditForm.name,
          sex: this.AddEditForm.sex,
          age: this.AddEditForm.age,
          birthday: this.AddEditForm.birthday,
          address: this.AddEditForm.address,
        });
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.close();
          this.$parent.initUserList();
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      }
      //编辑模式
      else if (this.state == "编辑") {
        let res = await this.$http.post("/api/user/update", {
          name: this.AddEditForm.name,
          sex: this.AddEditForm.sex,
          age: this.AddEditForm.age,
          birthday: this.AddEditForm.birthday,
          address: this.AddEditForm.address,
          id: this.AddEditForm.id,
        });
        console.log(res);
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.close();
          this.$parent.initUserList();
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      } else {
        this.$message.error("未知错误，请检查你的网络");
      }
    },
    close() {
      //   console.log("嘤");
      this.$emit("close");
    },
  },
};
</script>

<style></style>
