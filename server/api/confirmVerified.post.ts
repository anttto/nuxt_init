import { getUserData } from '~/server/model/userData';

export default defineEventHandler(async (event) => {
  const body = readBody(event);
  const { number, vcode } = await body;
  let returnCode = null;
  const users = getUserData(); // User Model
  const user = users.find((user) => String(user.phoneNumber) === String(`0${number}`));
  //   console.log(user);
  //   console.log(typeof user.verifiedCode);
  //   console.log(typeof vcode);

  const codeConfirm = String(user.verifiedCode) === String(vcode);
  console.log(codeConfirm);

  // 호출 에러 던지기
  if (codeConfirm === false) {
    returnCode = 1;
    console.log('fail request', returnCode);
    // throw createError({
    //   statusCode: 401,
    //   statusMessage: 'Wrong Phone Number',
    // });
  } else {
    returnCode = 0;
    console.log('success request', returnCode);
  }

  return {
    codeConfirm,
    returnCode,
  };
});
