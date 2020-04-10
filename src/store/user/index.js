const User = {
  // 状态(如果sessionStorage中有则取出，否则创建新的state)
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    // 登录用户对象
    user: {
      // 用户名
      username: '',
      // 学号
      stuid: '',
      // 昵称
      nickname: '',
      // 学院
      college: '',
      // 电话
      phone: '',
      // 邮箱
      email: '',
      // 头像
      icon: '',
      // 性别
      gender: '',
      // 个性签名
      personalized_signature: '',
      // 个人成长值
      growth: ''
    }
  },
  // 去状态中的值（计算属性）
  getters: {
    // 获取登录用户对象
    getUser(state) {
      return state.user
    }
  },
  // 更新状态,（想改变state的值，必须使用该mutations，缺点：同步）
  mutations: {
    // 更新登录用户对象
    updateUser(state, user) {
      state.user = user
    }
  },
  // 异步执行方法
  actions: {
    asyncUpdateUser(context, user) {
      context.commit('updateUser', user)
    }
  }

}

export default User
