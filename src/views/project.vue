<template>
  <div id="app">
    <div class="add" style="float: right">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="addDialog = true"
        >添加项目</el-button
      >
    </div>
    <el-dialog title="添加项目" :visible.sync="addDialog" center>
      <el-form :model="add">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="add.categories_id" placeholder="请选择项目分类">
            <el-option
              v-for="(item, id) in category"
              :key="id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="add.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目大图" :label-width="formLabelWidth">
          <el-upload
            v-model="add.image_uil"
            class="upload-demo"
            drag
            action="http://hello-app.test/api/server/file"
            :on-success="handleSuccess"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              图片上传最好高宽比例为1 ：1.6
            </div>
          </el-upload>
          <div v-if="add.image_uil.length > 0">
            <img
              :src="add.image_uil"
              class="images"
              height="100px"
              width="100px"
            />
          </div>
        </el-form-item>
        <el-form-item label="项目视频介绍" :label-width="formLabelWidth">
          <el-upload
            v-model="add.video_uil"
            class="upload-demo"
            drag
            action="http://hello-app.test/api/server/file"
            :on-success="handleSuccess2"
            :file-list="fileList2"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">请上传视频</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="项目时间" :label-width="formLabelWidth">
          <el-input v-model="add.data" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目热度" :label-width="formLabelWidth">
          <el-select v-model="add.hot" placeholder="请选择火花数量">
            <el-option
              v-for="i in 10"
              :key="i"
              :label="i"
              :value="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目周期" :label-width="formLabelWidth">
          <el-input v-model="add.cycle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="承办公司" :label-width="formLabelWidth">
          <el-input v-model="add.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目金额" :label-width="formLabelWidth">
          <el-input v-model="add.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目说明" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="add.particulars"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
            action="http://hello-app.test/api/server/file"
            :on-success="handleSuccess1"
            :file-list="fileList1"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <div v-if="Object.keys(add.show).length > 0">
            <img
              v-for="(time, i) in add.show"
              :key="i"
              :src="time.UIL"
              height="100px"
              width="100px"
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addProject()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="项目名称"
        width="120"
      ></el-table-column>
      <el-table-column label="项目图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.image_uil" width="150" height="100" />
        </template>
      </el-table-column>
      <el-table-column
        prop="data"
        label="项目完成时间"
        width="120"
      ></el-table-column>
      <el-table-column prop="hot" label="项目热度" width="50"></el-table-column>
      <el-table-column
        prop="company"
        label="公司名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="money"
        label="项目金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="cycle"
        label="项目周期"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="particulars"
        label="项目详情介绍"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
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
    <el-dialog title="修改项目" :visible.sync="dialogFormVisible" center>
      <el-form :model="add">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="add.categories_id" placeholder="请选择项目分类">
            <el-option
              v-for="(item, id) in category"
              :key="id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="add.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目大图" :label-width="formLabelWidth">
          <el-upload
            v-model="add.image_uil"
            class="upload-demo"
            drag
            action="http://hello-app.test/api/server/file"
            :on-success="handleSuccess"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              图片上传最好高宽比例为1 ：1.6
            </div>
          </el-upload>
          <div v-if="add.image_uil.length > 0">
            <img
              :src="add.image_uil"
              class="images"
              height="100px"
              width="100px"
            />
          </div>
        </el-form-item>
        <el-form-item label="项目视频介绍" :label-width="formLabelWidth">
          <el-upload
            v-model="add.video_uil"
            class="upload-demo"
            drag
            action="http://hello-app.test/api/server/file"
            :on-success="handleSuccess2"
            :file-list="fileList2"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">请上传视频</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="项目时间" :label-width="formLabelWidth">
          <el-input v-model="add.data" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目热度" :label-width="formLabelWidth">
          <el-select v-model="add.hot" placeholder="请选择火花数量">
            <el-option
              v-for="i in 10"
              :key="i"
              :label="i"
              :value="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目周期" :label-width="formLabelWidth">
          <el-input v-model="add.cycle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="承办公司" :label-width="formLabelWidth">
          <el-input v-model="add.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目金额" :label-width="formLabelWidth">
          <el-input v-model="add.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目说明" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="add.particulars"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
            action="http://hello-app.test/api/server/file"
            :on-success="handleSuccess1"
            :file-list="fileList1"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <div v-if="Object.keys(add.show).length > 0">
            <img
              v-for="(time, i) in add.show"
              :key="i"
              :src="time.UIL"
              height="100px"
              width="100px"
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Change()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      tableData: [],
      fileList2: [],
      fileList1: [],
      fileList: [],
      category: [],
      addDialog: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      add: {
        name: "",
        image_uil: "",
        video_uil: "",
        data: "",
        hot: "",
        cycle: "",
        company: "",
        money: "",
        particulars: "",
        show: [],
        categories_id: "",
      },
    };
  },
  created() {
    this.getCategory();
    this.getProject();
  },
  methods: {
    handleSuccess(file) {
      this.add.image_uil = file;
    },
    handleSuccess1(file) {
      this.add.show.push({ UIL: file });
      console.log(this.add.show);
    },
    handleSuccess2(file) {
      this.add.video_uil = file;
    },
    getProject() {
      axios({
        url: "http://hello-app.test/api/server/projects",
        method: "get",
      }).then((response) => {
        this.tableData = response.data;
      });
    },
    getCategory() {
      axios({
        url: "http://hello-app.test/api/server/categories",
        method: "get",
      }).then((response) => {
        this.category = response.data;
      });
    },
    addProject() {
      axios
        .post("http://hello-app.test/api/server/projects", {
          name: this.add.name,
          image_uil: this.add.image_uil,
          video_uil: this.add.video_uil,
          data: this.add.data,
          hot: this.add.hot,
          cycle: this.add.cycle,
          company: this.add.company,
          money: this.add.money,
          particulars: this.add.particulars,
          show: JSON.stringify(this.add.show),
          categories_id: this.add.categories_id,
        })
        .then(() => {
          this.$message("添加成功");
          Object.assign(this.$data.add, this.$options.data().add);
          this.addDialog = false;
        });
    },
    handleDelete(row) {
      axios
        .delete("http://hello-app.test/api/server/projects/" + row.id)
        .then(() => {
          this.$message("删除成功");
          this.getProject();
        });
    },
    openChange(row) {
      (this.dialogFormVisible = true), (this.id = row.id);
    },
    Change() {
      axios
        .patch("http://hello-app.test/api/server/projects/" + this.id, {
          name: this.add.name,
          image_uil: this.add.image_uil,
          video_uil: this.add.video_uil,
          data: this.add.data,
          hot: this.add.hot,
          cycle: this.add.cycle,
          company: this.add.company,
          money: this.add.money,
          particulars: this.add.particulars,
          show: JSON.stringify(this.add.show),
          categories_id: this.add.categories_id,
        })
        .then(() => {
          this.$message("修改成功");
          this.dialogFormVisible = false;
          Object.assign(this.$data.add, this.$options.data().add);
          this.getProject();
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>