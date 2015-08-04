const phoneRegex = /^[0-9]{8,15}$/;
export default function validatePhone(phone) {
  return phoneRegex.test(phone);
}
