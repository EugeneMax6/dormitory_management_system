<template>
<div>
  <el-container>
    <el-header style=" width: 100%;display: inline-block">
      <div class="nav">
        <ul>
          <li><a @click="show1 = true; show2 = false; show3 = false;show4 = false;"><i class="el-icon-user-solid"></i>个人首页</a></li>
          <li><a @click="show1 = false; show2 = true; show3 = false;show4 = false;"><i class="el-icon-s-home"></i>宿舍信息</a></li>
          <li><a @click="show1 = false; show2 = false; show3 = true;show4 = false;"><i class="el-icon-s-open"></i>维修记录</a></li>
          <li><a @click="show1 = false; show2 = false; show3 = false;show4 = true;"><i class="el-icon-s-order"></i>申请维修</a></li>
        </ul>
      </div>
    </el-header>
  </el-container>
  <el-container>
    <el-main>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <changepw></changepw>
      </el-dialog>
      <el-divider content-position="right">
        <span>{{this.user.sname}} </span>
        <el-divider direction="vertical"></el-divider>
        <el-button type="success" size="mini" @click="dialogFormVisible = true">修改密码</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" size="mini" @click="exitLogin">退出登录</el-button>
      </el-divider>
           <transition name="el-fade-in-linear">
           <div id="stu1" v-show="show1" >
             <div>
               <el-row type="flex" justify="space-around">
                 <el-col :span="7"><div class="grid-content bg-purple" >
                   <el-card shadow="hover" style="height: 300px;width: 500px">
                     <div slot="header" class="clearfix">
                       <span>我的基本信息</span>
                       <el-button style="float: right; padding: 3px 0" type="text" @click="show1 = false; show2 = true; show3 = false;show4 = false;">查看我的宿舍信息</el-button>
                     </div>
                     <el-row :gutter="20">
                       <el-col :span="4">
                     <div>
                       <el-avatar> {{ user.sname }} </el-avatar>
                     </div>
                       </el-col>
                       <el-col :span="20">
                         <el-descriptions column="2">
                           <el-descriptions-item label="姓名">{{user.sname}}</el-descriptions-item>
                           <el-descriptions-item label="专业">{{user.sdept}}</el-descriptions-item>
                           <el-descriptions-item label="学号">{{user.sno}}</el-descriptions-item>
                           <el-descriptions-item label="宿舍号">{{user.dno}}</el-descriptions-item>
                           <el-descriptions-item label="籍贯">{{user.address}}</el-descriptions-item>
                           <el-descriptions-item label="入学时间">{{user.entrytime}}</el-descriptions-item>
                         </el-descriptions>
                         <el-divider>
                         </el-divider>
                         <el-form>
                           <el-form-item>
                             <el-button icon="el-icon-zoom-in" type="success" @click="show1 = false; show2 = false; show3 = true;show4 = false;">查看维修记录</el-button>
                             <el-divider direction="vertical"></el-divider>
                             <el-button icon="el-icon-upload2" type="warning" @click="show1 = false; show2 = false; show3 = false;show4 = true;" >报修宿舍故障</el-button>
                           </el-form-item>
                         </el-form>
                       </el-col>
                     </el-row>
                   </el-card>
                 </div></el-col>
                 <el-col :span="6"><div style="height:300px">
                   <sex></sex>
                 </div></el-col>
                 <el-col :span="6"><div>
                   <bno-stu></bno-stu>
                 </div></el-col>
               </el-row>
             </div>
             <el-divider></el-divider>
             <div style="width: 100%;height: 400px;margin-top: 20px">
               <repair-table></repair-table>
             </div>
             <div style="width: 100%;height: 500px;margin-top: 20px">
               <repair-type></repair-type>
             </div>
             <div style="width: 100%;height: 700px;margin-top: 20px">
               <stumap></stumap>
             </div>
           </div>
           </transition>
           <transition name="el-fade-in-linear">
           <div id="stu2" v-show="show2"  style="display: grid;width: 100%;overflow: hidden;margin-top: 10px">
             <el-divider> <i class="el-icon-search" style="font-size: large"></i><span style="font-size:large "> 下面是你的宿舍信息，你的宿舍号是</span><el-tag type="success">{{dor_info.dno}}</el-tag></el-divider>
             <div style="margin:20px">
               <el-card :body-style="{ padding: '0px'}" shadow="hover">
                 <div style="margin:20px">
             <el-descriptions title="宿舍信息" direction="horizontal" :column="2" >
               <el-descriptions-item label="宿舍号"><el-tag>{{dor_info.dno}}</el-tag></el-descriptions-item>
               <el-descriptions-item label="宿舍类型"><el-tag type="success">{{ dor_info.dtype }}</el-tag></el-descriptions-item>
               <el-descriptions-item label="宿舍楼号"><el-tag type="success">{{dor_info.bno}}</el-tag></el-descriptions-item>
               <el-descriptions-item label="宿舍楼类别"><el-tag type="success">{{ dor_info.bsex }}</el-tag></el-descriptions-item>
               <el-descriptions-item label="已有人数"><el-tag type="success">{{ dor_info.people_use }}</el-tag></el-descriptions-item>
               <el-descriptions-item label="当前空位"><el-tag type="success">{{ dor_info.remain }}</el-tag></el-descriptions-item>
               <el-descriptions-item label="地址">{{ dor_info.location}}</el-descriptions-item>
             </el-descriptions>
                 </div>
               </el-card>
             </div>
             <el-divider> <i class="el-icon-magic-stick" style="font-size: large"></i><span style="font-size:large "> 下面是你的宿舍人员信息</span></el-divider>
             <div style="margin:20px">
               <el-card :body-style="{ padding: '0px'}" shadow="hover">
                 <div style="margin:20px" v-for="(item) in stuList" :key="item">
                   <el-descriptions  direction="horizontal" :column="2" >
                     <el-descriptions-item label="学号">{{item.sno}}</el-descriptions-item>
                     <el-descriptions-item label="姓名">{{item.sname }}</el-descriptions-item>
                     <el-descriptions-item label="专业">{{item.sdept}}</el-descriptions-item>
                     <el-descriptions-item label="性别">{{ item.ssex }}</el-descriptions-item>
                     <el-descriptions-item label="入学时间">{{ item.entrytime }}</el-descriptions-item>
                     <el-descriptions-item label="电话">{{ item.telephone }}</el-descriptions-item>
                     <el-descriptions-item label="籍贯">{{ item.address }}</el-descriptions-item>
                   </el-descriptions>
                   <el-divider></el-divider>
                 </div>
               </el-card>
             </div>
             <el-divider> <i class="el-icon-user" style="font-size: large"></i><span style="font-size:large "> 下面是你的宿管信息，你的宿舍共有<span style="color: 	#00FF7F">{{admin.length}}</span>位宿管</span></el-divider>
             <div style="margin:20px">
               <el-card :body-style="{ padding: '0px'}" shadow="hover">
                 <div style="margin:20px" v-for="(item) in admin" :key="item">
                   <el-descriptions  direction="horizontal" :column="2" >
                     <el-descriptions-item label="姓名">{{item.jname}}</el-descriptions-item>
                     <el-descriptions-item label="宿管序号">{{item.jno }}</el-descriptions-item>
                     <el-descriptions-item label="宿舍楼号">{{item.bno}}</el-descriptions-item>
                     <el-descriptions-item label="电话">{{ item.telephone }}</el-descriptions-item>
                   </el-descriptions>
                   <el-divider></el-divider>
                 </div>
               </el-card>`
             </div>
           </div>
           </transition>
           <transition name="el-zoom-in-top">
           <div id="stu3" v-show="show3">
             <el-tabs v-model="activeName">
               <el-tab-pane label="全部记录" name="default"></el-tab-pane>
               <el-tab-pane label="待维修" name="first"></el-tab-pane>
               <el-tab-pane label="维修中" name="second"></el-tab-pane>
               <el-tab-pane label="已完成" name="third"></el-tab-pane>
             </el-tabs>
             <div id="tableRepair" style=" margin-top: 2px;margin-left: 20px">
             <el-table
                 :data="repairList"
                 max-height="1000px"
                 row-key="id"
                 :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                 :row-class-name="tableRowClassName"
                 style="width: 100%"
                 ref="table">
               <el-table-column type="expand">
                 <template slot-scope="props">
                   <div style="margin: 20px;display: block">
                 <el-descriptions>
                   <el-descriptions-item label="编号">
                     <el-tag size="mini">{{props.row.id}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="楼栋号">
                     <el-tag size="mini">{{props.row.bno}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="宿舍楼名">
                     <el-tag size="mini">{{props.row.bname}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="宿舍号">
                     <el-tag size="mini">{{props.row.rno}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="宿舍地址">
                     <el-tag size="mini">{{props.row.location}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="维修状态">
                     <el-tag size="mini">{{props.row.rstatus}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="维修员编号">
                     <el-tag size="mini">{{props.row.rno}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="维修员姓名">
                     <el-tag size="mini">{{props.row.rname}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="维修员电话">
                     <el-tag size="mini">{{props.row.telephone}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="报修人">
                     <el-tag size="mini">{{props.row.sname}}</el-tag>
                   </el-descriptions-item>
                   <el-descriptions-item label="报修人学号">
                     <el-tag size="mini">{{props.row.sno}}</el-tag>
                   </el-descriptions-item>
                 </el-descriptions>
                     <el-descriptions>
                   <el-descriptions-item label="故障详情">
                     {{props.row.info}}
                   </el-descriptions-item>
                 </el-descriptions>
                     <div class="block" style="display:inline-block;width: 60%;margin: 30px 300px 20px;">
                       <el-steps :active="sta(props.row.rstatus)">
                         <el-step title="待维修" icon="el-icon-s-check"></el-step>
                         <el-step title="维修中" icon="el-icon-help"></el-step>
                         <el-step title="已完成" icon="el-icon-success"></el-step>
                       </el-steps>
                       <div v-if="props.row.rstatus === '待维修'" style="margin-top: 20px">
                         <el-alert
                             title="待维修"
                             type="warning"
                             description="维修信息已提交，等待维修中！"
                             :closable="false"
                             show-icon>
                         </el-alert>
                       </div>
                       <div v-if="props.row.rstatus === '维修中'" style="margin-top: 20px">
                         <el-alert
                             title="维修中"
                             type="info"
                             description="维修信息已提交，正在维修中！"
                             :closable="false"
                             show-icon>
                         </el-alert>
                       </div>
                       <div v-if="props.row.rstatus === '已完成'" style="margin-top: 20px">
                         <el-alert
                             title="已结束"
                             type="success"
                             description="该维修已完成！"
                             :closable="false"
                             show-icon>
                         </el-alert>
                       </div>
                     </div>
                   </div>
                 </template>
               </el-table-column>
               <el-table-column
                   prop="id"
                   label="编号"
                   width="50">
               </el-table-column>
               <el-table-column
                   prop="bno"
                   label="楼栋号"
                   width="80">
               </el-table-column>
               <el-table-column
                   prop="bname"
                   label="宿舍楼名"
                   width="90">
               </el-table-column>
               <el-table-column
                   prop="dno"
                   label="宿舍号"
                   width="80">
               </el-table-column>
               <el-table-column
                   prop="location"
                   label="宿舍地址"
                   width="100">
               </el-table-column>
               <el-table-column
                   prop="info"
                   label="故障明细"
                   width="200">
               </el-table-column>
               <el-table-column
                   prop="rname"
                   label="维修员"
                   width="100">
               </el-table-column>
               <el-table-column
                   prop="rno"
                   label="维修员编号"
                   width="100">
               </el-table-column>
               <el-table-column
                   prop="rstatus"
                   label="维修状态"
                   width="80">
               </el-table-column>
               <el-table-column
                   prop="rtime"
                   label="报修日期"
                   width="140">
               </el-table-column>
               <el-table-column
                   prop="ftime"
                   label="完成日期"
                   width="140">
               </el-table-column>
               <el-table-column
                   prop="sname"
                   label="报修人"
                   width="100">
               </el-table-column>
             </el-table>
             </div>
           </div>
           </transition>
           <transition name="el-zoom-in-top">
           <div id="stu4" v-show="show4">
             <el-divider></el-divider>
             <el-form :model="form">
               <el-form-item  style="margin-top: 20px">
                 <el-tag type="success">姓名</el-tag>
                 <el-divider direction="vertical"></el-divider>
                 <el-input v-model="user.sname" :disabled="true"  style="width: 20%"></el-input>
                 <el-divider direction="vertical"></el-divider>
                 <el-tag type="success">学号</el-tag>
                 <el-divider direction="vertical"></el-divider>
                 <el-input v-model="form.sno" :disabled="true"  style="width: 20%"></el-input>
                 <el-divider direction="vertical"></el-divider>
                 <el-tag>宿舍</el-tag>
                 <el-divider direction="vertical"></el-divider>
                 <el-input v-model="form.dno" :disabled="true" placeholder="请输入宿舍号" style="width: 20%"></el-input>
               </el-form-item>
               <el-form-item label="维修员" required>
                 <el-select v-model="repair_p" placeholder="请选择">
                   <el-option
                       v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                   </el-option>
                 </el-select>
               </el-form-item>
               <el-form-item label="问题描述" required>
                 <el-input type="textarea" v-model="form.info" placeholder="请输入故障的详情内容" style="width: 50%"></el-input>
               </el-form-item>
               <el-form-item>
                 <el-button type="primary" plain @click="onSubmit">提交申请</el-button>
               </el-form-item>
             </el-form>
           </div>
           </transition>
         </el-main>
       </el-container>
     </div>
     </template>

     <script>
     import qs from "qs";
     import Changepw from "@/components/changepw";
     import sex from "@/components/sex";
     import BnoStu from "@/components/BnoStu";
     import RepairTable from "@/components/RepairTable";
     import RepairType from "@/components/RepairType";
     import stumap from "@/components/stumap";
     export default {
       name: "stu",
       components: {stumap,RepairType, RepairTable, BnoStu, Changepw,sex},
       data(){
         return{
           activeName:'default',
           direction:"rtl",
           drawer:false,
           username:'',
           user:{
             address: "",
             dno: "",
             sno: "",
             telephone: "",
             ssex: "",
             sname: "",
             sdept: "",
             entrytime: ''
           },
           dor_info:{
             dno:'',
             dtype:'',
             remain:'',
             people_use:'',
             bsex:'',
             location:''
           },
           options:[],
           admin:[],
           stuList:[],
           repairList:[],
           form:{
             dno:'',
             rno:'',
             info:'',
             sno:'',
           },
           show1:true,
           show2:false,
           show3:false,
           show4:false,
           list1:[],
           list2:[],
           list3:[],
           list4:[],
           unrepair:0,
           repair_p:null,
           dialogFormVisible:false,

         }
       },
       mounted() {
       },
       methods:{
         tableRowClassName(row) {
           if (row.row.rstatus==="待维修") {
             return 'waiting-row';
           } else if (row.row.rstatus === "已完成") {
             return 'success-row';
           }else if (row.row.rstatus === "维修中"){
             return 'going-row'
           }return 'none-row';
         },
         onSubmit(){
           this.form.rno = this.repair_p
           this.$axios.post('/api/keeperAndStudent/insert_repair_document',qs.stringify(this.form)).then((res => {
             if(res.data === 1){
               this.$message({
                 message:'添加成功',
                 showClose: true,
                 type: 'success',
                 center: true
               });
               this.getRepairDocument()
             }else{
               this.$message({
                 message:'添加失败',
                 showClose: true,
                 type: 'error',
                 center: true
               });
             }
           }))
         },
         sta(stat){
           if (stat==="待维修") {
             return 1;
           }else if(stat === "维修中"){
             return 2;
           } else if (stat === "已完成") {
             return 3;
           } else{
             return null;
             }
         },
         exitLogin(){
           sessionStorage.clear();
           localStorage.clear();
           this.$axios.post('/api/logout').then(() => {
             this.$router.push('/')
           })
         },
         getRepairDocument(){
           this.$axios.get('/api/student/select_repair_document_view3/'+ this.username).then((res => {
             this.repairList = res.data
             this.list1 = []
             this.list2 = []
             this.list3 = []
             this.list4 = []
             for(let i = 0;i < this.repairList.length; i++){
               this.list1.push(this.repairList[i])
               if(this.repairList[i].rstatus ==="待维修"){
                 this.list2.push(this.repairList[i]);
               }
               else if(this.repairList[i].rstatus === "维修中"){
                 this.list3.push(this.repairList[i]);
               }else if(this.repairList[i].rstatus === "已完成"){
                 this.list4.push(this.repairList[i]);
               }
             }
           }))
           this.repairList = this.list1
           this.$axios.get('/api/student/getnumber_repair_document_view3/' + this.username).then((res => {
             this.unrepair = res.data
           }))
         }

       },
       watch:{
        activeName(newValue){
          if(newValue === "default"){
            this.repairList = this.list1
          }else if(newValue ==="first"){
            this.repairList = this.list2
          }else if(newValue ==="second"){
            this.repairList = this.list3
          }else if(newValue ==="third"){
            this.repairList = this.list4
          }
        },
         show3(newValue){
          if(newValue === true){
            this.$message({
              showClose: true,
              message:'有'+this.unrepair + '条维修记录未完成',
              type: 'warning',
              center: true
            });
          }
         },
         show4(newValue){
          if(newValue === true){
            this.form.dno = this.user.dno;
            this.form.sno = this.user.sno;
            this.form.bno = this.user.bno;
          }
         }
       },
       created() {
         this.username = sessionStorage.getItem('username')
         this.$axios.get('/api/student/select_oneStudent/'+ this.username).then((res => {
           this.user.dno = res.data.dno
           this.user.sno = res.data.sno
           this.user.address = res.data.address
           this.user.ssex = res.data.ssex
           this.user.sname = res.data.sname
           this.user.telephone = res.data.telephone
           this.user.entrytime = res.data.entrytime
           this.user.sdept = res.data.sdept
         }))
         this.$axios.get('/api/student/select_student_view/'+ this.username).then((res => {
           this.stuList = res.data
         }))
         this.$axios.get('/api/student/select_oneDormitory/'+ this.username).then((res => {
           this.dor_info = JSON.parse(JSON.stringify(res.data))
         }))
         this.$axios.get('/api/student/select_keeper2/'+ this.username).then((res => {
           this.admin = res.data
         }))
         this.$axios.get('/api/all/select_repair_p').then((res => {
           for(let i = 0;i< res.data.length;i++){
             var obj = new Object()
             obj.label = res.data[i].rname + '-' + res.data[i].title
             obj.value = res.data[i].rno
             this.options.push(obj)
           }
         }))
         this.getRepairDocument()
       },
     }
     </script>

     <style scoped>
     el-table-column {
       text-align: center;
     }
     .demo-table-expand {
       font-size: 0;
     }
     .demo-table-expand label {
       width: 90px;
       color: #99a9bf;
     }
     .demo-table-expand >>> .el-form-item {
       margin-right: 0;
       margin-bottom: 0;
       width: 50%;
     }

     .el-table >>> .going-row {
       background: rgba(	225,255,255,0.5)
     }
     .el-table >>> .success-row {
       background: rgba(	144,238,144,0.3)
     }
     .el-table >>> .waiting-row {
       background: rgba(	255,222,173,0.4);
     }
     .el-table >>> .none-row {
       background: rgba(		211,211,211,0.4);
     }
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