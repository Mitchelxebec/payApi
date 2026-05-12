const BASE_URL = import.meta.env.VITE_API_URL;

console.log(BASE_URL);
export const fetchServices = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/services`);
  const data = await res.json();
  return data.data as { name: string; priceInXLM: string }[];
};

export const verifyPayment = async (
  walletAddress: string,
  txHash: string,
  service: string,
) => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/verify-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress, txHash, service }),
  });
  return res.json();
};
