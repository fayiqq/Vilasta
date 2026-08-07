import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteListing } from "../services/listingService.js";
import { useListing } from "../hooks/useListings.js";
import useReviews from "../hooks/useReviews.js";
import { useAuth } from "../hooks/useAuth.js";
import { useToast, errorMessage } from "../context/ToastContext.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import StarRatingInput from "../components/StarRatingInput.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";

export default function ListingShow() {
  const { id } = useParams();
  const { user } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const { listing, loading, error, reload } = useListing(id);
  const { create, remove, submitting } = useReviews(id, reload);

  const handleDeleteListing = async () => {
    try {
      await deleteListing(id);
      pushToast("Listing deleted successfully");
      navigate("/");
    } catch (err) {
      pushToast(errorMessage(err), "error");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await create({ rating, comment });
      pushToast("Review added successfully");
      setComment("");
      setRating(3);
    } catch (err) {
      pushToast(errorMessage(err), "error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await remove(reviewId);
      pushToast("Review deleted successfully");
    } catch (err) {
      pushToast(errorMessage(err), "error");
    }
  };

  if (loading) return <div className="page-loading">Loading…</div>;
  if (error) return <div className="page-error">{error}</div>;
  if (!listing) return null;

  const isOwner = user && listing.owner && listing.owner._id === user._id;

  return (
    <div className="page page-narrow">
      <h1>{listing.title}</h1>

      <div className="listing-detail-card">
        <img src={listing.image?.url} alt={listing.title} className="listing-detail-img" />
        <div className="listing-detail-body">
          <p className="listed-by">Listed by @{listing.owner?.username}</p>
          <p>{listing.description}</p>
          <p className="listing-detail-price">
            &#8377; {Number(listing.price || 0).toLocaleString("en-IN")} / night
          </p>
          <p>
            {listing.location}, {listing.country}
          </p>
        </div>
      </div>

      {isOwner && (
        <div className="btns">
          <button className="btn-small btn-danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </button>
          <Link to={`/listings/${id}/edit`} className="btn-small btn-dark">
            Edit
          </Link>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm deletion"
        message="Are you sure you want to delete this listing?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleDeleteListing();
        }}
      />

      <hr />

      {user ? (
        <div className="review-form-section">
          <h4>Leave a review</h4>
          <form onSubmit={handleAddReview}>
            <label className="form-label">Rating</label>
            <StarRatingInput value={rating} onChange={setRating} />

            <label className="form-label" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              className="form-control"
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="btn-dark" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <p className="muted">
          <Link to="/login">Log in</Link> to leave a review.
        </p>
      )}

      {listing.review?.length > 0 && (
        <div className="reviews-section">
          <hr />
          <h4>All reviews</h4>
          <div className="review-grid">
            {listing.review.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                canDelete={user && review.author && review.author._id === user._id}
                onDelete={handleDeleteReview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
