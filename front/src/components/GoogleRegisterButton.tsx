"use client";

export default function GoogleRegisterButton() {

  const handleGoogleRegister = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?role=instructor`;
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        type="button"
        onClick={handleGoogleRegister}
        className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          width={18}
          height={18}
        />
        Registrarse con Google
      </button>
    </div>
  );
}