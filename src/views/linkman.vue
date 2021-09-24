<template>
  <div>
    <div class="">
      <div class="add" style="float: right">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addDialog = true"
          >添加联系人</el-button
        >
      </div>
      <el-dialog title="提交联系人" :visible.sync="addDialog" center>
        <el-form :model="file">
          <el-form-item label="联系人姓名" :label-width="formLabelWidth">
            <el-input v-model="file.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传二维码图片" :label-width="formLabelWidth">
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
          <el-form-item label="联系人技能" :label-width="formLabelWidth">
            <el-input v-model="file.skill" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人职位" :label-width="formLabelWidth">
            <el-input v-model="file.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人所在公司" :label-width="formLabelWidth">
            <el-input v-model="file.company" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话号码" :label-width="formLabelWidth">
            <el-input v-model="file.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="linkman" style="width: 100%">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="二维码">
        <template slot-scope="scope">
          <img :src="scope.row.qr_image" width="75" height="75" />
        </template>
      </el-table-column>
      <el-table-column label="技能" prop="skill"></el-table-column>
      <el-table-column label="职位" prop="position"></el-table-column>
      <el-table-column label="公司" prop="company"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="操作" align="right">
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
    <el-dialog title="更改联系人" :visible.sync="dialogFormVisible" center>
      <el-form :model="file">
        <el-form-item label="联系人姓名">
          <el-input v-model="file.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传二维码图片">
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
        <el-form-item label="联系人技能">
          <el-input v-model="file.skill" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人职位">
          <el-input v-model="file.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人所在公司">
          <el-input v-model="file.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话号码">
          <el-input v-model="file.phone" autocomplete="off"></el-input>
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
      formLabelWidth: "120px",
      dialogFormVisible: false,
      addDialog: false,
      linkman: [],
      id: "",
      file: {
        name: "",
        qr_image: "",
        skill: "",
        position: "",
        company: "",
        phone: "",
      },
    };
  },
  created() {
    this.getLinkman();
  },
  methods: {
    handleSuccess(file) {
      this.file.qr_image = file;
    },
    getLinkman() {
      axios.get("http://hello-app.test/api/server/linkman").then((res) => {
        this.linkman = res.data;
      });
    },
    submitForm() {
      axios
        .post("http://hello-app.test/api/server/linkman", {
          name: this.file.name,
          qr_image: this.file.qr_image,
          skill: this.file.skill,
          position: this.file.position,
          company: this.file.company,
          phone: this.file.phone,
        })
        .then(() => {
          this.$message("提交成功");
          this.addDialog = false;
          Object.assign(this.$data.file, this.$options.data().file);
          this.getLinkman();
        });
    },
    openChange(row) {
      (this.dialogFormVisible = true), (this.id = row.id);
    },
    handleDelete(row) {
      axios
        .delete("http://hello-app.test/api/server/linkman/" + row.id)
        .then(() => {
          this.$message("删除成功");
          this.getLinkman();
        });
    },
    change() {
      axios
        .patch("http://hello-app.test/api/server/linkman/" + this.id, {
          name: this.file.name,
          qr_image: this.file.qr_image,
          skill: this.file.skill,
          position: this.file.position,
          company: this.file.company,
          phone: this.file.phone,
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