export default function StarDisplay({ rating = 0 }) {
  return (
    <div className="star-display" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fa-star ${star <= rating ? "fa-solid" : "fa-regular"}`}
        />
      ))}
    </div>
  );
}