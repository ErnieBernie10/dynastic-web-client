export const sleep = <T>(promise: Promise<T>, ms: number) =>
  promise.then(
    (value) => new Promise<T>((resolve) => setTimeout(() => resolve(value), ms)),
  );
