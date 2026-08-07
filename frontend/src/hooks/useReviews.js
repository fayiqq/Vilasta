import { useCallback, useState } from "react";
import { addReview, deleteReview } from "../services/reviewService.js";

export default function useReviews(listingId, onChanged) {
  const [submitting, setSubmitting] = useState(false);

  const create = useCallback(async (review) => {
    setSubmitting(true);
    try {
      const response = await addReview(listingId, review);
      await onChanged?.(response.data.review);
      return response.data.review;
    } finally {
      setSubmitting(false);
    }
  }, [listingId, onChanged]);

  const remove = useCallback(async (reviewId) => {
    await deleteReview(listingId, reviewId);
    await onChanged?.();
  }, [listingId, onChanged]);

  return { create, remove, submitting };
}
