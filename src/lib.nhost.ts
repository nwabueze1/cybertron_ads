import { NhostClient } from "@nhost/nextjs";

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUB_DOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
});
