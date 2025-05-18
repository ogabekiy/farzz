// import dotenv from 'dotenv'
// dotenv.config()

import { errorToast } from "./response-toasts";
import { successToast } from "./response-toasts";

export async function sendMessageToAdmin(name, phone,message) {
    // const [bot_token,setBotToken] = useState(import.meta.env.VITE_BOT_TOKEN)
    // const [admin,setAdmin] = useState(import.meta.env.VITE_ADMIN_ID)

    const BOT_TOKEN = "7129866981:AAGScYsbvDJ560EMPqe2xNNPGwOfvrxeTqI"
    const CHAT_ID = "580802604"
    const text = `Ism: ${name}\nPhone Number: ${phone}\nXabar: ${message}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });
  
      if (!response.ok) {
        errorToast()
        throw new Error("Telegramga yuborishda xatolik yuz berdi.");
      }
      successToast()
      return "Xabar muvaffaqiyatli yuborildi.";
    } catch (error) {
      console.error("Xato:", error);
      throw error;
    }
  }
  