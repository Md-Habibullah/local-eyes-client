import { serverFetch } from "@/lib/server-fetch";

export const getPayments = async () => {
    const res = await serverFetch.get("/payments", { cache: "no-store" });
    const result = await res.json();
    return result.data;
};