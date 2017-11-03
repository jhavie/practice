import * as test from 'utils/validate.js'
import chai from 'chai'
import 'utils/string'

let expect = chai.expect

describe('验证', function () {

  it('手机号验证:14012882930', function () {
    let status = test.validatePhone('14012882930')
    expect(status).to.be.equal(false)
  })

  it('手机号验证:13012882930', function () {
    let status = test.validatePhone('13012882930')
    expect(status).to.be.equal(true)
  })

  it('是否为公司邮箱:merjiezo@gmail.com', function () {
    let status = test.isWscnEmail('merjiezo@gmail.com')
    expect(status).to.be.equal(false)
  })

  it('是否为公司邮箱:jzmiao@easipass.com', function () {
    let status = test.isWscnEmail('jzmiao@easipass.com')
    expect(status).to.be.equal(true)
  })

  it('是否为合法URL:http://www.baidu.cd', function () {
    let status = test.validateURL('httd://www.baidu.com')
    expect(status).to.be.equal(false)
  })

  it('是否为合法URL:http://www.baidu.com', function () {
    let status = test.validateURL('http://www.baidu.com')
    expect(status).to.be.equal(true)
  })

  it('是否为小写字母:qWer', function () {
    let status = test.validateLowerCase('qWer')
    expect(status).to.be.equal(false)
  })

  it('是否为小写字母:qwer', function () {
    let status = test.validateLowerCase('qwer')
    expect(status).to.be.equal(true)
  })

  it('是否为大写字母:qwER', function () {
    let status = test.validateUpperCase('qwER')
    expect(status).to.be.equal(false)
  })

  it('是否为大写字母:QWER', function () {
    let status = test.validateUpperCase('QWER')
    expect(status).to.be.equal(true)
  })

  it('登陆验证，带手机号', function () {
    test.validateLoginSign((status, info) => {
      expect(status).to.be.equal(true)
    }, {
      test1: '345',
      id: '13012882930'
    })
  })

  it('登陆验证，无手机号，参数项为空', function () {
    test.validateLoginSign((status, info) => {
      expect(status).to.be.equal(false)
      expect(info).to.be.equal('参数项不能为空')
    }, {
      test1: ''
    })
  })

  it('登陆验证，手机号错误', function () {
    test.validateLoginSign((status, info) => {
      expect(status).to.be.equal(false)
      expect(info).to.be.equal('手机号不正确')
    }, {
      test1: '345',
      id: '130128829300'
    })
  })

  it('验空参数，无空参', function () {
    test.validateInput((status, info) => {
      expect(status).to.be.equal(true)
    }, {
      test1: '123',
      test2: '123'
    })
  })

  it('验空参数，有空参', function () {
    test.validateInput((status, info) => {
      expect(status).to.be.equal(false)
      expect(info).to.be.equal('参数项不能为空')
    }, {
      test1: '123',
      test2: ''
    })
  })

})
