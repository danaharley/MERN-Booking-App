import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { ManageHotelForm } from "../forms/ManageHotelForm/manage-hotel-form";

import * as apiClient from "../api.client";

import { useAppContext } from "../contexts/app-context";

const AddHotel = () => {
  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Hotel saved!" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: "Error while saving hotel!" });
      console.log(error);
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm isLoading={isLoading} onSave={handleSave} />;
};

export default AddHotel;
