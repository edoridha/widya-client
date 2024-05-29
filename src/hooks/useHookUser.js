import axios from "axios";

export default function useHookUser() {
  const url_api = 'http://localhost:4001'

  
  const loginForm = async (form) => {
    try {
      const { data } = await axios({
        method:  "post",
        url: url_api + "/login",
        data: form,
      });
      localStorage.setItem("access_token", data.access_token);
    } catch (error) {
      console.log(error);
      throw error
    }
  };

  const createUser = async (form) => {
    try {
      await axios({
        method: "post",
        url: url_api + '/user',
        data: form
      })
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const userPassword = async(form) => {
    try {
      await axios({
        method: "patch",
        url: url_api + '/profile',
        data: form,
        headers: {access_token: localStorage.getItem("access_token")}
      })
    } catch (error) {
      throw error
    }
  }

  return { loginForm, createUser, userPassword };
}
