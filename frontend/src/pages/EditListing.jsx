import { useNavigate, useParams } from "react-router-dom";
import { updateListing } from "../services/listingService.js";
import { useListing } from "../hooks/useListings.js";
import { useToast, errorMessage } from "../context/ToastContext.jsx";
import ListingForm from "../components/ListingForm.jsx";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const { listing, loading, error } = useListing(id);

  const handleSubmit = async (formData) => {
    try {
      await updateListing(id, formData);
      pushToast("Listing updated successfully");
      navigate(`/listings/${id}`);
    } catch (err) {
      pushToast(errorMessage(err), "error");
    }
  };

  if (loading) return <div className="page-loading">Loading…</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page page-narrow">
      <h1>Edit your listing</h1>
      <ListingForm
        initial={listing}
        currentImageUrl={listing.image?.url}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </div>
  );
}
