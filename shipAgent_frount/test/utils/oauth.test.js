import Vue from 'vue'
import { getAuth } from 'utils/oauth.js'
import chai from 'chai'
import { ToastPlugin } from 'vux'

let expect = chai.expect
Vue.use(ToastPlugin)

/**
 * 需手动设置oauth属性
 */
describe('权限模块测试，测试环境为登轮许可证0，搭靠报备1，登轮报备2', function () {

  it('board搜索模块测试', function () {
    getAuth('/biz/boardSearch', function (canGo, rtnPath) {
      expect(canGo).to.be.equal(true)
      expect(rtnPath).to.be.equal(undefined)
    })
  })

  it('board编辑模块测试', function () {
    getAuth('/biz/boardInput', function (canGo, rtnPath) {
      expect(canGo).to.be.equal(true)
      expect(rtnPath).to.be.equal(undefined)
    })
  })

  it('stay搜索模块测试', function () {
    getAuth('/biz/staySearch', function (canGo, rtnPath) {
      expect(canGo).to.be.equal(true)
      expect(rtnPath).to.be.equal(undefined)
    })
  })
  it('stay编辑模块测试', function () {
    getAuth('/biz/stayInput', function (canGo, rtnPath) {
      expect(canGo).to.be.equal(false)
      expect(rtnPath).to.be.equal('#')
    })
  })

  it('takeOn搜索模块测试', function () {
    getAuth('/biz/takeOnSearch', function (canGo, rtnPath) {
      expect(canGo).to.be.equal(false)
      expect(rtnPath).to.be.equal('/home')
    })
  })
  it('takeOn编辑模块测试', function () {
    getAuth('/biz/takeOnInput', function (canGo, rtnPath) {
      expect(canGo).to.be.equal(false)
      expect(rtnPath).to.be.equal('/home')
    })
  })

})
