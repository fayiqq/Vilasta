import StarDisplay from "./StarDisplay.jsx";

export default function ReviewCard({ review, canDelete, onDelete }) {
  return (
    <div className="review-card">
      <div className="review-card-head">
        <p className="review-author">@{review.author?.username || "guest"}</p>
        <StarDisplay rating={review.rating} />
      </div>
      <p className="review-comment">{review.comment}</p>
      {canDelete && (
        <button className="btn-small btn-outline" onClick={() => onDelete(review._id)}>
          Delete
        </button>
      )}
    </div>
  );
}