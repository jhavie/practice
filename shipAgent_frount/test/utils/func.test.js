import * as test from 'utils/func.js'
import chai from 'chai'

let expect = chai.expect

describe('功能方法', function () {

  it('判断是否为微信入口', function () {
    expect(test.is_weixn()).to.be.equal(false)
  })
})
