import api from "./api.js";

export const getListings = () =>
  api.get("/api/listings").then((res) => res.data.listings);

export const getListing = (id) =>
  api.get(`/api/listings/${id}`).then((res) => res.data.listing);

export const createListing = (formData) =>
  api.post("/api/listings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateListing = (id, formData) =>
  api.put(`/api/listings/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteListing = (id) => api.delete(`/api/listings/${id}`);
