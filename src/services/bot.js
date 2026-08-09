export async function sendMessageToAdmin(name, phone, message) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const CHAT_IDS = process.env.NEXT_PUBLIC_CHAT_IDS.split(",");
  const text = `Ism: ${name}\nPhone Number: ${phone}\nXabar: ${message}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
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
