type Action = "invite";
export const getCallback = (request: Request, action: Action) => {
  const url = new URL(request.url);

  switch (action) {
    case "invite":
      return `${url.origin}/invite/cb`;
    default:
      throw new Error("Unsupported action");
  }
};
