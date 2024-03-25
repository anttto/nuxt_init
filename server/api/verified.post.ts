import { getUserData } from '~/server/model/userData';

export default defineEventHandler(async (event) => {
  const body = readBody(event);
  const { number } = await body;
  let returnCode = null;
  const users = getUserData(); // User Model
  const user = users.find((user) => String(user.phoneNumber) === String(`0${number}`));

  // 호출 에러 던지기
  if (!user) {
    console.log('user', user);
    console.log('fail request', returnCode);
    returnCode = 1;
    throw createError({
      statusCode: 401,
      statusMessage: 'Wrong Phone Number',
    });
  } else {
    returnCode = 0;
    console.log('success request', returnCode);
  }

  return {
    number,
    verifiedCode: user?.verifiedCode || undefined,
    returnCode,
  };
});
