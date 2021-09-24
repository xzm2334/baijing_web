<template>
  <div>
    <div class="">
      <div class="add" style="float: right">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addDialog = true"
          >添加轮播图</el-button
        >
      </div>
      <el-dialog title="轮播图表单" :visible.sync="addDialog" center>
        <el-form :model="file">
          <el-form-item label="分类">
            <el-select v-model="file.categories_id" placeholder="请选择分类">
              <el-option
                v-for="(item, id) in categories"
                :key="id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              v-model="file.image_url"
              class="upload-demo"
              action="http://hello-app.test/api/file"
              :on-success="handleSuccess"
              
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="banners" style="width: 100%">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" width="150" height="100" />
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="categories_id"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openChange(scope.row, dialogFormVisible)"
            >更改</el-button
          >
          <el-button size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="轮播图表单" :visible.sync="dialogFormVisible" center>
      <el-form :model="file">
        <el-form-item label="分类">
          <el-select v-model="file.categories_id" placeholder="请选择分类">
            <el-option
              v-for="(item, id) in categories"
              :key="id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            v-model="file.image_url"
            class="upload-demo"
            action="http://hello-app.test/api/file"
            :on-success="handleSuccess"
            
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="change()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
   
      dialogFormVisible: false,
      addDialog: false,
      categories: [],
      banners: [],
      id: "",
      file: {
        image_url: "",
        categories_id: "",
      },
    };
  },
  created() {
    this.getCategory();
    this.getBanners();
  },
  methods: {
    getCategory() {
      axios({
        url: "http://hello-app.test/api/server/categories",
        method: "get",
      }).then((response) => {
        this.categories = response.data;
      });
    },
    getBanners() {
      axios({
        url: "http://hello-app.test/api/server/banners",
        method: "get",
      }).then((response) => {
        this.banners = response.data;
      });
    },
    handleSuccess(file) {
      this.file.image_url = file;
    },
    submitForm() {
      axios
        .post("http://hello-app.test/api/server/banners", {
          image_url: this.file.image_url,
          categories_id: this.file.categories_id,
        })
        .then(() => {
          this.$message("提交成功");
          this.addDialog = false;
          Object.assign(this.$data.file, this.$options.data().file);
          this.getBanners();
        });
    },
    openChange(row) {
      (this.dialogFormVisible = true), (this.id = row.id);
    },
    handleDelete(row) {
      axios
        .delete("http://hello-app.test/api/server/banners/" + row.id)
        .then(() => {
          this.$message("删除成功");
          this.getBanners();
        });
    },
    change() {
      axios
        .patch("http://hello-app.test/api/server/banners/" + this.id, {
          image_url: this.file.image_url,
          categories_id: this.file.categories_id,
        })
        .then(() => {
          this.$message("修改成功");
          this.dialogFormVisible = false;
          Object.assign(this.$data.file, this.$options.data().file);
          this.getBanners();
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>