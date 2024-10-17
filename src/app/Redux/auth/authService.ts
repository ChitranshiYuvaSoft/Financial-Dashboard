// import { gql } from "@apollo/client";
import axios from "axios";

interface Data {
  emailVerificationTOken: string;
  id: string;
}

// const LOGIN_USER = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       user {
//         id
//         name
//         email
//       }
//       token
//     }
//   }
// `;

const loginUser = async (userInfo: {}) => {
  const response = await axios.post(
    "https://node-js-wse4.onrender.com/user/login",
    userInfo
  );
  return response.data.data;
};

const registerUser = async (userInfo: {}) => {
  const response = await axios.post(
    "https://node-js-wse4.onrender.com/user",
    userInfo
  );

  return response.data.data;
};

const verification = async (data: Data) => {
  const response = await axios.get(
    `https://node-js-wse4.onrender.com/user/email/verification?token=${data.emailVerificationTOken}&userId=${data.id}`
  );
  return response.data;
};

const authServices = {
  // LOGIN_USER,
  loginUser,
  registerUser,
  verification,
};

export default authServices;
