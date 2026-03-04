export const db: any = new Proxy(
  {},
  {
    get() {
      throw new Error("Database is not available on static hosting.");
    },
  }
);
