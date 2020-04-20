<template>
  <div>
    <myheader ref="updateInfo" />
    <div style="margin:2% 10%;">
      <el-card :body-style="{ padding: '30px' }">
        <el-row :gutter="10">
          <!-- 左边区域 -->
          <el-col :span="19">
            <!-- 更新日期显示区域 -->
            <div>
              <span style="color:#9fa3b0;font-size:12px">最后更新&nbsp{{ dateTime }}</span>
            </div>
            <!-- 姓名区域 -->
            <el-row>
              <el-col :span="24">
                <span class="name">{{ info.username }}</span>
                <i v-if="info.gender===1" style="background-color:rgb(75, 161, 241);border-radius:7px;color:#ffff;font-size:20px" class="el-icon-male" />
                <i v-else style="background-color:rgb(255 181 197);border-radius:7px;color:#ffff;font-size:20px" class="el-icon-female" />
              </el-col>
            </el-row>
            <!-- 第一行 -->
            <el-row :gutter="1">
              <el-col :span="15">
                <!-- 学号 -->
                <i class="el-icon-postcard" />
                <span>{{ info.stuid }}</span>
                <el-divider direction="vertical" />
                <!-- 昵称 -->
                <i class="el-icon-user" />
                <span>{{ info.nickname }}</span>
                <el-divider direction="vertical" />
                <i class="el-icon-location-information" />
                <!-- 学院 -->
                <span>{{ info.college }}</span>
                <el-divider direction="vertical" />
                <!-- 电话 -->
                <i class="el-icon-mobile-phone" />
                <span>{{ info.phone }}</span>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="1" style="margin-top:20px">
              <el-col :span="15">
                <!-- 邮箱 -->
                <i class="el-icon-message" />
                <span>{{ info.email }}</span>
                <el-divider direction="vertical" />
                <!-- 性别 -->
                <i v-if="info.gender===1" class="el-icon-male" />
                <i v-else class="el-icon-female" />
                <span v-if="info.gender===1">男</span>
                <span v-else>女</span>
                <el-divider direction="vertical" />
                <!-- 是否贫困生 -->
                <i class="el-icon-bangzhu" />
                <span v-if="info.needyStudents">贫困生</span>
                <span v-else>非贫困生</span>
                <el-divider direction="vertical" />
                <!-- 成长值 -->
                <i class="el-icon-trophy-1" />
                <span>{{ info.growth }}</span>
              </el-col>
            </el-row>
            <!-- 第三行 -->
            <el-row>
              <el-col :span="24">
                <!-- 个性签名 -->
                <i class="el-icon-edit" />
                <span>{{ info.personalizedSignature }}</span>
              </el-col>
            </el-row>
          </el-col>
          <!-- 右边区域 -->
          <el-col :span="5">
            <!-- 头像区域 -->
            <avatar />
            <el-row />
            <el-row />
            <el-row />
            <el-row />
            <el-row />
            <el-row />
            <el-row>
              <el-col :span="24">
                <i style="color:#00c2b3;font-size:16px;" class="el-icon-edit-outline" />
                <span style="color:#00c2b3;font-size:16px;cursor:pointer" @click="showEditInfoDialog">编辑</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <h3>申请的岗位</h3>
      <el-card>
        <!-- 表格区域 -->
        <el-table id="exportTab" v-loading="loading" :data="approList" border stripe>
          <el-table-column type="index" label="#" />
          <el-table-column label="应聘编号" prop="apcId" />
          <el-table-column label="学生学号" prop="apcStuid" />
          <el-table-column label="处理状态">
            <template v-slot:="scope">
              <el-tag v-if="scope.row.aocFinalState===0" type="warning">未处理</el-tag>
              <el-tag v-else-if="scope.row.aocFinalState===1" type="success">已同意</el-tag>
              <el-tag v-else-if="scope.row.aocFinalState===2" type="danger">已拒绝</el-tag>
              <el-tag v-else type="info">处理中</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" prop="aocDate" />
          <el-table-column label="操作 ">
            <template v-slot:="scope">
              <!-- 详情按钮 -->
              <el-tooltip effect="dark" content="详情" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-info" size="mini" @click="showDetailsById(scope.row.apcId)" />
              </el-tooltip>
              <!-- 处理进度按钮 -->
              <el-tooltip effect="dark" content="处理流程" placement="top" :enterable="false">
                <el-button type="success" icon="el-icon-location-outline" size="mini" @click="showProgressBox(scope.row.apcId)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 更新个人信息表单对话框 -->
    <el-dialog
      title="编辑个人信息"
      :visible.sync="InfoFormDialogVisible"
      width="50%"
      center
      @close="editInfoDialogClosed"
    >
      <el-form ref="editInfoFormRef" :model="info" :rules="InfoFormRules" label-position="top" label-width="100px">
        <!-- 姓名与学号 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="info.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" prop="stuid">
              <el-input v-model="info.stuid" :disabled="editStuid" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 性别与学院 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="info.gender" :label="1">男</el-radio>
              <el-radio v-model="info.gender" :label="2">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学院" prop="college">
              <template>
                <el-select v-model="info.college" placeholder="请选择">
                  <el-option
                    v-for="item in colleges"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 手机与邮箱 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="info.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="info.email" :disabled="!editStuid" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 昵称 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="info.nickname" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 个性签名 -->
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="个性签名" prop="personalizedSignature">
              <el-input v-model="info.personalizedSignature" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="InfoFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo">提 交</el-button>
      </span>
    </el-dialog>
    <!--查看详情的对话框 -->
    <el-dialog
      v-loading="loading"
      element-loading-text="提交操作，请稍后......"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      title="申请详情"
      :visible.sync="DetailsDialogVisible"
      width="55%"
      @close="applyDetailsDialogClosed"
    >
      <el-form :model="applyDetails" label-width="100px" label-position="top">
        <el-form-item label="申请编号">
          <el-tag type="warning">{{ applyDetails.apcId }}</el-tag>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-tag v-if="applyDetails.aocFinalState===0" type="warning">未处理</el-tag>
          <el-tag v-else-if="applyDetails.aocFinalState===1" type="success">已同意</el-tag>
          <el-tag v-else-if="applyDetails.aocFinalState===2" type="danger">已拒绝</el-tag>
          <el-tag v-else type="info">处理中</el-tag>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-tag type="primary">{{ applyDetails.aocDate }}</el-tag>
        </el-form-item>
        <el-form-item label="申请人信息">
          <div>
            <el-table :data="applyTableInfo" border>
              <el-table-column align="center" label="姓名" prop="student.username" />
              <el-table-column align="center" label="学院" prop="student.college" />
              <el-table-column align="center" label="班级" prop="atStuclass" />
              <el-table-column align="center" label="学号" prop="student.stuid" />
              <el-table-column align="center" label="寝室" prop="atStudorm" />
              <el-table-column align="center" label="银行" prop="atStubank" />
              <el-table-column align="center" label="困难" prop="atStudiff" />
              <el-table-column align="center" label="手机" prop="student.phone" />
              <el-table-column label="身份证号" prop="atStuidcard" />
              <el-table-column label="银行卡号" prop="atStubankcard" />
            </el-table>
          </div>
        </el-form-item>
        <el-form-item label="岗位信息">
          <div>
            <el-table :data="jobInfo" border>
              <el-table-column align="center" label="岗位名称" prop="cenJobname" />
              <el-table-column align="center" label="用工单位" prop="cenUnit" />
              <el-table-column align="center" label="工作地址" prop="cenAddress" />
              <el-table-column align="center" label="负责人姓名" prop="fuzels.username" />
              <el-table-column align="center" label="负责人手机" prop="fuzels.phone" />
              <el-table-column align="center" label="负责人邮箱" prop="fuzels.email" />
              <el-table-column width="300px" align="center" label="工作内容" prop="cenDuty" />
              <el-table-column width="300px" align="center" label="工作要求" prop="cenRequest" />
            </el-table>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--查看处理进度的对话框 -->
    <el-dialog
      title="处理进度"
      :visible.sync="ProgressDialogVisible"
      width="40%"
    >
      <!-- timeline组件 -->
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in dealwithlist"
          :key="index"
        >
          <el-card>
            <el-tag v-if="activity.jdwResult===1" type="success">已同意</el-tag>
            <el-tag v-else type="danger">已拒绝</el-tag>
            <p>{{ activity.jdwContext }}提交于：{{ activity.jdwTime }}
            </p></el-card>

        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import myheader from '@/views/Header'
