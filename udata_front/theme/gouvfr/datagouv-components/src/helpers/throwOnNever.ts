export function throwOnNever(_: never, message: string): never {
  throw new Error(message);
}
