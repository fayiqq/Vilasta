import { useNavigate } from "react-router-dom";
import { createListing } from "../services/listingService.js";
import { useToast, errorMessage } from "../context/ToastContext.jsx";
import ListingForm from "../components/ListingForm.jsx";

export default function NewListing() {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      const res = await createListing(formData);
      pushToast("Listing added successfully");
      navigate(`/listings/${res.data.listing._id}`);
    } catch (err) {
      pushToast(errorMessage(err), "error");
    }
  };

  return (
    <div className="page page-narrow">
      <h1>Enter the details</h1>
      <ListingForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
}