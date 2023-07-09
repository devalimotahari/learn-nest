export function propertiesOf<TObj>(_obj: TObj | undefined = undefined) {
  return function result<T extends keyof TObj>(name: T) {
    return name;
  };
}
