export const dev = true;

const { NEXT_PUBLIC_BACKEND_URL } = process.env;
export const url_backend = NEXT_PUBLIC_BACKEND_URL
  ? NEXT_PUBLIC_BACKEND_URL
  : "http://161.132.37.105";
