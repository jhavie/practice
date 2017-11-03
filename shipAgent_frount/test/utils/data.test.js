import * as test from 'utils/data.js'
import chai from 'chai'

let expect = chai.expect

describe('数据操作', function () {

  it('拼接URL字符串方法', function () {
    let data = test.obj2UrlForm({
      id: '13012882930',
      test: 'test',
      test1: 'test1'
    })
    expect(data).to.be.equal('id=13012882930&test=test&test1=test1')
  })

  it('接口判断错误方法:flag: \'F\'', function () {
    let status = test.dataErr({
      flag: 'F'
    })
    expect(status).to.be.equal(false)
  })

  it('接口判断错误方法:flag: \'T\'', function () {
    let status = test.dataErr({
      flag: 'T'
    })
    expect(status).to.be.equal(true)
  })

  it('接口判断错误方法:code: \'0\'', function () {
    let status = test.dataErr({
      code: '0'
    })
    expect(status).to.be.equal(false)
  })

  it('接口判断错误方法:code: \'1\'', function () {
    let status = test.dataErr({
      code: '1'
    })
    expect(status).to.be.equal(true)
  })

  it('克隆对象', function () {
    let beenCloned = {
      id: '13012882930',
      test: 'test'
    }
    let cloneObj = test.cloneObj(beenCloned)
    beenCloned.id = 'merjiezo'

    expect(cloneObj.id).to.be.equal('13012882930')
  })

  it('添加属性', function () {
    let data = [
      { id: 'test' },
      { id: 'test1' },
      { id: 'test2' }
    ]
    test.addProps(data, {
      edit: false
    })

    expect(data[0].edit).to.be.equal(false)
    expect(data[1].edit).to.be.equal(false)
  })

  it('对象合并', function () {
    let obj = {
      id: 'test',
      test: 'test'
    }
    let obj1 = {
      id: 'testId',
      test1: 'test1'
    }

    let mergeObj = test.merge(obj, obj1)
    expect(mergeObj.id).to.be.equal('testId')
    expect(mergeObj.test).to.be.equal('test')
    expect(mergeObj.test1).to.be.equal('test1')
  })

  it('Object是否为空', function () {
    expect(test.objIsEmpty(undefined)).to.be.equal(true)
  })

  it('Object是否为空', function () {
    expect(test.objIsEmpty(null)).to.be.equal(true)
  })

  it('Object是否为空', function () {
    expect(test.objIsEmpty({})).to.be.equal(true)
  })

  it('Object是否为空', function () {
    expect(test.objIsEmpty({
      id: 'merjiezo'
    })).to.be.equal(false)
  })

})
