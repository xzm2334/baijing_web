<template>
  <div id="app">
    <div class="add" style="float: right">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="addDialog = true"
        >添加分类</el-button
      >
    </div>
    <el-dialog title="添加分类" :visible.sync="addDialog" center>
      <el-form :model="add">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="add.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCategory(add.name)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="序号" prop="id"> </el-table-column>
      <el-table-column label="项目分类" prop="name"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="{}">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openChange(scope.row, dialogFormVisible)"
            >更改</el-button
          >
          <el-dialog title="修改分类" :visible.sync="dialogFormVisible" center>
            <el-form :model="form">
              <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeCategory(id, form.name)"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "category",
  data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      addDialog: false,
      id: "",
      add: {
        name: "",
      },
      form: {
        name: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      axios({
        url: "http://hello-app.test/api/server/categories",
        method: "get",
      })
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openChange(row) {
      (this.dialogFormVisible = true), (this.id = row.id);
    },
    changeCategory(id, name) {
      {
        axios
          .patch("http://hello-app.test/api/server/categories/" + id, {
            name: name,
          })
          .then(() => {
            this.$message("修改成功");
            this.dialogFormVisible = false;
            Object.assign(this.$data.form,this.$options.data().form);
            this.getCategory();
          });
      }
    },
    handleDelete(row) {
      axios
        .delete("http://hello-app.test/api/server/categories/" + row.id)
        .then((response) => {
          console.log(response);
          this.getCategory();
        });
    },
    addCategory(name) {
      axios
        .post("http://hello-app.test/api/server/categories/", { name: name })
        .then(() => {
          this.$message("添加成功");
          this.addDialog = false;
          Object.assign(this.$data.add,this.$options.data().add);
          this.getCategory();
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>