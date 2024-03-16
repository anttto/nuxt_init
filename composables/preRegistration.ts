const phoneNumber = ref('');
const email = ref('');

export const submitForm = (formData) => {
  console.log(formData);
  phoneNumber.value = formData.number;
  email.value = formData.email;
};

// 유효성 체크 로직 . . .
