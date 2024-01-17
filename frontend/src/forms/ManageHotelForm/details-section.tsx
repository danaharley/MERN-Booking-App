import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./manage-hotel-form";

export const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>
      <label htmlFor="name" className="flex-1 text-sm font-bold text-gray-700">
        Name
        <input
          id="name"
          type="text"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("name", { required: "This field is required." })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex flex-col gap-5 md:flex-row">
        <label
          htmlFor="city"
          className="flex-1 text-sm font-bold text-gray-700"
        >
          City
          <input
            id="city"
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("city", { required: "This field is required." })}
          />
          {errors.city && (
            <span className="text-xs text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label
          htmlFor="country"
          className="flex-1 text-sm font-bold text-gray-700"
        >
          Country
          <input
            id="country"
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("country", { required: "This field is required." })}
          />
          {errors.country && (
            <span className="text-xs text-red-500">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label
        htmlFor="description"
        className="flex-1 text-sm font-bold text-gray-700"
      >
        Description
        <textarea
          id="description"
          rows={10}
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label
        htmlFor="pricePerNight"
        className="max-w-[50%] text-sm font-bold text-gray-700"
      >
        Price Per Night
        <input
          type="number"
          id="pricePerNight"
          min={1}
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label
        htmlFor="starRating"
        className="max-w-[50%] text-sm font-bold text-gray-700"
      >
        Star Rating
        <select
          id="starRating"
          {...register("starRating", {
            required: "This field is required",
          })}
          className="w-full rounded border p-2 font-normal text-gray-700"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};
