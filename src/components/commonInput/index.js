//index.js
//获取应用实例
import request from 'src/utils/request.js'
const app = getApp()

Component({
  // 私有数据，可用于模板渲染
  data: {
    value: '', // 输入框的值
    valueFocus: false, // 输入框是否聚焦
    valueErrorDesc: true, // 错误描述是否显示，true：不显示；false：显示
    valueCheckStatus: true, // 输入框的检查状态，true：合格；false：不合格
    valueClear: false, // 清空按钮的状态
    captchaUrl: '', // 图形验证码的图片路径
    captchaValue: '', // 输入的图形验证码
    smsText: '获取验证码', // 短信验证码区域的显示文案
    smsTimer: undefined, // 短信验证码的计时器
    smsStatus: true // 短信验证码区域的可点击状态，true：表示可点击；false：表示不可点击
  },
  // 传入数据
  properties: {
    type: { // 输入框类型，tel：手机号；captcha：图形验证码；sms：短信验证码；text：普通文本；password：登录密码
      type: String,
      value: 'text'
    },
    placeholder: {
      type: String, // 输入框的placeholder文案
      value: ''
    },
    hasClearIcon: { // 是否清空图标，true：有；false：没有；默认有
      type: Boolean,
      value: true
    },
    phone: { // 手机号
      type: String,
      value: ''
    },
    captcha: { // 图形验证码
      type: String,
      value: ''
    },
    refresh: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    refresh (value) {
      if (value) {
        this.getCaptchaUrl()
      }
    }
  },
  // 组件生命周期函数-在组件布局完成后执行)
  ready () {
    this.initData()
  },
  moved () {
    this.setData({ smsTimer: clearInterval(this.data.smsTimer) })
  },
  //组件方法
  methods: {
    // 初始化数据
    initData () {
      // 图形验证码
      if (this.properties.type === 'captcha') {
        this.getCaptchaUrl()
      }
    },
    // 清空输入框
    clearCommonInput () {
      this.setData({
        value: '',
        valueErrorDesc: true,
        valueCheckStatus: false,
        valueClear: false,
      }, () => {
        this.setData({
          valueFocus: true
        })
      })
      this.triggerEvent('input', {
        type: this.properties.type,
        value: this.data.value,
        errorDesc: this.data.valueErrorDesc,
        checkStatus: this.data.valueCheckStatus
      })
    },
    // 输入框聚焦
    emitValueFocus () {
      this.setData({
        valueClear: this.data.value.length > 0 ? true : false
      })
    },
    // 输入框失去焦点
    emitValueBlur (e) {
      let value = e.detail.value
      // 判断当前类型
      if (this.properties.type === 'tel') {
        this.setData({
          value,
          valueErrorDesc: app.globalData.commonFun.isPhone(value),
          valueCheckStatus: app.globalData.commonFun.isPhone(value)
        })
      } else if (this.properties.type === 'captcha') {
        this.setData({
          value,
          valueErrorDesc: app.globalData.commonFun.checkCaptcha(value),
          valueCheckStatus: app.globalData.commonFun.checkCaptcha(value)
        })
      } else if (this.properties.type === 'sms') {
        this.setData({
          value,
          valueErrorDesc: app.globalData.commonFun.checkSms(value, 4),
          valueCheckStatus: app.globalData.commonFun.checkSms(value, 4)
        })
      } else if (this.properties.type === 'text') {
        this.setData({
          value,
          valueErrorDesc: value.length > 0 ? true : false,
          valueCheckStatus: value.length > 0 ? true : false
        })
      } else if (this.properties.type === 'password') {
        this.setData({
          value,
          valueErrorDesc: app.globalData.commonFun.isPassword(value),
          valueCheckStatus: app.globalData.commonFun.isPassword(value)
        })
      }

      this.triggerEvent('input', {
        type: this.properties.type,
        value: this.data.value,
        errorDesc: this.data.valueErrorDesc,
        checkStatus: this.data.valueCheckStatus
      })
    },
    // 输入框输入
    emitValueInput (e) {
      let value = e.detail.value

      // 判断当前类型
      if (this.properties.type === 'tel') {
        this.setData({
          value,
          valueErrorDesc: true,
          valueCheckStatus: app.globalData.commonFun.isPhone(value),
          valueClear: value.length > 0 ? true : false
        })
      } else if (this.properties.type === 'captcha') {
        this.setData({
          value,
          valueErrorDesc: true,
          valueCheckStatus: app.globalData.commonFun.checkCaptcha(value)
        })
      } else if (this.properties.type === 'sms') {
        this.setData({
          value,
          valueErrorDesc: true,
          valueCheckStatus: app.globalData.commonFun.checkSms(value, 4)
        })
      } else if (this.properties.type === 'text') {
        this.setData({
          value,
          valueErrorDesc: true,
          valueCheckStatus: value.length > 0 ? true : false,
          valueClear: value.length > 0 ? true : false
        })
      } else if (this.properties.type === 'password') {
        this.setData({
          value,
          valueErrorDesc: true,
          valueCheckStatus: app.globalData.commonFun.isPassword(value),
          valueClear: value.length > 0 ? true : false
        })
      }

      this.triggerEvent('input', {
        type: this.properties.type,
        value: this.data.value,
        errorDesc: this.data.valueErrorDesc,
        checkStatus: this.data.valueCheckStatus
      })
    },
    // 获取图形验证码
    getCaptchaUrl () {
      request.codeRes('/checkCodeImg.do', {}).then(res => {
        this.setData({
          captchaUrl: 'data:image/png;base64,' +  wx.arrayBufferToBase64(res)
        })
      })
    },
    // 获取短信验证码
    getSmsCode () {
      if (!this.data.smsStatus) return
      if (!this.properties.phone) {
        app.globalData.commonFun.showToast('请输入手机号')
        return false
      }
      if (!app.globalData.commonFun.isPhone(this.properties.phone)) {
        app.globalData.commonFun.showToast('请输入正确的手机号')
        return false
      }
      if (!this.properties.captcha) {
        app.globalData.commonFun.showToast('请输入图形验证码')
        return false
      }
      if (!app.globalData.commonFun.checkCaptcha(this.properties.captcha)) {
        app.globalData.commonFun.showToast('请输入完整的图形验证码')
        return false
      }

      this.setData({ smsStatus: false })
      let data = {
        LOGIN_NAME: this.data.phone,
        CHECKCODE: this.data.captcha
      }
      request.commonRes('/rest/fund/wechatMng/sendCode', data, '').then((res) => {
        if (res.status === 'success') { // 获取成功
          let smsText = ''
          let smsCount = 60
          let smsTimer = setInterval(() => {
            smsCount--
            smsText = `${smsCount}S`
            if (smsCount <= 0) {
              clearInterval(smsTimer)
              this.setData({
                smsTimer: clearInterval(this.data.smsTimer),
                smsText: '获取验证码',
                smsStatus: true
              })
            } else {
              this.setData({ smsText })
            }
          }, 1000)
          app.globalData.commonFun.showToast(res.message || '发送成功')
        } else { // 获取失败
          app.globalData.commonFun.showToast(res.message)
          this.setData({ smsStatus: true })
          this.triggerEvent('errorcode')
        }
      }).catch((err) => {
        app.globalData.commonFun.showToast(err.message)
        this.setData({ smsStatus: true })
        this.triggerEvent('errorcode')
      })
    }
  }
})
