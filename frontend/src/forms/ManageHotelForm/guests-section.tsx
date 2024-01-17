import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./manage-hotel-form";

export const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
        <label htmlFor="adults" className="text-sm font-semibold text-gray-700">
          Adults
          <input
            className="w-full rounded border px-3 py-2 font-normal"
            type="number"
            id="adults"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="fold-bold text-sm text-red-500">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label
          htmlFor="children"
          className="text-sm font-semibold text-gray-700"
        >
          Children
          <input
            id="children"
            className="w-full rounded border px-3 py-2 font-normal"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="fold-bold text-sm text-red-500">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
