// userHelper.ts
let setUserFn: (
  user: { id: number; role: string; nome?: string } | null,
) => void;

export const setSetUser = (
  fn: (user: { id: number; role: string; nome?: string } | null) => void,
) => {
  setUserFn = fn;
};

export const doSetUser = (user: null) => {
  if (setUserFn) setUserFn(user);
};