import avatar from '@/views/user/Icon'
import { validateNumber,
  checkName,
  numberLength,
  checkSpecificKey,
  validatePhone,
  validateEMail
} from '@/components/rules'
export default {
  components: { myheader, avatar },

  data() {
    return {
      // 更新个人信息时间
      DetailsDialogVisible: false,
      dateTime: '2020.04.03 13:15',
      colleges: [{
        value: '工学院',
        label: '工学院'
      }, {
        value: '理学院',
        label: '理学院'
      }, {
        value: '文学院',
        label: '文学院'
      }, {
        value: '商学院',
        label: '商学院'
      }, {
        value: '法学院',
        label: '法学院'
      }, {
        value: '设计艺术学院',
        label: '设计艺术学院'
      }
      ],
      info: {},
      // 更新个人信息对话框显示对象
      InfoFormDialogVisible: false,
      // 表单验证规则对象
      InfoFormRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        stuid: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' },
          { validator: numberLength, trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请输入学院名称', trigger: 'blur' },
          { validator: checkSpecificKey, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: validateEMail, trigger: 'blur' }
        ],
        personalizedSignature: [
          { required: true, message: '请输入个性签名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { validator: checkSpecificKey, trigger: 'blur' }
        ]
      },
      // 学号输入框是否禁用
      editStuid: true,
      // 岗位申请记录
      approList: [],
      // 岗位申请详情数据对象
      applyDetails: [],
      // 岗位申请学生数据
      applyTableInfo: [],
      // 岗位详细信息
      jobInfo: [],
      loading: false,
      // 处理流程数据
      dealwithlist: [],
      ProgressDialogVisible: false
    }
  },
  mounted() {
    this.init()
    this.getAppro()
  },
  methods: {
    // 初始化
    init() {
      this.info = this.$store.getters.getUser
      if (!this.info.stuid) {
        this.editStuid = false
        this.$alert('请先完善个人信息')
        this.InfoFormDialogVisible = true
      }
      console.log(this.info)
    },
    // 监听修改个人信息对话框关闭
    editInfoDialogClosed() {
      this.$refs.editInfoFormRef.resetFields()
    },
    // 展示修改信息对话框
    showEditInfoDialog() {
      this.InfoFormDialogVisible = true
    },
    // 提交修改信息
    editInfo() {
      this.$refs.editInfoFormRef.validate(async valid => {
        if (!valid) return
        await this.$http.post('profile/update', this.info)
          .then(res => {
            console.log(res)
            const { code, message, data } = res.data
            if (code !== 20000) return this.$message.error(message)
            this.$message.success(message)
            this.$store.dispatch('asyncUpdateUser', data)
            this.init()
            this.InfoFormDialogVisible = false
            this.$refs.updateInfo.initHeader()
          })
          .catch(err => {
          // console.log(err)
            this.$message.error('网络有问题：' + err)
          })
      })
    },
    // 获取岗位申请信息
    getAppro() {
      this.$http.get('accept/approlist/' + this.info.stuid)
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          this.approList = data
          console.log(this.approList)
        })
    },
    // 获取岗位申请的详细信息
    async  showDetailsById(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('accept/content/' + id)
      console.log(res)
      if (res.code !== 20000) {
        return this.$message.error(res.message)
      }
      this.applyDetails = res.data
      // 申请表及学生信息
      this.applyTableInfo.push(res.data.applytable)
      // 岗位
      this.jobInfo.push(res.data.centerjob)
      // console.log(this.applyDetails)

      this.DetailsDialogVisible = true
    },
    // 关闭详情对话框
    applyDetailsDialogClosed() {
      this.applyTableInfo = []
      this.jobInfo = []
    },
    // 处理进度
    async showProgressBox(id) {
      console.log('id=' + id)
      const { data: res } = await this.$http.get('accept/dealwith/' + id)
      console.log(res)
      if (res.code !== 20000) {
        return this.$message.error(res.message)
      }
      this.dealwithlist = res.data
      this.ProgressDialogVisible = true
    }

  }
}
</script>

<style lang="less" scoped>

span.name{
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
}
span{
    font-size:15px;
    color:#414a60
}
.el-card{
    .el-row{
        margin-top:20px
    }
}

</style>
