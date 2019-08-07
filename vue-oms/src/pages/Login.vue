<template>
<div>
  <div
      class="user-page"
      @keyup.enter="login"
  >
    <div class="user-page-title">登录</div>
    <el-form
        class="user-form"
        label-width="100px"
        :rules="rules"
        :model="ruleForm"
        status-icon
        ref="ruleForm"
    >
      <el-form-item
          label="用户名："
          prop="username"
      >
        <el-input
            :autofocus="true"
            placeholder="请输入用户名／手机号"
            v-model="ruleForm.username"
        />
      </el-form-item>
      <el-form-item
          label="密码："
          prop="password"
      >
        <el-input
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.password"
        />
      </el-form-item>
      <div class="user-page-btn">
        <el-form-item>
          忘记密码？
          <span
              @click="toLink('reset')"
              class="text-blue cursor-pointer"
          >
            找回密码
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
              @click.native="login()"
              type="success"
              :loading="submitBtn.isBtnLoading"
              :disabled="submitBtn.isDisabled"
          >
            {{submitBtn.btnText}}
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.match(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/)) {
        callback();
      } else if (value.indexOf(" ") != -1) {
        callback(new Error('密码不能包含空格'));
      } else {
        callback(new Error("密码不正确"));
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      userId: '',
      rules: {
        username: [{
            required: true,
            message: '请输入用户名或手机号',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 20,
            message: '用户名或手机号不正确',
            trigger: 'blur'
          }
        ],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      },
      submitBtn: {
        btnText: '登录',
        isLoading: false,
        isDisabled: false,
      },
      times: 60
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    },

  },
  methods: {
    getUser() {
      this.$http('getUser', {}).then((results) => {
        if (results.data && results.data.code === 0) {
          this.$store.state.common.users = results.data.data;
          this.pbFunc.setLocalData('users', results.data.data, true);
        }
      }).catch((err) => {
        this.$message.error('获取用户信息失败');
      })
    },
    loginAjax() {
      return new Promise((resolve, reject) => {
        // this.ruleForm.verify_key = this.verifyCodeData.verify_key;
        this.submitBtn.isDisabled = true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.submitBtn.btnText = '登录中';
            this.submitBtn.isBtnLoading = true;
            this.$http('login', this.ruleForm).then((results) => {
              this.submitBtn.btnText = '登录';
              this.submitBtn.isDisabled = false;
              this.submitBtn.isBtnLoading = false;
              if (results.data && results.data.code === 0) {
                resolve(results);
                this.pbFunc.setLocalData('token', results.data.data.ticket, true);
                this.getUser();
              } else {
                if (results.data && results.data.code === 600) {
                  this.userId = results.data.data.id;
                }
                reject(results);
              }
            }).catch((err) => {
              this.$message.error('登录失败');
              this.submitBtn.isDisabled = false;
              this.submitBtn.isBtnLoading = false;
              reject(err);
            })
          } else {
            this.submitBtn.isDisabled = false;
          }
        });
      })
    },
    getMenusList() {
      this.$http('getMenusList').then((results) => {
        if (results.data && results.data.code === 0) {
          if (results.data.data.length) {
            this.pbFunc.setLocalData('menuList', results.data.data, true);
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$emit('login');
          } else {
            this.$alert('还没有设置权限！请联系管理员', '请注意', {
              confirmButtonText: '关闭',
            });
          }
        }
      }).catch((err) => {
        this.refreshVaImg();
        this.$message.error('登录失败');
      })

    },
    login() {
      this.loginAjax().then((results) => {
        this.getMenusList();
      })
    },
    toLink(type) {
      if (type === 'register') {
        this.$router.push({
          path: '/register'
        });
      } else if (type === 'reset') {
        this.$router.push({
          path: '/forgetPassword'
        });
      } else if (type === 'company') {
        this.$router.push({
          path: "registerCompany",
          query: {
            user_id: this.userId
          }
        });
      }
    },
  },
}
</script>

<style scoped lang="less">
.des {
    width: 300px;
    margin-bottom: 15px;
}
</style>
