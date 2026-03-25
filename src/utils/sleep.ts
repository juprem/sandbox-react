export const sleep = (delay: number) =>
  new Promise<number>((resolve) => {
    return setTimeout(resolve, delay);
  }).then((timeout) => clearTimeout(timeout));
