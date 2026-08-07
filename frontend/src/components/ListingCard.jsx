import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} className="listing-card">
      <div className="listing-card-img">
        <img src={listing.image?.url} alt={listing.title} />
      </div>
      <div className="listing-card-body">
        <p className="listing-card-title">{listing.title}</p>
        <p className="listing-card-price">
          &#8377; {Number(listing.price || 0).toLocaleString("en-IN")}{" "}
          <span>/ night</span>
        </p>
      </div>
    </Link>
  );
}