export const truth = () => true;
export const isNumber = (o: unknown): o is number => typeof o === 'number';

export function id<T>(v?: T): T {
  return v;
}

export function setImmediatePromise() {
  return new Promise((resolve) => {
    setImmediate(resolve);
  });
}
