import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { DetailsSection } from "./details-section";
import { TypesSection } from "./types-section";
import { FacilitiesSection } from "./facilities-section";
import { GuestsSection } from "./guests-section";
import { ImagesSection } from "./images-section";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type ManageHotelFormProps = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

export const ManageHotelForm = ({
  hotel,
  onSave,
  isLoading,
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  const onSubmit = (data: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <DetailsSection />
        <TypesSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </FormProvider>
  );
};
