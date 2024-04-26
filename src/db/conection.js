import { createClient } from "redis";

export const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});
