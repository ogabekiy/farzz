import { useState } from "react";
import countryData from "country-telephone-data";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { sendMessageToAdmin } from "@/services/bot";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CallbackModal({ isOpen, onClose }) {
  const t = useTranslations("CallBack");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+998");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !phone.trim()) {
      toast.error(t("error"));
      return;
    }

    try {
      await sendMessageToAdmin(name, `${countryCode} ${phone}`, message);
      toast.success(t("success"));
      setName("");
      setPhone("");
      setMessage("");
      setCountryCode("+998");
      onClose();
    } catch (error) {
      console.error("Xato:", error);
      toast.error(t("sendError"));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Title */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <Phone className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>
          </div>

          <div className="w-[300px] mb-4 h-[1px] bg-blue-600 mx-auto" />
          <p className="text-center text-sm text-gray-500 mb-4">{t("text")}</p>

          {/* Form */}
          <form className="space-y-4 text-black mt-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

<div className="flex items-center space-x-2">
  <div className="w-1/2">
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm"
    >
      {countryData.allCountries.map((country) => (
        <option key={country.iso2} value={`+${country.dialCode}`}>
          +{country.dialCode}
        </option>
      ))}
    </select>
  </div>

  <input
    type="tel"
    placeholder={t("phone")}
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required
    inputMode="tel"
    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>


            <textarea
              placeholder={t("comment")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
