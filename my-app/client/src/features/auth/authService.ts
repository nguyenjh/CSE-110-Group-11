import axios from "axios";

const port = process.env.PORT ||5050;
const API_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${port}/api/login/`
    : "/api/login";

// Define the type for user data
interface UserData {
  username: string;
  password: string;
}

// Define the type for the login response
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Function to log in the user
const loginUser = async (userData: UserData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));

      const now = new Date();
      const hourLater = now.setHours(now.getHours() + 1);

      localStorage.setItem("setupTime", hourLater.toString());
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to log in");
  }
};

// Function to log out the user
const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("setupTime");
};

// Export the auth service
const authService = {
  loginUser,
  logout,
};

export default authService;
