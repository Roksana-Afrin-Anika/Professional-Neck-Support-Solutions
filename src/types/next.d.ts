import "next";

declare module "next" {
  export type PageParams<T = {}> = T & {
    params: Record<string, string>;
    searchParams?: Record<string, string | string[] | undefined>;
  };
}
