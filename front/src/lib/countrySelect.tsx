import Select from "react-select";
import { useFormikContext } from "formik";
import { ErrorMessage } from "formik";

const CountrySelect = () => {
  const { setFieldValue, values } = useFormikContext<any>();

  const options = [
    { value: "Argentina", label: "Argentina" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Brazil", label: "Brasil" },
    { value: "Chile", label: "Chile" },
    { value: "Colombia", label: "Colombia" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Mexico", label: "México" },
    { value: "Peru", label: "Perú" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Venezuela", label: "Venezuela" },
  ];

  const selectedCountry =
    options.find((opt) => opt.value === values.country) || null;

  return (
    <div className="flex flex-col">
      <label className="font-semibold text-sm">País</label>

      <Select
        options={options}
        name="country"
        placeholder="Selecciona tu país..."
        unstyled
        value={selectedCountry}
        onChange={(option) => setFieldValue("country", option?.value)}

        styles={{
          control: (base) => ({
            ...base,
            boxShadow: "none",
          }),
        }}

        className="mt-1"

        classNames={{
          control: () =>
            "inputStyles !min-h-[42px] !py-1 cursor-pointer",
          container: () => "w-full",
          placeholder: () => "italic text-gray-400",
          option: ({ isFocused, isSelected }) =>
            `px-3 py-2 text-sm ${
              isSelected
                ? "bg-[#f0ba3c] text-white"
                : isFocused
                ? "bg-gray-100"
                : "text-gray-700"
            }`,
          menu: () =>
            "bg-white border border-gray-200 rounded-xl mt-2 shadow-lg overflow-hidden z-50",
        }}
      />

      <ErrorMessage
        name="country"
        component="p"
        className="text-xs text-red-500 mt-1"
      />
    </div>
  );
};

export default CountrySelect;