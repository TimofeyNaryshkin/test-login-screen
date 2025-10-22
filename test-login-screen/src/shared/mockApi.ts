import { OTP } from "./constants";

const mockApi = {
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "test@mail.com" && password === "123456") {
      return {
        succes: true,
        OTP,
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

  verifyOTP: async (otp: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (otp === OTP) {
      return {
        success: true,
        token: crypto.randomUUID(),
        name: "Test Name",
      };
    }
    throw new Error("Ivalid code");
  },
};

export default mockApi;
