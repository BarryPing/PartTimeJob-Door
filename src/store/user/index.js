const User = {
  // 状态(如果sessionStorage中有则取出，否则创建新的state)
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    // access_token
    token: '',
    // 登录用户对象
    user: {
      // 用户名
      username: '',
      // 学号
      stuid: '',
      // 性别
      gender: '',
      // 昵称
      nickname: '',
      // 学院
      college: '',
      // 手机
      phone: '',
      // 邮箱
      email: '',
      // 头像
      icon: '',
      // 是否贫困生
      needyStudents: '',
      // 个性签名
      personalizedSignature: '',
      // 成长值
      growth: ''
    }
  },
  // 去状态中的值（计算属性）
  getters: {
    // 获取登录用户对象
    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    }
  },
  // 更新状态,（想改变state的值，必须使用该mutations，缺点：同步）
  mutations: {
    // 更新登录用户对象
    updateUser(state, user) {
      state.user = user
    },
    updateToken(state, token) {
      state.token = token
    }
  },
  // 异步执行方法
  actions: {
    // 异步更新user
    asyncUpdateUser(context, user) {
      context.commit('updateUser', user)
    },
    // 异步更新token
    SET_TOKEN(context, token) {
      context.commit('updateToken', token)
    }
  }

}

export default User
