export async function sendMessageToAdmin(name, phone, message) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  const CHAT_IDS = process.env.TELEGRAM_CHAT_IDS
    ?.split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN не найден");
  }

  if (!CHAT_IDS?.length) {
    throw new Error("TELEGRAM_CHAT_IDS не найден");
  }

  const text = `📩 Новая заявка

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Сообщение: ${message}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const responses = await Promise.all(
      CHAT_IDS.map((chatId) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        })
      )
    );

    const failed = responses.filter(
      (response) => !response.ok
    );

    if (failed.length > 0) {
      throw new Error(
        "Не удалось отправить сообщение некоторым пользователям Telegram"
      );
    }

    return true;
  } catch (error) {
    console.error("Ошибка Telegram-бота:", error);
    throw error;
  }
}