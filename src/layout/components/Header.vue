<template>
    <div class="header">
        <div class="flex-center">logo区域</div>
        <div class="flex-grow"></div>
        <div class="flex-center m05">
            <i-ep-user></i-ep-user>
            {{ username }}
        </div>
        <div class="flex-center m05 setting" @click="handerSetting">
            <i-ep-setting></i-ep-setting>
        </div>
    </div>
    <el-drawer v-model="showSetting" :show-close="false" :with-header="false" size="300">
        <div class="setting-header">
            <h2>项目配置</h2>
            <i-ep-close @click="handerClose"></i-ep-close>
        </div>
        <div class="out">
            <el-button type="primary" size="default" @click="logout">登出</el-button>
        </div>
    </el-drawer>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStoreHook } from '@/store/user';
import router from '@/router';

const userStore = useUserStoreHook()
const username = userStore.username
const showSetting = ref(false)

const handerSetting = () => {
    showSetting.value = true;
}

const handerClose = () => {
    showSetting.value = false;
}

const logout = () => {
    sessionStorage.removeItem('userInfo');
    router.push('/login');
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    width: 100%;
    height: 60px;
    box-shadow: 0 0 20px rgb(195 223 252 / 40%);
}

.setting {
    cursor: pointer;
}

.setting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: var(--nexus--font-color-primary);
}

.out {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
