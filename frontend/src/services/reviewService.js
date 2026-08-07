import api from "./api.js";

export const addReview = (listingId, { rating, comment }) =>
  api.post(`/api/listings/${listingId}/reviews`, { rating, comment });

export const deleteReview = (listingId, reviewId) =>
  api.delete(`/api/listings/${listingId}/reviews/${reviewId}`);
