import test from 'utils/localStorage.js'
import chai from 'chai'

let expect = chai.expect

describe('localStorage工具方法测试', function () {

  it('插入测试', function () {
    test.setLocalStorage('test', 'test', 1)

    expect(test.getLocalStorage('test')).to.be.equal('test')
  })

  it('删除测试', function () {
    test.setLocalStorage('test', 'test', 1)
    test.delLocalStorage('test')
    expect(test.getLocalStorage('test')).to.be.equal('')
  })

  it('过期时间测试', function () {
    test.setLocalStorage('test', 'test', 0.0000000125)

    setTimeout(() => {
      expect(test.getLocalStorage('test')).to.be.equal('')
    }, 1000)
  })
})
