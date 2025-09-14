let navigateFn: (path: string) => void;

export const setNavigate = (nav: (path: string) => void) => {
  navigateFn = nav;
};

export const doNavigate = (path: string) => {
  if (navigateFn) navigateFn(path);
};
