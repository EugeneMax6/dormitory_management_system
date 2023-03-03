<template>
  <div>
    <el-container>
      <el-header>
        <div class="nav">
          <ul>
            <li><a @click="show1 = true; show2 = false; show3 = false;"><i class="el-icon-user-solid"></i>用户管理</a></li>
            <li><a @click="show1 = false; show2 = true; show3 = false;"><i class="el-icon-star-off"></i>角色管理</a></li>
            <li><a @click="show1 = false; show2 = false; show3 = true;"><i class="el-icon-aim"></i>权限管理</a></li>
          </ul>
        </div>
      </el-header>
    </el-container>
    <el-container>
      <el-main>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <changepw></changepw>
        </el-dialog>
        <el-drawer
            title="修改用户账户信息"
            size="50%"
            :visible.sync="drawer1"
            :direction="direction">
          <div style="margin: 40px">
          <el-form ref="form" :model="form1" label-width="80px">
            <el-form-item label="编号">
              <el-input v-model="form1.id" style="width: 40%"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form1.username" style="width: 40%"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form1.pw" style="width: 40%"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="Edit1">提交修改</el-button>
            </el-form-item>
          </el-form>
          </div>
        </el-drawer>
        <el-drawer
            title="添加用户账户信息"
            size="50%"
            :visible.sync="drawer2"
            :direction="direction">
          <div style="margin: 40px">
            <el-form ref="form" :model="form2" label-width="80px">
              <el-form-item label="编号">
                <el-input v-model="form2.id" style="width: 40%" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="form2.username" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form2.pw" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="Insert1">添加用户</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
        <el-divider content-position="right">
          <span style="font-size:small ">超级管理员 </span>
          <el-divider direction="vertical"></el-divider>
          <el-button type="success" size="mini" @click="dialogFormVisible = true">修改密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" size="mini" @click="exitLogin">退出登录</el-button>
        </el-divider>
        <transition name="el-zoom-in-top">
          <div id="admin1" v-show="show1">
            <div style="margin-left: 30px;margin-top: 10px">
              <el-table
                  :data="table1"
                  stripe
                  style="width: 100%">
                <el-table-column
                    prop="id"
                    label="编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="pw"
                    label="密码"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                  <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleChange1(scope.$index,scope.row)">修改</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete1(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin: 20px;display: flex">
              <el-button type="success" size="mini" @click="handleInsert1">添加</el-button>
            </div>
            <el-divider></el-divider>
          </div>
        </transition>
        <el-drawer
            title="修改角色信息"
            size="50%"
            :visible.sync="drawer3"
            :direction="direction">
          <div style="margin: 40px">
            <el-form ref="form" :model="form3" label-width="80px">
              <el-form-item label="编号">
                <el-input v-model="form3.id" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="角色代码">
                <el-input v-model="form3.role_code" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="角色名称">
                <el-input v-model="form3.role_name" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="Edit2">提交修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
        <el-drawer
            title="添加角色信息"
            size="50%"
            :visible.sync="drawer4"
            :direction="direction">
          <div style="margin: 40px">
            <el-form ref="form" :model="form4" label-width="80px">
              <el-form-item label="编号">
                <el-input v-model="form4.id" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="角色代码">
                <el-input v-model="form4.role_code" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="角色名称">
                <el-input v-model="form4.role_name" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="Insert2">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
        <transition name="el-zoom-in-top">
          <div id="admin2" v-show="show2">
            <div style="margin-left: 30px;margin-top: 10px">
              <el-table
                  :data="table2"
                  stripe
                  style="width: 100%">
                <el-table-column
                    prop="id"
                    label="编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="role_code"
                    label="角色代码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="role_name"
                    label="角色名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                  <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleChange2(scope.$index,scope.row)">修改</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete2(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin: 20px;display: flex">
              <el-button type="success" size="mini" @click="handleInsert2">添加</el-button>
            </div>
            <el-divider></el-divider>
          </div>
        </transition>
        <el-drawer
            title="修改权限信息"
            size="50%"
            :visible.sync="drawer5"
            :direction="direction">
          <div style="margin: 40px">
            <el-form ref="form" :model="form5" label-width="80px">
              <el-form-item label="用户编号">
                <el-input v-model="form5.userid" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="角色编号">
                <el-input v-model="form5.roleid" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="Edit3">修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
        <el-drawer
            title="添加权限信息"
            size="50%"
            :visible.sync="drawer6"
            :direction="direction">
          <div style="margin: 40px">
            <el-form ref="form" :model="form6" label-width="80px">
              <el-form-item label="用户编号">
                <el-input v-model="form6.userid" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="角色编号">
                <el-input v-model="form6.roleid" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="Insert3">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
        <transition name="el-zoom-in-top">
          <div id="admin3" v-show="show3">
            <div style="margin-left: 30px;margin-top: 10px">
              <el-table
                  :data="table3"
                  stripe
                  style="width: 100%">
                <el-table-column
                    prop="userid"
                    label="用户编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="roleid"
                    label="角色编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="rolename"
                    label="角色名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                  <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleChange3(scope.$index,scope.row)">修改</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete3(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin: 20px;display: flex">
              <el-button type="success" size="mini" @click="handleInsert3">添加</el-button>
            </div>
            <el-divider></el-divider>
          </div>
        </transition>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "admin",
  data(){
    return{
      show1:true,
      show2:false,
      show3:false,
      table1:[],
      table2:[],
      table3:[],
      form1:{
        id:'',
        username:'',
        pw:'',
      },
      form2:{
        id:'',
        username:'',
        pw:'',
      },
      form3:{
        id:'',
        role_code:'',
        role_name:'',
      },
      form4:{
        id:'',
        role_code:'',
        role_name:'',
      },
      form5:{
        userid:'',
        roleid:''
      },
      form6:{
        userid:'',
        roleid:''
      },
      drawer1:false,
      drawer2:false,
      drawer3:false,
      drawer4:false,
      drawer5:false,
      drawer6:false,
      direction:'rtl',
      changeindex:0,
      dialogFormVisible:false,
    }
  },
  created() {
    axios.get('/api/admin/select_sys_user').then((res=>{
      for(let i=0;i<res.data.length;i++){
        this.table1.push(res.data[i])
      }
    }))
    console.log(this.table1)
    axios.get('/api/admin/select_sys_role').then((res=>{
      for(let i=0;i<res.data.length;i++){
        this.table2.push(res.data[i])
      }
    }))
    setTimeout(()=>{
      axios.get('/api/admin/select_sys_user_role').then((res=>{
        for(let i=0;i<res.data.length;i++){
          this.table3.push(res.data[i])
        }
        for(let i=0;i<this.table3.length;i++){
          let a = this.table3[i].userid
          for(let j=0;j<this.table1.length;j++){
            if(a === this.table1[j].id){
              this.table3[i].username = this.table1[j].username
            }
          }
          let b = this.table3[i].roleid
          for(let j=0;j<this.table1.length;j++){
            if(b === this.table2[j].id){
              this.table3[i].rolename = this.table2[j].role_name
            }
          }
        }
      }))
    },1000)

  },
  methods:{
    exitLogin(){
      sessionStorage.clear();
      localStorage.clear();
      this.$axios.post('/api/logout').then((res => {
        console.log(res)
        this.$router.push('/')
      }))
    },
    handleChange1(index,row){
      this.form1 = JSON.parse(JSON.stringify(row))
      this.drawer1 = true
      this.changeindex = index
    },
    Edit1(){
      this.$axios.post('/api/admin/update_sys_user',qs.stringify(this.form1)).then((res => {
        console.log(res)
        if(res.status === 200){
          this.drawer1 = false
          this.$message({
            showClose: true,
            message:'修改成功',
            type: 'success',
            center: true
          });
          this.table1[this.changeindex].id  = this.form1.id
          this.table1[this.changeindex].username  = this.form1.username
          this.table1[this.changeindex].pw  = this.form1.pw
        }else{
          this.$message({
            showClose: true,
            message:'提交失败',
            type: 'error',
            center: true
          });
        }
      }))
    },
    delete1(index,row){
      console.log(row)
      axios.get('/api/admin/delete_sys_user/' + row.id)
      this.table1.splice(index,1)
    },
    handleInsert1(){
      this.drawer2 = true;
      this.form2.id = this.table1[this.table1.length-1].id + 1
    },
    handleInsert2(){
      this.drawer4 = true;
    },
    Insert1(){
      this.$axios.post('/api/admin/insert_sys_user',qs.stringify(this.form2)).then((res => {
        console.log(res)
        if(res.data === 1){
          this.drawer2 = false
          this.$message({
            showClose: true,
            message:'添加成功',
            type: 'success',
            center: true
          });
          this.table1.push(this.form2)
        }else{
          this.$message({
            showClose: true,
            message:'添加失败',
            type: 'error',
            center: true
          });
        }
      }))
    },
    handleChange2(index,row){
      this.form3 = JSON.parse(JSON.stringify(row))
      this.drawer3 = true
      this.changeindex = index
    },
    delete2(index,row){
      axios.get('/api/admin/delete_sys_role/' + row.id)
      this.table2.splice(index,1)
    },
    Edit2(){
      this.$axios.post('/api/admin/update_sys_role',qs.stringify(this.form3)).then((res => {
        if(res.status === 200){
          this.drawer1 = false
          this.$message({
            showClose: true,
            message:'修改成功',
            type: 'success',
            center: true
          });
          this.table2[this.changeindex].id  = this.form3.id
          this.table2[this.changeindex].role_code  = this.form3.role_code
          this.table2[this.changeindex].role_name  = this.form3.role_name
        }else{
          this.$message({
            showClose: true,
            message:'提交失败',
            type: 'danger',
            center: true
          });
        }
      }))
    },
    Insert2(){
      this.$axios.post('/api/admin/insert_sys_role',qs.stringify(this.form4)).then((res => {
        if(res.data === 1){
          this.drawer4 = false
          this.$message({
            showClose: true,
            message:'添加成功',
            type: 'success',
            center: true
          });
          this.table2.push(this.form4)
        }else{
          this.$message({
            showClose: true,
            message:'添加失败',
            type: 'danger',
            center: true
          });
        }
      }))
    },
    handleChange3(index,row){
      this.form5 = JSON.parse(JSON.stringify(row))
      this.drawer5 = true
      this.changeindex = index
    },
    Edit3(){
      this.$axios.post('/api/admin/update_sys_user_role',qs.stringify(this.form5)).then((res => {
        if(res.status === 200){
          this.drawer5 = false
          this.$message({
            showClose: true,
            message:'修改成功',
            type: 'success',
            center: true
          });
        }else{
          this.$message({
            showClose: true,
            message:'提交失败',
            type: 'danger',
            center: true
          });
        }
      }))
      setTimeout(()=>{
        axios.get('/api/admin/select_sys_user_role').then((res=>{
          this.table3 = res.data
          for(let i=0;i<this.table3.length;i++){
            let a = this.table3[i].userid
            for(let j=0;j<this.table1.length;j++){
              if(a === this.table1[j].id){
                this.table3[i].username = this.table1[j].username
              }
            }
            let b = this.table3[i].roleid
            for(let j=0;j<this.table1.length;j++){
              if(b === this.table2[j].id){
                this.table3[i].rolename = this.table2[j].role_name
              }
            }
          }
        }))
      },1000)
    },
    delete3(index,row){
      axios.get('/api/admin/delete_sys_user_role/' + row.userid)
      this.table3.splice(index,1)
    },
    handleInsert3(){
      this.drawer6 = true;
    },
    Insert3(){
      this.$axios.post('/api/admin/insert_sys_user_role',qs.stringify(this.form6)).then((res => {
        if(res.data === 1){
          this.drawer6 = false
          this.$message({
            showClose: true,
            message:'添加成功',
            type: 'success',
            center: true
          });
          this.table3.push(this.form6)
        }else{
          this.$message({
            showClose: true,
            message:'添加失败',
            type: 'error',
            center: true
          });
        }
      }))
    }
  }
}
</script>

<style scoped>
.nav{
  position: absolute;
  display: inline-block;
  width: 98%;
  height: 80px;
  box-shadow:0 0 3px 2px #999;
}
.nav ul{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  margin: 0;
  padding: 0;
}
.nav ul li{
  list-style: none;
}
.nav ul li a{
  position: relative;
  display: block;
  text-align: center;
  margin: 0 25px;
  color:#262626;
  font-size: 20px;
  text-decoration: none;
  transition: .5s;
  padding:5px 10px;
}
.nav ul li a:before {
  content: '';
  position: absolute;
  bottom:0;
  left:0;
  width:12px;
  height: 12px;
  border: solid #e91e63;
  border-width: 0 0 3px 3px;
  transition: .5s;
  opacity: 0;
}

.nav ul li a:after {
  content: '';
  position: absolute;
  top:0;
  right: 0;
  width: 12px;
  height: 12px;
  border: solid #e91e63;
  border-width:3px 3px 0 0;
  transition: .5s;
  opacity: 0;
}
.nav ul li a:hover{
  color:#fff;
  background: #e91e63;
}
.nav ul li a:hover::before {
  left: -12px;
  bottom: -12px;
  opacity: 1;
}

.nav ul li a:hover::after {
  top: -12px;
  right: -12px;
  opacity: 1;
}
</style>