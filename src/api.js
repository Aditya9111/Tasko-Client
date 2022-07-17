import axios from "axios";

export const createBoard = async (data) => {
  const response = await axios.post("/api/boards", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const createList = async (data) => {
  const response = await axios.post("/api/lists", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const createCard = async (data) => {
  const response = await axios.post("/api/cards", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateBoard = async (data) => {
  const response = await axios.put(`/api/boards/${data.id}`, data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateCard = async (data) => {
  const response = await axios.put(`/api/cards/${data.id}`, data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const deleteList = async (data) => {
  const response = await axios.delete(
    `/api/lists/${data.id}?boardId=${data.boardId}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const deleteCard = async (data) => {
  const response = await axios.delete(
    `/api/cards/${data.id}?boardId=${data.boardId}&listId=${data.listId}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const dndCard = async (data) => {
  const response = await axios.post("/api/cards/dnd", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};
