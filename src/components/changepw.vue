<template>
<div>
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">修改</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
</div>
</template>

<script>
import qs from "qs";

export default {
  name: "changepw",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      username: '',
      form: {
        id: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.form.id = sessionStorage.getItem('id')
  },
  methods:{
    submitForm(formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/all/changePw',qs.stringify({
            id:this.form.id,
            pw:this.form.pass
          })).then((res => {
            console.log(res)
            if(res.data === 1){
              this.$message({
                message:'修改成功',
                showClose: true,
                type: 'success',
                center: true
              });
              setTimeout(()=>{
                sessionStorage.clear();
                localStorage.clear();
                this.$router.push('/')
              },500)
            }else{
              this.$message({
                message:'修改失败',
                showClose: true,
                type: 'error',
                center: true
              });
            }
          }))
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>


</style>