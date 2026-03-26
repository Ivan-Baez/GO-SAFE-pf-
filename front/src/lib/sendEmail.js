import emailjs from "emailjs-com";

export const sendEmail = async (name, email) => {
  try {
    await emailjs.send(
      "service_hfufpf8",
      "template_aaqk719",
      {
        name: name,
        email: email,
      },
      "7Csxe3E1nupQeVr1w",
    );

    console.log("Correo enviado ✅");
  } catch (error) {
    console.error("Error ❌", error);
  }
};
