export const truth = () => true;
export const isNumber = (o: unknown): o is number => typeof o === 'number';

export function id<T>(v: T): T {
  return v;
}
