import { useState } from "react";

export default function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-input" role="radiogroup" aria-label="Rating">
      {stars.map((star) => (
        <button
          type="button"
          key={star}
          className={`star-btn ${star <= (hovered || value) ? "filled" : ""}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <i className="fa-solid fa-star" />
        </button>
      ))}
    </div>
  );
}