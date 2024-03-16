<template>
  <div class="header bg-lime-800">
    <h1>로그인 해야 내용 보임 ^^</h1>
    <Login />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoginStore } from '~/store/loginStore';

const loginStore = useLoginStore();
const { isLogin, user } = storeToRefs(loginStore);

// console.log(user.value);
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  color: #fff;
}
</style>
