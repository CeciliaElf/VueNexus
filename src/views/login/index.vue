<template>
    <div>login</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
console.log(userStore);
</script>
