// 인증번호 호출 로직
export const useVerificationPhoneNumber = () => {
  const finalVerifiedCode = ref(null);
  const userCookie = useCookie('verifiCode');
  const verified = ref(false); // 인증번호 수신 여부

  const requestCodeFc = async (number) => {
    // 실제에서는 이 곳에 api 호출 로직을 작성 (20240326)
    const data = await $fetch('/api/verified', {
      method: 'POST',
      body: {
        number,
      },
    });

    if (data.returnCode === 0) {
      console.log('호출 성공');
      verified.value = true;
    }
    if (data.returnCode === 1) {
      console.log('호출 실패');
      verified.value = false;
    }
    setVerifiedCode(data.verifiedCode);
  };

  const setVerifiedCode = (code) => {
    // userCookie.value = code; // 테스트: 쿠키에 코드 저장 (단순 확인용)
    finalVerifiedCode.value = code; // 최종 인증코드
  };

  return { requestCodeFc, verified, verifiedCode: finalVerifiedCode };
};

// 인증번호 확인 로직
export const useConfirmVerification = () => {
  //   const finalVerifiedCode = ref();
  //   const userCookie = useCookie('verifiCode');

  //   const confirmVerified = ref(false); // 인증번호 수신 여부
  const verifiedStatus = ref(false); // 인증번호 확인 여부
  const confirmCode = async (number, vcode) => {
    const data = await $fetch('/api/confirmVerified', {
      method: 'POST',
      body: {
        number,
        vcode,
      },
    });

    if (data.returnCode === 0) {
      console.log('호출 성공');
      verifiedStatus.value = true;
    }
    if (data.returnCode === 1) {
      console.log('호출 실패');
      verifiedStatus.value = false;
    }

    // userCookie.value = undefined; // 테스트: 쿠키 삭제 (단순 확인용)
  };

  return { confirmCode, verifiedStatus };
};
