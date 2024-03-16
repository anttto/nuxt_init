import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
  const isLogin = ref(false);
  const userCookie = useCookie('user');
  const user = ref(null);

  if (userCookie.value === undefined || userCookie.value === null) {
    userCookie.value = 'N';
  } else if (userCookie.value === 'N') {
    isLogin.value = false;
    // console.log('1');
  } else if (userCookie.value === 'Y') {
    isLogin.value = true;
    // console.log('2');
  }

  function updateLoginState(newUserData: any) {
    if (userCookie.value === 'Y') {
      isLogin.value = true;
      user.value = newUserData;
    } else {
      isLogin.value = false;
    }
  }

  return { isLogin, updateLoginState, user };
});
