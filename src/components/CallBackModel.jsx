"use client";

import { useState } from "react";
import countryData from "country-telephone-data";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { toast } from "react-toastify";
import { fbq } from "@/lib/fbpixel";
import { AnimatePresence, motion } from "framer-motion";

export default function CallbackModal({
  isOpen,
  onClose,
  limitedCountries = false,
}) {
  const t = useTranslations("CallBack");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+998");
  const [phoneError, setPhoneError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const allowedDialCodes = [
    "998",
    "992",
    "996",
    "994",
    "7",
    "98",
    "964",
  ];

  const filteredCountries = limitedCountries
    ? countryData.allCountries.filter((c) =>
        allowedDialCodes.includes(c.dialCode)
      )
    : countryData.allCountries;

  const isValidPhone = (value) => {
    const trimmedValue = value.trim();
    const allowedCharacters = /^[\d\s()+-]+$/;
    const localDigits = trimmedValue.replace(/\D/g, "");
    const countryDigits = countryCode.replace(/\D/g, "");
    const totalDigits = `${countryDigits}${localDigits}`;

    if (countryDigits === "998") {
      return allowedCharacters.test(trimmedValue) && localDigits.length === 9;
    }

    return (
      allowedCharacters.test(trimmedValue) &&
      localDigits.length >= 6 &&
      totalDigits.length >= 8 &&
      totalDigits.length <= 15
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name.trim() || !message.trim() || !phone.trim()) {
      toast.error(t("error"));
      return;
    }

    if (!isValidPhone(phone)) {
      setPhoneError(t("phoneError"));
      return;
    }

    setPhoneError("");

    // ==========================================
    // PREVENT DOUBLE SUBMIT
    // ==========================================

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      // ==========================================
      // FULL PHONE
      // ==========================================

      const fullPhone = `${countryCode} ${phone}`.trim();

      console.log("Sending to amoCRM:", {
        name,
        phone: fullPhone,
        message,
      });

      // ==========================================
      // FACEBOOK PIXEL
      // ==========================================

      fbq("track", "Lead");

      // ==========================================
      // SEND TO NEXT.JS API
      // ==========================================

      const response = await fetch("/api/amocrm", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          phone: fullPhone,
          message: message.trim(),
        }),
      });

      // ==========================================
      // RESPONSE
      // ==========================================

      const result = await response.json();

      console.log("amoCRM result:", result);

      // ==========================================
      // ERROR
      // ==========================================

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message || "amoCRM'ga yuborishda xatolik"
        );
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      toast.success(t("success"));

      // Formani tozalash
      setName("");
      setPhone("");
      setMessage("");
      setCountryCode("+998");

      // Modalni yopish
      onClose();
    } catch (error) {
      console.error("amoCRM Xato:", error);

      toast.error(t("sendError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => {
              if (!isLoading) onClose();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>

          {/* TITLE */}

          <div className="flex justify-center items-center gap-2 mb-2">
            <Phone className="text-blue-600" />

            <h2 className="text-2xl font-bold text-gray-800">
              {t("title")}
            </h2>
          </div>

          <div className="w-[300px] mb-4 h-[1px] bg-blue-600 mx-auto" />

          <p className="text-center text-sm text-gray-500 mb-4">
            {t("text")}
          </p>

          {/* FORM */}

          <form
            className="space-y-4 text-black mt-2"
            onSubmit={handleSubmit}
          >
            {/* NAME */}

            <input
              type="text"
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />

            {/* PHONE */}

            <div className="flex items-center space-x-2">
              <div className="w-1/2">
                <select
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e.target.value);
                    setPhoneError("");
                  }}
                  disabled={isLoading}
                  className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm disabled:opacity-60"
                >
                  {filteredCountries.map((country) => (
                    <option
                      key={country.iso2}
                      value={`+${country.dialCode}`}
                    >
                      +{country.dialCode}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="tel"
                placeholder={t("phone")}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/[^\d\s()+-]/g, ""));
                  setPhoneError("");
                }}
                aria-invalid={Boolean(phoneError)}
                required
                disabled={isLoading}
                inputMode="tel"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                  phoneError
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
            </div>
            {phoneError && (
              <p className="-mt-2 text-sm text-red-600">{phoneError}</p>
            )}

            {/* MESSAGE */}

            <textarea
              placeholder={t("comment")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {isLoading ? "Yuborilmoqda..." : t("send")}
            </button>
          </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
