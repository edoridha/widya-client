import axios from "axios";

export default function useHookBook() {
  const url_api = "http://localhost:4001";

  const createBook = async (form) => {
    try {
      await axios({
        method: "post",
        url: url_api + "/book",
        headers: { access_token: localStorage.getItem("access_token") },
        data: form,
      });
    } catch (error) {
      throw error;
    }
  };
  const deleteBook = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `${url_api}/book/${id}`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      return "Book Deleted";
    } catch (error) {
      return "Failed Delete Book";
    }
  };

  const editBook = async (id, form) => {
    try {
      const { title, author, price } = form;
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`${url_api}/book/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
        body: JSON.stringify({ title, author, price }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update book");
      }

      return `Book with id ${id} updated`;
    } catch (error) {
      console.error("Error updating book:", error);
      throw `Book with id ${id} failed to update`;
    }
  };

  return { createBook, deleteBook, editBook };
}
