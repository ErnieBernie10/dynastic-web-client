import { config } from "../../config";

export const getCurrentUser = async (token: Promise<string>) =>
  await fetch(`${config.baseUrl}/api/user`, {
    headers: { Authorization: `Bearer ${await token}` },
  }).then((response) => response.text());
