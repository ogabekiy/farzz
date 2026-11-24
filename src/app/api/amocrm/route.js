import { NextResponse } from "next/server";
import { sendMessageToAdmin } from "@/services/bot";

/**
 * amoCRM base URL yaratish
 *
 * .env:
 * AMO_SUBDOMAIN=farzzgroup
 *
 * yoki:
 * AMO_SUBDOMAIN=farzzgroup.amocrm.ru
 *
 * Ikkalasini ham qabul qiladi.
 */
function getAmoBaseUrl(subdomain) {
  if (!subdomain) {
    return null;
  }

  let cleanSubdomain = subdomain.trim();

  // http:// yoki https:// ni olib tashlash
  cleanSubdomain = cleanSubdomain.replace(/^https?:\/\//, "");

  // Oxiridagi / belgilarini olib tashlash
  cleanSubdomain = cleanSubdomain.replace(/\/+$/, "");

  if (!cleanSubdomain) {
    return null;
  }

  // Agar to'liq domain berilgan bo'lsa
  if (cleanSubdomain.includes(".")) {
    return `https://${cleanSubdomain}`;
  }

  // Faqat subdomain berilgan bo'lsa
  return `https://${cleanSubdomain}.amocrm.ru`;
}

/**
 * amoCRM response'ni xavfsiz parse qilish
 */
async function parseAmoResponse(response) {
  const text = await response.text();

  if (!text) {
    return {
      data: null,
      raw: "",
    };
  }

  try {
    return {
      data: JSON.parse(text),
      raw: text,
    };
  } catch {
    return {
      data: null,
      raw: text,
    };
  }
}

/**
 * ==========================================
 * GET
 * ==========================================
 *
 * Browser:
 *
 * http://localhost:3000/api/amocrm
 *
 * orqali environment ishlayotganini tekshirish mumkin.
 */
export async function GET() {
  const token = process.env.AMO_LONG_LIVED_TOKEN?.trim();
  const subdomain = process.env.AMO_SUBDOMAIN?.trim();

  return NextResponse.json({
    success: true,

    message: "amoCRM API route ishlayapti",

    debug: {
      subdomain: subdomain || null,
      tokenExists: Boolean(token),
      tokenLength: token ? token.length : 0,
    },
  });
}

/**
 * ==========================================
 * POST
 * ==========================================
 *
 * Frontenddan:
 *
 * {
 *   name: "Ogabek",
 *   phone: "+998901234567",
 *   message: "Menga qo'ng'iroq qiling"
 * }
 *
 * keladi.
 */
export async function POST(request) {
  try {
    // ==========================================
    // 1. FORM DATA
    // ==========================================

    const body = await request.json();

    const name = body?.name?.trim();
    const phone = body?.phone?.trim();
    const message = body?.message?.trim();

    console.log("=================================");
    console.log("WEBSITE FORM");
    console.log("=================================");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Message:", message);
    console.log("=================================");

    // ==========================================
    // 2. VALIDATION
    // ==========================================

    if (!name || !phone || !message) {
      return NextResponse.json(
        {
          success: false,

          step: "validation",

          message: "name, phone va message majburiy",

          receivedData: {
            name: name || null,
            phone: phone || null,
            message: message || null,
          },
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // 3. ATTEMPT AMOCRM INTEGRATION
    // ==========================================

    let amoSuccess = false;
    let amoError = null;
    let leadId = null;
    let contactId = null;
    let leadData = null;
    let noteData = null;

    const token = process.env.AMO_LONG_LIVED_TOKEN?.trim();
    const subdomain = process.env.AMO_SUBDOMAIN?.trim();
    const baseUrl = getAmoBaseUrl(subdomain);

    if (!subdomain || !token || !baseUrl) {
      amoError = "amoCRM sozlamalari to'liq emas";
      console.warn("amoCRM sozlamalari to'liq emas:", {
        subdomain: Boolean(subdomain),
        token: Boolean(token),
        baseUrl: Boolean(baseUrl),
      });
    } else {
      try {
        const leadUrl = `${baseUrl}/api/v4/leads/complex`;
        console.log("amoCRM Lead URL:", leadUrl);

        const lead = {
          name: `Website lead - ${name}`,
          _embedded: {
            contacts: [
              {
                first_name: name,
                custom_fields_values: [
                  {
                    field_code: "PHONE",
                    values: [
                      {
                        value: phone,
                        enum_code: "WORK",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        };

        const leadResponse = await fetch(leadUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify([lead]),
        });

        const { data: parsedLeadData, raw: leadRaw } = await parseAmoResponse(leadResponse);
        leadData = parsedLeadData;

        console.log("=================================");
        console.log("AMOCRM LEAD RESPONSE");
        console.log("Status:", leadResponse.status);
        console.log("Response:", leadRaw);
        console.log("=================================");

        if (!leadResponse.ok) {
          amoError =
            leadResponse.status === 402
              ? "amoCRM to'lovi tugagan (402 Payment Required)"
              : leadResponse.status === 401
                ? "amoCRM authorization xatosi"
                : leadResponse.status === 400
                  ? "amoCRM ma'lumotlarni qabul qilmadi"
                  : `amoCRM xatosi (${leadResponse.status})`;
          console.warn("amoCRM ga saqlab bo'lmadi:", amoError);
        } else {
          const createdLead = Array.isArray(leadData) ? leadData[0] : null;
          leadId = createdLead?.id;
          contactId = createdLead?.contact_id;

          if (leadId) {
            const noteUrl = `${baseUrl}/api/v4/leads/notes`;
            const note = {
              entity_id: leadId,
              note_type: "common",
              params: {
                text: message,
              },
            };

            const noteResponse = await fetch(noteUrl, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify([note]),
            });

            const { data: parsedNoteData } = await parseAmoResponse(noteResponse);
            noteData = parsedNoteData;
            amoSuccess = true;
          }
        }
      } catch (err) {
        amoError = err?.message || "amoCRM so'rovida xatolik";
        console.error("amoCRM catch error:", err);
      }
    }

    // ==========================================
    // 4. TELEGRAM NOTIFICATION (HAR DOIM YUBORILADI)
    // ==========================================

    let telegramSent = false;
    let telegramError = null;

    try {
      const extraNote = !amoSuccess
        ? `⚠️ Diqqat: amoCRM ga saqlanmadi (${amoError || "xatolik"})`
        : "";

      await sendMessageToAdmin(name, phone, message, extraNote);
      telegramSent = true;
      console.log("=================================");
      console.log("TELEGRAM SUCCESS");
      console.log("Telegram xabar muvaffaqiyatli yuborildi");
      console.log("=================================");
    } catch (tError) {
      telegramError = tError?.message || "Telegramga yuborib bo'lmadi";
      console.error("=================================");
      console.error("TELEGRAM ERROR:", telegramError);
      console.error("=================================");
    }

    // ==========================================
    // 5. NATIJA QAYTARISH
    // ==========================================

    // Agar Telegram yoki amoCRM dan birortasi ishlagan bo'lsa - muvaffaqiyatli!
    if (telegramSent || amoSuccess) {
      return NextResponse.json({
        success: true,
        step: "completed",
        message: amoSuccess
          ? "Lead amoCRM va Telegramga muvaffaqiyatli yuborildi"
          : "Zayavka Telegram orqali muvaffaqiyatli qabul qilindi",
        data: {
          leadId,
          contactId,
          amoSuccess,
          amoError: amoError || null,
          telegramSent,
        },
      });
    }

    // Agar na amoCRM, na Telegram ishlagan bo'lsa
    return NextResponse.json(
      {
        success: false,
        step: "delivery_failed",
        message: "Zayavkani yetkazib bo'lmadi",
        debug: {
          amoError,
          telegramError,
        },
      },
      {
        status: 500,
      }
    );
  } catch (error) {
    // ==========================================
    // 15. SERVER ERROR
    // ==========================================

    console.error("=================================");
    console.error("SERVER ERROR");
    console.error("=================================");
    console.error(error);
    console.error("=================================");

    return NextResponse.json(
      {
        success: false,

        step: "server",

        message: "Serverda xatolik yuz berdi",

        error: {
          name: error?.name,

          message: error?.message,
        },
      },
      {
        status: 500,
      }
    );
  }
}