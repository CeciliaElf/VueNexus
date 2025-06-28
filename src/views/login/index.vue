<template>
    <div class="login-box">
        <div class="login-form">
            <p class="login-title">企业中后台管理系统</p>
            <el-form :model="userInfo" :rules="rules" center class="login-info">
                <el-form-item prop="username" >
                    <el-input v-model="userInfo.username" placeholder="请输入用户名" :prefix-icon="User" clearable />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="userInfo.password" placeholder="请输入密码" :prefix-icon="Lock" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="userLogin">登入</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent as _defineComponent } from "vue";
import { useUserStore } from "@/store/user";
import { Lock, User } from "@element-plus/icons-vue";
import { reactive } from "vue";
import router from "@/router";

const userStore = useUserStore();
console.log(userStore);
const userInfo = reactive({
    username: '',
    password: '',
})
const rules = reactive({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        }
    ]
})
function userLogin() {
    userStore.storeUserLogin(userInfo).then(() => {
        router.push('/')
    }).catch((error) => {
        console.error('Login failed:', error);
    });
}
</script>

<style lang="less" scoped>
.login-box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    background: var(--nexus--background-color);
    .login-form {
        .login-title {
            // 标题美化
            font-size: 32px; // 更大的字号，突出标题
            font-weight: 700; // 加粗，强调
            color: var(--nexus--font-color-primary); // 使用深棕色字体，与浅背景形成高对比
            margin-bottom: 25px; // 标题下方留出更多空间
            letter-spacing: 1px; // 增加一点字间距，提升美观度
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05); // 增加一点点柔和的文字阴影
        }
        display: flex;
        width: 300px;
        text-align: center;
        flex-direction: column; // 沿着 垂直方向（从上到下） 堆叠排列
        padding: 25px;
        border-radius: 10px;
        background: var(--nexus--color--main-light-2);
        .login-info {
            height: max-content;
        }
    }
}
</style>
