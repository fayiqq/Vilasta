import { useState } from "react";

// Shared by NewListing and EditListing. `initial` pre-fills fields for
// editing; onSubmit receives a FormData ready to send straight to the API
// (multer expects multipart/form-data with an "image" file field).
export default function ListingForm({ initial = {}, onSubmit, submitLabel, currentImageUrl }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [price, setPrice] = useState(initial.price ?? "");
  const [location, setLocation] = useState(initial.location || "");
  const [country, setCountry] = useState(initial.country || "");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("country", country);
    if (image) formData.append("image", image);

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="listing-form">
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="form-control"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="form-control"
          placeholder="Enter the description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="image">
          {currentImageUrl ? "Replace image (optional)" : "Choose an image"}
        </label>
        {currentImageUrl && (
          <img src={currentImageUrl} alt="Current" className="form-current-image" />
        )}
        <input
          id="image"
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div className="form-row">
        <div className="mb-3">
          <label className="form-label" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            className="form-control"
            placeholder="Enter the price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 grow">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="form-control"
            placeholder="Enter the location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="country">
          Country
        </label>
        <input
          id="country"
          className="form-control"
          placeholder="Enter the country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <button className="btn-dark" disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}