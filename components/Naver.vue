<template>
  <div>
    <div id="naverIdLogin"></div>
    <br />
    <!-- <button @click="naverLoginClick">버튼</button> -->
    <button v-if="isLogin" @click="logout">로그아웃</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLoginStore } from '~/store/loginStore';
import { getData, setData } from 'nuxt-storage/local-storage';

const { updateLoginState } = useLoginStore();
const props = defineProps({
  isLogin: {
    type: Boolean,
  },
});

const naverLogin = ref(null);
const userId = ref(null);
const userCookie = useCookie('user');

onMounted(() => {
  naverLogin.value = new naver.LoginWithNaverId({
    clientId: '1hxGkQQ3RAfoOPKWzqaW', // Naver client key
    callbackUrl: 'http://localhost:3000/login/callback',
    loginButton: {
      color: 'green',
      type: 3,
      height: 20,
    },
  });
  naverLogin.value.init();
  //   naverLogin.value.logout();
});

const logout = () => {
  naverLogin.value.getLoginStatus(async (status) => {
    if (status) {
      const { accessToken } = naverLogin.value.accessToken;
      if (accessToken !== null && accessToken !== undefined) {
        // const url = `oauth2.0/token?grant_type=delete&client_id=1hxGkQQ3RAfoOPKWzqaW&client_secret=D29nsgpzXg&access_token=${accessToken}&service_provider=NAVER`;
        // const { data } = await useFetch(url);
        // if (data) {
        //   localStorage.removeItem('com.naver.nid.access_token');
        //   localStorage.removeItem('com.naver.nid.oauth.state_token');
        // }
        // console.log(accessToken);
        naverLogin.value.logout();
        // console.log(data.value);
        userCookie.value = 'N'; // 로그인 성공 : user 쿠키에 true 입력
        await navigateTo('/');
        window.location.reload(); // 페이지 새로고침
      }
    } else {
      console.log('로그인 되어 있지 않음');
    }
  });
};

//
//
//
//
//
//
//

// const NAVER_CLIENT_ID = '1hxGkQQ3RAfoOPKWzqaW';
// const REDIRECT_URI = 'http://localhost:3000/login/callback';
// const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${Math.random().toString(36).substring(3, 14)}&service_provider=NAVER`;
// const naverLoginClick = () => {
//   window.location.href = NAVER_AUTH_URL;
// };
</script>

<style lang="scss" scoped>
#naverIdLogin {
  width: 200px;
}
button {
  width: 100px;
  display: inline-block;
  height: 40px;
  margin: 0 2px;
  background-color: #333;
  color: #fff;
}
</style>
