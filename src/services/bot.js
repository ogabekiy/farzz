import { errorToast } from "./response-toasts";
import { successToast } from "./response-toasts";

export async function sendMessageToAdmin(name, phone, message) {
  const BOT_TOKEN = "7129866981:AAGScYsbvDJ560EMPqe2xNNPGwOfvrxeTqI";
  const CHAT_IDS = ["580802604", "473897442", "1006334744", "8100367195", "2135793183"];
  const text = `Ism: ${name}\nPhone Number: ${phone}\nXabar: ${message}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    // Har bir chat_id uchun xabar yuborish
    const responses = await Promise.all(
      CHAT_IDS.map(chat_id =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text,
          }),
        })
      )
    );

    // Javoblar orasida xatolik bo‘lsa aniqlash
    const failed = responses.filter(response => !response.ok);
    if (failed.length > 0) {
      throw new Error("Ba'zi foydalanuvchilarga xabar yuborilmadi.");
    }

    return "Xabar barcha foydalanuvchilarga yuborildi.";
  } catch (error) {
    console.error("Xato:", error);
    throw error;
  }
}
