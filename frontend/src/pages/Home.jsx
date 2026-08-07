import useListings from "../hooks/useListings.js";
import ListingCard from "../components/ListingCard.jsx";

export default function Home() {
  const { listings, loading, error } = useListings();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Explore stays</h1>
        <p className="page-subtitle">Handpicked places to stay, added by the community.</p>
      </div>

      {loading && <div className="page-loading">Loading listings…</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && listings.length === 0 && (
        <div className="empty-state">
          <p>No listings yet.</p>
          <p>Be the first to add one!</p>
        </div>
      )}

      <div className="listing-grid">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}