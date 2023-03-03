<template>
  <div class="body">
    <div class="head">XX大学 宿舍管理系统</div>
    <div class="content">
      <div class="form sign-in">
        <h2>在校学生 / 维修员 登录</h2>
        <label>
          <span>用户名</span>
          <input type="username"  v-model.trim="name" placeholder="请输入用户名"/>
        </label>
        <label>
          <span>密码</span>
          <input type="password"  v-model.trim="password" placeholder="请输入密码"/>
        </label>
        <div id="kp">
          <el-radio v-model="stay" label="0">不保存登录状态</el-radio>
          <el-radio v-model="stay" label="1">保存登录状态</el-radio>
        </div>
        <div id="kp1">
          <el-radio  v-model="radio" label="3">学生登录</el-radio>
          <el-radio  v-model="radio" label="4">维修员登录</el-radio>
        </div>
        <button type="button" class="submit"  v-on:click="handleLogin()">登 录</button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>切换到管理员身份</h2>
            <p>点击下方按钮切换后台管理登录</p>
          </div>
          <div class="img__text m--in">
            <h2>切换到其他身份</h2>
            <p>点击下方按钮切换到用户端登录</p>
          </div>
          <div class="img__btn">
            <span class="m--up">切 换</span>
            <span class="m--in">切 换</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>管理员 登录</h2>
          <label>
            <span>用户名</span>
            <input type="text" v-model.trim="name" placeholder="请输入用户名" />
          </label>
          <label>
            <span>密码</span>
            <input type="password" v-model.trim="password" placeholder="请输入密码"/>
          </label>
          <div id="kp">
            <el-radio v-model="stay" label="0">不保存登录状态</el-radio>
            <el-radio v-model="stay" label="1">保存登录状态</el-radio>
          </div>
          <button type="button" class="submit" v-on:click="handleLogin1()">登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "login",
  data(){
    return {
      name: "",//姓名，用v-model绑定监听，将输入的字符串赋值给name变量
      password: "",//密码
      stay: "0",//0为不保存登录
      radio: "3",  //3为学生登录，4为维修员登录
      dialogVisible:false,  //默认隐藏对话框
      loginForm:{
        username:'',
        pw:''
      },
      authority:'',
    }
  },
  created() {
    this.stay = localStorage.getItem('Login_State');  //读取登录状态
    this.authority = sessionStorage.getItem('authority')
    if(this.stay === "1" ) {
      this.$alert('您已登录该系统,点击确定跳转到主页', '系统提醒', {
        confirmButtonText: '确定',
        customClass: 'winClass',//弹窗样式
        callback: () => {
          if(this.authority === "student"){
            this.$router.push('/stu')
          }else if(this.authority === "keeper"){
            this.$router.push('/manager')
          }else if(this.authority === "repair_p"){
            this.$router.push('/repair')
          }else if(this.authority === "admin"){
            this.$router.push('/admin')
          }
        }
      });
    }
    else{
      this.stay="0";
    }
  },
  mounted() {
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.content').classList.toggle('s--signup')
    })
  },
  methods: {
    handleLogin(){
      setTimeout(()=>{
        if(this.name ==='') {
          this.$message({
            message:'用户名不能为空',
            type: 'error',
            center: true
          });
        }
        else if(this.password === '') {
          this.$message({
            message:'密码不为空',
            type: 'error',
            center: true
          });
        }else{
          this.loginForm.username = this.name
          this.loginForm.pw = this.password
          this.$axios.post('api/login',qs.stringify(this.loginForm)).then((res => {
            console.log(res)
            if(res.data.status === "success"){
              if(this.stay === "1"){
                localStorage.setItem('Login_State', this.stay);  //修改登录状态
              }
              sessionStorage.setItem("username", res.data.data.username);
              sessionStorage.setItem("authority", res.data.data.authority);
              sessionStorage.setItem("id", res.data.data.id);
              if(res.data.data.authority === "student" && this.radio === "3"){
                this.$router.push('/stu')
              }else if(res.data.data.authority === "repair_p" && this.radio === "4"){
                this.$router.push('/repair')
              }
              else{
                this.$message({
                  message:'登陆失败，请选择正确的身份登录',
                  type: 'error',
                  center: true
                });
                this.exitLogin()
              }
            }else{
              this.$message({
                message:'账号或密码错误',
                type: 'error',
                center: true
              });
            }
          }))
        }
      },500)
    },
    exitLogin(){
      sessionStorage.clear();
      localStorage.clear();
      this.$axios.post('/api/logout')

    },
    handleLogin1(){
      setTimeout(()=>{
        if(this.name ==='') {
          this.$message({
            message:'用户名不能为空',
            type: 'error',
            center: true
          });
        }
        else if(this.password === '') {
          this.$message({
            message:'密码不为空',
            type: 'error',
            center: true
          });
        }else{
          this.loginForm.username = this.name
          this.loginForm.pw = this.password
          this.$axios.post('api/login',qs.stringify(this.loginForm)).then((res => {
            console.log(res)
            if(res.data.status === "success"){
              if(this.stay === "1"){
                localStorage.setItem('Login_State', this.stay);  //修改登录状态
              }
              sessionStorage.setItem("username", res.data.data.username);
              sessionStorage.setItem("authority", res.data.data.authority);
              sessionStorage.setItem("id", res.data.data.id);
              if(res.data.data.authority === "keeper"){
                this.$router.push('/manager')
              }else if(res.data.data.authority === "admin"){
                this.$router.push('/admin')
              }else{
                this.$message({
                  message:'登陆失败，请选择正确的身份登录',
                  type: 'error',
                  center: true
                });
                this.exitLogin()
              }
            }else{
              this.$message({
                message:'账号或密码错误',
                type: 'error',
                center: true
              });
            }
          }))
        }
      },500)

    },
  }
}

