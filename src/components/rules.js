// 纯数字校验
export const validateNumber = (rule, value, callback) => {
  const numberReg = /^\d+$|^\d+[.]?\d+$/
  if (value !== '') {
    if (!numberReg.test(value)) {
      callback(new Error('请输入数字'))
    } else {
      callback()
    }
  } else {
    callback(new Error('请输入值'))
  }
}
// 中文校验
export var checkName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入姓名'))
  }
  if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
    callback(new Error('不可输入特殊字符、数字'))
  } else {
    callback()
  }
}
// 验证手机号/固话的校验规则
export var checkPhone = (rule, value, callback) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
}

// 数字位数验证
export const numberLength = (rule, value, callback) => {
  if (value.length !== 12) {
    callback(new Error('请输入正确学号位数'))
  } else {
    callback()
  }
}

// 是否大写字母
export function validateUpperCase(val) {
  const reg = /^[A-Z]+$/
  return reg.test(val)
}

// 密码校验
export const validatePsdReg = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
    callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
  } else {
    callback()
  }
}

// 最多一位小数
export const onePoint = (rule, value, callback) => {
  if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
    callback(new Error('最多一位小数！！！'))
  } else {
    callback()
  }
}

// 身份证号验证
export function validateIdNo(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}
// 手机号
export function validatePhone(rule, value, callback) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  }
}
// 手机号或固话
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
}
// 是否合法IP地址
export function validateIP(rule, value, callback) {
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的IP地址'))
    } else {
      callback()
    }
  }
}
// 验证内容是否包含英文数字以及下划线
export function isPassword(rule, value, callback) {
  const reg = /^[_a-zA-Z0-9]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由英文字母，数字以及下划线组成'))
    } else {
      callback()
    }
  }
}
// 自动检验数值的范围
export function checkMax20000(rule, value, callback) {
  if (value === '' || value === undefined || value == null) {
    callback()
  } else if (!Number(value)) {
    callback(new Error('请输入[1,20000]之间的数字'))
  } else if (value < 1 || value > 20000) {
    callback(new Error('请输入[1,20000]之间的数字'))
  } else {
    callback()
  }
}
// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }, 0)
}
// 特殊字符
export function checkSpecificKey(rule, value, callback) {
  const reg = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
  for (var i = 0; i < value.length; i++) {
    if (reg.indexOf(value.substr(i, 1)) !== -1) {
      callback(new Error('只能输入数字或字母'))
    } else {
      callback()
    }
  }
  return true
}

// 邮箱验证
export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}
