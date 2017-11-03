import { post, isEmpty } from "utils"
import utils from "./util"
import Message from '../ep-ui/package/message'

function obj2Json(data) {
  let res = []

  data.forEach((item) => {
    res.push(JSON.stringify(item))
  })
  return res
}

function keyCollect (data, pk) {
  let res = []

  data.forEach((item) => {
    res.push(item[pk])
  })
  return res
}

/**
 * 管理信息系统list功能封装
 * 所有列表内按钮方法的命名方式为handle+执行的动作
 * 所有按钮区的方法的命名方式为do+执行的动作
 * 如移除就是doRemove
 * 框架自己封装了一些方法如doAdd, doRemove, doChange
 * 这些关键字不能做定义，否则会发生修改错误
 * 框架统一了data的定义
 *  1、MIS模块的配置在open_setting上
 *  2、open_data为表格内部数据
 *  3、open_page为分页数据
 *  4、dom_data内部为dom变化所对应的数据
 *  5、重写created方法的时候需要加一句this.refresh，否则列表数据会消失
 */
export default {

  computed: {
    showTotal () {
      return '此模块一共有共有' + this.open_page.totalNum + '条数据'
    }
  },

  methods: {
    doAdd () {
      this.$refs.table.addRow()
    },
    doDelete () {
      this.$refs.table.deleteSelectRow()
    },
    doSave () {
      let vm = this
      this.$refs.table.getSaveData(function (data) {
        vm.loading = true
        var reqData = {}
        for (let item in data) {
          if (data.hasOwnProperty(item)) {
            if (item === 'delete') {
              try {
                reqData[item] = keyCollect(data[item], vm.settings.pk)
              } catch (e) {
                Message({
                  type: 'danger',
                  message: "配置项缺失或配置错误的主键！",
                  hasClose: true
                })
                return
              }
            } else {
              reqData[item] = obj2Json(data[item])
            }
          }
        }
        post(vm.saveApi, reqData)
        .then((responseData) => {
          vm.refresh()
        }).catch (e => {
          vm.loading = false
        })
      })
    },
    doReset () {
      this.$refs.table.reset()
    },
    doRefresh() {
      this.refresh(false)
    },
    reset(formName) {
      utils.reset(this[formName])
    },
    sigclick () {
      this.ep_data.unshift({ ...this.rowObj })
      this.$refs.table.setCurrentRow(this.ep_data[0])
    },
    refresh(initPage) {
      let vm = this
      vm.loading = true
      let formData = {}
      for (let variable in vm.searchForm) {
        if (vm.searchForm.hasOwnProperty(variable)) {
          vm.searchForm[variable] = utils.trim(vm.searchForm[variable])
          if (!isEmpty(vm.searchForm[variable])) {
            formData[variable] = vm.searchForm[variable]
          }
        }
      }
      if (initPage) {
        formData.rowsPerPage = this.ep_page.limit
        formData.pageNo = 1
        vm.ep_page.offset = 1
      } else {
        formData.rowsPerPage = vm.ep_page.limit
        formData.pageNo = vm.ep_page.offset
      }
      let body = formData;
      post(this.listApi, body)
      .then((responseData) => {
        vm.ep_data = responseData.data.result
        vm.totalcount = responseData.data.count
        vm.loading = false
      }).catch (e => {
        vm.loading = false
      })
    },

    handleSelectionChange(val) { this.selectLength = val.length },

    handleSizeChange(val) {
      this.ep_page.limit = val
      this.refresh(false)
    },
    handleCurrentChange(val) {
      this.ep_page.offset = val
      this.refresh(false)
    },

    //改变每页显示数量时
    handleChangePageSize (size) { this.open_page.showNum = size; this.refresh() }

  },
  // beforeDestroy () {
  //   let data = this.$store.getters.getPageData;
  //   data[this.ep_config.frontPath] = this.$data;
  //   this.$store.dispatch('changePageData', data);
  // },
  //取消焦点
  deactivated() {
    document.body.click();
  }
}
