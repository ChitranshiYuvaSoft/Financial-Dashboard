import axios from "axios";

interface Data {
  emailVerificationTOken: string;
  id: string;
}

// Define a type for userInfo
interface UserInfo {
  email: string; // Assuming email is required
  password: string; // Assuming password is required
  name?: string; // Optional, for registration
}

// Define the return type for your login and register functions
interface ApiResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    token: string;
  };
}

const loginUser = async (userInfo: UserInfo): Promise<ApiResponse> => {
  const response = await axios.post(
    "https://node-js-wse4.onrender.com/user/login",
    userInfo
  );
  return response.data; // Adjusted to match the ApiResponse structure
};

const registerUser = async (userInfo: UserInfo): Promise<ApiResponse> => {
  const response = await axios.post(
    "https://node-js-wse4.onrender.com/user",
    userInfo
  );

  return response.data; // Adjusted to match the ApiResponse structure
};

const verification = async (data: Data) => {
  const response = await axios.get(
    `https://node-js-wse4.onrender.com/user/email/verification?token=${data.emailVerificationTOken}&userId=${data.id}`
  );
  return response.data;
};

const authServices = {
  loginUser,
  registerUser,
  verification,
};

export default authServices;
