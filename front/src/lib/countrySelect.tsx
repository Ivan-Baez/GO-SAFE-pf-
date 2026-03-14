import Select from 'react-select';
import { useFormikContext } from 'formik';
import { ErrorMessage } from 'formik';

const CountrySelect = () => {
  const { setFieldValue, values } = useFormikContext<any>();

  // Lista simplificada para no exceder los 20 caracteres del Back
  const options = [
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Brazil', label: 'Brasil' },
    { value: 'Chile', label: 'Chile' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Mexico', label: 'México' },
    { value: 'Peru', label: 'Perú' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Venezuela', label: 'Venezuela' },
  ];

  return (
    <div className="flex flex-col">
      <label className="font-semibold text-sm">País</label>
      <Select
        options={options}
        name="country"
        unstyled // quita parte del estilo "feo" por defecto
        styles={{
          control: (base) => ({
            ...base,
            boxShadow: 'none',
          }),
        }}
        placeholder="Selecciona tu país..."
        onChange={(option) => setFieldValue('country', option?.value)}
        //si ya había un valor (ej. volví atrás), se mantenga:
        value={options.find(opt => opt.value === values.country)}
        className="mt-1"
        // Clases de Tailwind para las partes internas si uso 'unstyled'
        classNames={{
          control: () => "inputStyles !min-height-0 !py-1 cursor-pointer", 
          container: () => "w-full",
          placeholder: () => "italic text-gray-400",
          option: ({ isFocused, isSelected }) => 
            `px-3 py-2 text-sm ${isSelected ? 'bg-[#f0ba3c] text-white' : isFocused ? 'bg-gray-100' : 'text-gray-700'}`,
          menu: () => "bg-white border border-gray-200 rounded-xl mt-2 shadow-lg overflow-hidden z-50",
        }}
      />
      <ErrorMessage name="country" component="p" className="text-xs text-red-500 mt-1" />
    </div>
  );
};

export default CountrySelect;