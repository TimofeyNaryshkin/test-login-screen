const mockApi = {
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "test@mail.com" && password === "123456") {
      return {
        succes: true,
        token: crypto.randomUUID(),
        OTP: "123456",
      };
    }

    if (email === "test@mail.com" && password !== "123456") {
      throw new Error("wrong password, please try again");
    }

    if (email === "nouser@mail.com") {
      throw new Error(`user doesn't exist`);
    }

    if (email === "error@mail.com") {
      throw new Error(`Server error, please try again later`);
    }

    throw new Error("wrong email or password, please try again");
  },
};

export default mockApi;
