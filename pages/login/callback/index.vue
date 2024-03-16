<template>
  <div>콜백!</div>
</template>

<script setup>
definePageMeta({
  layout: 'login',
});
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoginStore } from '~/store/loginStore';
import { getData, setData } from 'nuxt-storage/local-storage';

const loginStore = useLoginStore();
const { updateLoginState } = useLoginStore();
const { isLogin, user } = storeToRefs(loginStore);

const userCookie = useCookie('user');
const ACCESS_TOKEN = ref(null);

const route = useRoute();
const router = useRouter();

// const NAVER_CLIENT_ID = '1hxGkQQ3RAfoOPKWzqaW';
// const REDIRECT_URI = 'http://localhost:3000/login/callback';

onMounted(() => {
  const naverLogin = new naver.LoginWithNaverId({
    clientId: '1hxGkQQ3RAfoOPKWzqaW',
  });

  naverLogin.init();

  // 정보 데이터
  naverLogin.getLoginStatus(async (status) => {
    if (status) {
      console.log('로그인');
      userCookie.value = 'Y'; // 로그인 성공 : user 쿠키에 true 입력
      await navigateTo('/');
      window.location.reload();
    } else {
      console.log('AccessToken이 올바르지 않습니다.');
    }
  });
});

// const useGetToken = () => {
//   const { data } = useFetch(
//     `/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${Math.random().toString(36).substring(3, 14)}&service_provider=NAVER`,
//     {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   );

//   console.log(data.value);
// };
// useGetToken();

// const NAVER_CODE = decodeURIComponent(route.query.code);
// const NAVER_STATE = decodeURIComponent(route.query.state);

// access_token
const { hash } = router.currentRoute.value;
if (hash) {
  const params = new URLSearchParams(hash.substring(1)); // '#' 제거 후 파싱
  const accessToken = params.get('access_token');
  if (accessToken) {
    ACCESS_TOKEN.value = accessToken;
    // console.log(accessToken);
  }
}

// const NAVER_CLIENT_ID = '1hxGkQQ3RAfoOPKWzqaW';
// const NAVER_CLIENT_SECRET = 'D29nsgpzXg';
// // const REDIRECT_URI = 'http://localhost:3000/login/callback';

// const TOKEN_URL = '/oauth2.0/token';

// const params = new URLSearchParams({
//   grant_type: 'authorization_code',
//   client_id: NAVER_CLIENT_ID,
//   client_secret: NAVER_CLIENT_SECRET,
//   code: NAVER_CODE,
//   state: NAVER_STATE,
// });

// const accessToken = ref(null);

// const useGetToken = () => {
//   const { data } = useFetch(TOKEN_URL, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: params.toString(),
//   });
//   console.log('1');
//   console.log(data.value);
//   accessToken.value = data.value?.access_token;
//   userCookie.value = 'Y';
//   isLogin.value = true;
// };
// // AAAANjU8AzIzdKWitAIOw_eUzDEVwY6xcd9jQX8s9CZXbKqa7ascXxdYUU7hrF7Y_SU1NIMBIKmk0CvXt3ovVhe0Cns
// // AAAANjU8AzIzdKWitAIOw_eUzDEVwY6xcd9jQX8s9CZXbKqa7ascXxdYUU7hrF7Y_SU1NIMBIKmk0CvXt3ovVhe0Cns

// useGetToken();
// console.log('accessToken', accessToken.value);

// const useGetUserData = () => {
//   const { data, pending } = useFetch('/v1/nid/me', {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken.value}`,
//     },
//   });
//   //
//   // pending 상태를 감시하여 변경될 때마다 콜백 함수 실행
//   watch(pending, (newPending) => {
//     if (!newPending) {
//       //   userData.value = data.value;
//       console.log(data.value);
//       updateLoginState(data.value);
//       console.log(user.value);
//       // console test
//       //   console.log(userData.value);
//       //   console.log(userData.value.response.age);
//       //   console.log(userData.value.response.birthday);
//       //   console.log(userData.value.response.birthyear);
//       //   console.log(userData.value.response.email);
//     }
//   });
// };

// watch(
//   () => accessToken.value,
//   (newValue) => {
//     if (newValue) {
//       useGetUserData();
//     }
//   },
//   { immediate: true },
// );
</script>
