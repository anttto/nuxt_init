<template>
  <div class="mt-7 py-[5rem] px-[2rem]">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col items-start justify-center gap-y-5">
        <label for="phoneNumber" class="flex">
          <span class="pr-3 min-w-[100px] inline-block">전화번호 입력</span>
          <div class="flex flex-col gap-2">
            <div>
              <input
                id="phoneNumber"
                v-model="formData.number"
                class="border border-red-500 border-solid p-2 w-[250px]"
                type="number"
                placeholder="전화번호를 입력해 주세요"
                required
              />
              <button class="bg-yellow-300 px-5 py-2 ml-2" type="button" @click="requestVerificationCode">인증번호 받기</button>
            </div>
            <div v-show="verified">
              <input
                v-model="formData.vcode"
                class="border border-red-500 border-solid p-2 w-[250px]"
                type="number"
                placeholder="인증번호를 입력해 주세요"
              />
              <button class="bg-yellow-300 px-5 py-2 ml-2" type="button" @click="requestConfirmVerificationCode">확인</button>
            </div>
          </div>
        </label>
        <label for="email">
          <span class="pr-3 min-w-[100px] inline-block">이메일 입력</span>
          <input
            id="email"
            v-model="formData.email"
            class="border border-red-500 border-solid p-2 w-[250px]"
            type="email"
            placeholder="Email을 입력해 주세요"
            required
          />
        </label>
      </div>
      <button class="mt-10 border px-10 py-2 bg-gray-700 text-white" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const formData = ref({
  number: '',
  email: '',
  vcode: '',
});

const { requestCodeFc, verified, verifiedCode } = useVerificationPhoneNumber(); // 인증번호 호출
const { confirmCode, verifiedStatus } = useConfirmVerification(); // 인증번호 확인

// 인증번호 호출
const requestVerificationCode = async () => {
  try {
    await requestCodeFc(formData.value.number);
    // console.log(verifiedCode.value);
    // if (verifiedCode.value !== undefined) {
    //   verified.value = true;
    // }
    console.log(verifiedCode.value);

    console.log(verified.value);
    // verified.value = verifiedCode;
  } catch {
    console.log(Error);
  }
};

// 인증번호 확인
const requestConfirmVerificationCode = async () => {
  try {
    await confirmCode(formData.value.number, formData.value.vcode);
    console.log(verifiedStatus.value);
  } catch {
    console.log(Error);
  }
};

// 사전예약 확인
const handleSubmit = () => {
  const { vcode, ...rest } = formData.value;
  submitForm(rest);
};
</script>
