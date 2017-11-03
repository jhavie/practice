import fetchMock from 'fetch-mock'
import FakeRest from 'fakerest'

function api(data) {
  let res = data
  return res
}

var data = {
  "shipAgentData/getShipAgentDataList": api({
    "data": {
      "total": 76,
      "rows": [{"status": "1", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 15:52:16","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001340","backField1":"10241","id":58354,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283676","createTime":"2017-10-17 15:52:16","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "2", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 15:45:43","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001339","backField1":"10241","id":58353,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283674","createTime":"2017-10-17 15:45:43","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "3", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 15:41:30","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001338","backField1":"10241","id":58352,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283673","createTime":"2017-10-17 15:41:30","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "4", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 15:39:20","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001337","backField1":"10241","id":58351,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283672","createTime":"2017-10-17 15:39:20","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "4", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 15:35:08","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001336","backField1":"10241","id":58350,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283671","createTime":"2017-10-17 15:35:08","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "1", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 15:31:08","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001335","backField1":"10241","id":58349,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283670","createTime":"2017-10-17 15:31:08","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "2", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 13:15:17","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001334","backField1":"10241","id":58348,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283669","createTime":"2017-10-17 13:15:17","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "2", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-17 13:11:35","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001333","backField1":"10241","id":58347,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101700000283668","createTime":"2017-10-17 13:11:35","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "3", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-13 09:27:39","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001332","backField1":"10241","id":58346,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101300000283590","createTime":"2017-10-13 09:27:39","invoicePayer":"20160101999","invoicePayerTel":"12321"},{"status": "2", "devanning":"2302500000","devanningTel":"21321","updateTime":"2017-10-13 09:18:22","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001331","backField1":"10241","id":58345,"invoicePayerContact":"管理员","paymentNo":"EPASS002017101300000283587","createTime":"2017-10-13 09:18:22","invoicePayer":"20160101999","invoicePayerTel":"12321"}]
    },
    "flag": "T"
  }),
  "invoice/detail": api({
    "data": {
      "rows": [{"payableAmount":3.62,"payeeCode":"132208081","paidAmount":3.62,"payableRmb":3.62,"currency":"CNY","status":30,"payableCurr":"CNY","id":10106925},{"payableAmount":3.62,"payeeCode":"132208081","paidAmount":3.62,"payableRmb":3.62,"currency":"CNY","status":30,"payableCurr":"CNY","id":10106926}],
      "result": {"notes": "这是备注这是备注这是备注这是备注", "devanning":"321","devanningTel":"21321","updateTime":"2017-08-09 17:02:51","taxpayerId":"1111","devanningContact":"3213","invoiceCode":"000000001208","id":58222,"invoicePayerContact":"管理员","createTime":"2017-08-09 17:02:51","invoicePayer":"20160101999","invoicePayerTel":"12321"}
    },
    "flag": "T"
  }),
  "invoice/save": api({
    "flag": "T"
  })
  ,"shipAgentData/getShipHsCode": api({
    "data": [
      { "chance": "64.56", "hsCode": "2302500000" },
      { "chance": "23.11", "hsCode": "6913100000" },
      { "chance": "12.33", "hsCode": "4811900000" }
    ],
    "flag": "T"
  })
  // ,"mathineLearning/submit": api({
  //   "data": [
  //     { "chance": "90", "hsCode": "2302500000" }
  //   ],
  //   "flag": "T"
  // })
  // ,"mathineLearning/submit": api({
  //   "data": [],
  //   "flag": "T"
  // })
}

const restServer = new FakeRest.FetchServer(global.HOST)
restServer.init(data)
fetchMock.mock(`^${global.HOST}`, restServer.getHandler())
