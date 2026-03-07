import { ILoginErrors, ILoginProps } from "@/types/types";

export const validateFormLogin = (values: ILoginProps) => {
  const errors: ILoginErrors = {};

  if (!values.email) {
    errors.email = "Email requerido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
};