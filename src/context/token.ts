export const dev = false;

const { NEXT_PUBLIC_BACKEND_URL } = process.env;

export const url_backend = NEXT_PUBLIC_BACKEND_URL
  ? NEXT_PUBLIC_BACKEND_URL
  : "http://161.132.37.105:4000";

export const url_front_to_wsp = dev
  ? "http://localhost:4000"
  : "http://161.132.37.105:4000";
