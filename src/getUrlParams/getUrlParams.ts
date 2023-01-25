type parsersType<T extends {}> = {
  [key in keyof T]: (val: string) => T[key];
};

export const getUrlParams = <T extends {}>(
  parsers?: parsersType<T>,
): Partial<T> & { [key: string]: string | undefined } =>
  Object.fromEntries(
    Array.from(new URLSearchParams(window.location.search).entries()).map(([key, value]) => [
      key,
      parsers?.[key as keyof T] ? parsers[key as keyof T](value) : value,
    ]),
  ) as Partial<T> & { [key: string]: string };