</script>

<style scoped="scoped">
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.winClass{
  width: 300px;
  height: 180px;
  display: grid;
}

.body {
  height: 100%;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  background: url("../assets/img/bg.jpg") no-repeat;
  background-size: cover;
  display: grid;
}

input, button {
  border: none;
  outline: none;
  background: none;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

.content {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 55%;
  width: 900px;
  height: 550px;
  margin: -300px 0 0 -400px;
  background: #fff;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.content.s--signup .sub-cont {
  -webkit-transform: translate3d(-640px, 0, 0);
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.content.s--signup .img:before {
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}

.img__text p {
  font-size: 14px;
  line-height: 1.5;
}

.content.s--signup .img__text.m--up {
  -webkit-transform: translateX(520px);
  transform: translateX(520px);
}
.img__text.m--in {
  -webkit-transform: translateX(-520px);
  transform: translateX(-520px);
}

.content.s--signup .img__text.m--in {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: '';
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: -webkit-transform 0.6s;
  transition: transform 0.6s;
  transition: transform 0.6s, -webkit-transform 0.6s;
}

.img__btn span.m--in {
  -webkit-transform: translateY(-72px);
  transform: translateY(-72px);
}

.content.s--signup .img__btn span.m--in {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.content.s--signup .img__btn span.m--up {
  -webkit-transform: translateY(72px);
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

label span {
  font-size: 12px;
  color: #909399;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}


.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

#kp{
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-flex;
}

#kp1{
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-flex;
}
.sign-in {
  transition-timing-function: ease-out;
}
.content.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 0.6s;
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  -webkit-transform: translate3d(-900px, 0, 0);
  transform: translate3d(-900px, 0, 0);
}
.content.s--signup .sign-up {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.head {
  text-align: center;
  display: block;
  margin-top: 20px;
  font-size: 50px;
  color: white;
  text-shadow:
      0px 0px 20px yellow,
      0px 0px 10px orange,
      0px 0px 10px orangered,
      0px 0px 10px red;
}



</style>
