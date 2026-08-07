import { useCallback, useEffect, useState } from "react";
import { getListing, getListings } from "../services/listingService.js";

export default function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    return getListings()
      .then(setListings)
      .catch(() => setError("Unable to load listings."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { listings, loading, error, reload };
}

// Used by ListingShow.jsx / EditListing.jsx to load (and reload) one listing.
export function useListing(id) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    return getListing(id)
      .then(setListing)
      .catch(() => setError("This listing doesn't exist or was removed."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { listing, loading, error, reload };
}
