<template>
  <div>
    <Naver :is-login="isLogin" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/store/loginStore';

const loginStore = useLoginStore();
const { isLogin } = storeToRefs(loginStore);
</script>
