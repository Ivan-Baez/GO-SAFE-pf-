"use client";
import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react"; // Importamos los iconos

interface PasswordInputProps {
  name: string;
  placeholder: string;
}

export default function PasswordField({ name, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="relative">
        <Field
          name={name}
          type={showPassword ? "text" : "password"} // Aquí está la magia
          placeholder={placeholder}
          className="inputStyles w-full pr-12" // pr-12 para que el texto no pise al ojo
        />
        
        {/* Botón del ojo */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <ErrorMessage name={name} component="p" className="text-xs text-red-500 mt-1" />
    </div>
  );
}