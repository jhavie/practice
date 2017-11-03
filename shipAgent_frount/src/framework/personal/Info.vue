<template>
    <div class="contents-card card-personal-form">
        <div>个人信息</div>
        <div class="personal-form-group">
            <ep-form ref="form" name-width="100px">
                <ep-form-item label="账号">
                    <ep-input disabled v-model="form.id"></ep-input>
                </ep-form-item>
                <ep-form-item label="用户名中文">
                    <ep-input v-model="form.name"></ep-input>
                </ep-form-item>
                <ep-form-item label="公司">
                    <ep-input v-model="form.userCompany"></ep-input>
                </ep-form-item>
                <ep-form-item label="当前权限">
                    <ep-input v-model="form.permission" disabled></ep-input>
                </ep-form-item>
                <ep-form-item label="状态">
                    <ep-input v-model="form.status" disabled></ep-input>
                </ep-form-item>
                <ep-form-item>
                    <ep-button type="primary">提交</ep-button>
                    <ep-button type="warning">重置</ep-button>
                </ep-form-item>
            </ep-form>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            form: {
                id: 'easipass',
                name: '',
                userCompany: '上海亿通国际股份有限公司',
                permission: '管理员权限',
                status: '启用'
            }
        }
    },

    created() {
        
    },
    methods: {
        
    }
}
</script>

<style>

</style>