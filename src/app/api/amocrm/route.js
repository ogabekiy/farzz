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
    // 3. ENV VARIABLES
    // ==========================================

    const token = process.env.AMO_LONG_LIVED_TOKEN?.trim();
    const subdomain = process.env.AMO_SUBDOMAIN?.trim();

    const baseUrl = getAmoBaseUrl(subdomain);

    // Subdomain tekshirish
    if (!subdomain) {
      return NextResponse.json(
        {
          success: false,

          step: "environment",

          message: "AMO_SUBDOMAIN topilmadi",

          debug: {
            subdomainExists: false,
            tokenExists: Boolean(token),
            tokenLength: token ? token.length : 0,
          },
        },
        {
          status: 500,
        }
      );
    }

    // Token tekshirish
    if (!token) {
      return NextResponse.json(
        {
          success: false,

          step: "environment",

          message: "AMO_LONG_LIVED_TOKEN topilmadi",

          debug: {
            subdomainExists: true,
            tokenExists: false,
            tokenLength: 0,
          },
        },
        {
          status: 500,
        }
      );
    }

    // Base URL tekshirish
    if (!baseUrl) {
      return NextResponse.json(
        {
          success: false,

          step: "environment",

          message: "amoCRM base URL yaratilmadi",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // 4. LEAD + CONTACT YARATISH
    // ==========================================

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

    console.log("Creating Lead + Contact...");

    // ==========================================
    // 5. LEAD + CONTACT REQUEST
    // ==========================================

    const leadResponse = await fetch(leadUrl, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",

        Accept: "application/json",
      },

      body: JSON.stringify([lead]),
    });

    // ==========================================
    // 6. LEAD RESPONSE
    // ==========================================

    const {
      data: leadData,
      raw: leadRaw,
    } = await parseAmoResponse(leadResponse);

    console.log("=================================");
    console.log("AMOCRM LEAD RESPONSE");
    console.log("=================================");
    console.log("Status:", leadResponse.status);
    console.log("Status text:", leadResponse.statusText);
    console.log("Response:", leadRaw);
    console.log("=================================");

    // ==========================================
    // 7. LEAD ERROR
    // ==========================================

    if (!leadResponse.ok) {
      return NextResponse.json(
        {
          success: false,

          step: "amocrm_lead",

          message:
            leadResponse.status === 401
              ? "amoCRM authorization xatosi"
              : leadResponse.status === 400
                ? "amoCRM Lead ma'lumotlarini qabul qilmadi"
                : "amoCRM Lead yaratishda xatolik",

          debug: {
            status: leadResponse.status,

            statusText: leadResponse.statusText,

            url: leadUrl,

            amocrmResponse: leadData || leadRaw || null,
          },
        },
        {
          status: leadResponse.status,
        }
      );
    }

    // ==========================================
    // 8. YARATILGAN LEAD ID
    // ==========================================

    /**
     * amoCRM odatda:
     *
     * [
     *   {
     *     id: 33366421,
     *     contact_id: 45584347
     *   }
     * ]
     *
     * ko'rinishida qaytaradi.
     */

    const createdLead = Array.isArray(leadData)
      ? leadData[0]
      : null;

    const leadId = createdLead?.id;

    const contactId = createdLead?.contact_id;

    console.log("Created Lead ID:", leadId);

    console.log("Created Contact ID:", contactId);

    // Lead ID bo'lmasa
    if (!leadId) {
      return NextResponse.json(
        {
          success: false,

          step: "lead_id",

          message:
            "Lead yaratildi, lekin Lead ID topilmadi",

          data: leadData,
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // 9. MESSAGE'NI LEADGA NOTE QILIB QO'SHISH
    // ==========================================

    const noteUrl = `${baseUrl}/api/v4/leads/notes`;

    console.log("amoCRM Note URL:", noteUrl);

    const note = {
      entity_id: leadId,

      note_type: "common",

      params: {
        text: message,
      },
    };

    console.log("Adding message note to Lead...");

    // ==========================================
    // 10. NOTE REQUEST
    // ==========================================

    const noteResponse = await fetch(noteUrl, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",

        Accept: "application/json",
      },

      body: JSON.stringify([note]),
    });

    // ==========================================
    // 11. NOTE RESPONSE
    // ==========================================

    const {
      data: noteData,
      raw: noteRaw,
    } = await parseAmoResponse(noteResponse);

    console.log("=================================");
    console.log("AMOCRM NOTE RESPONSE");
    console.log("=================================");
    console.log("Status:", noteResponse.status);
    console.log("Status text:", noteResponse.statusText);
    console.log("Response:", noteRaw);
    console.log("=================================");

    // ==========================================
    // 12. NOTE ERROR
    // ==========================================

    if (!noteResponse.ok) {
      /**
       * Muhim:
       *
       * Lead va Contact allaqachon yaratilgan.
       *
       * Faqat message note yaratishda xato bo'lgan.
       */

      return NextResponse.json(
        {
          success: false,

          step: "amocrm_note",

          message:
            "Lead va Contact yaratildi, lekin message'ni Leadga qo'shib bo'lmadi",

          lead: {
            id: leadId,
            contactId,
          },

          debug: {
            status: noteResponse.status,

            statusText: noteResponse.statusText,

            url: noteUrl,

            amocrmResponse: noteData || noteRaw || null,
          },
        },
        {
          status: noteResponse.status,
        }
      );
    }

    // ==========================================
    // 13. TELEGRAM NOTIFICATION
    // ==========================================

    let telegramSent = false;

    try {
      await sendMessageToAdmin(
        name,
        phone,
        message
      );

      telegramSent = true;

      console.log("=================================");
      console.log("TELEGRAM SUCCESS");
      console.log("=================================");
      console.log("Telegram xabar muvaffaqiyatli yuborildi");
      console.log("=================================");
    } catch (telegramError) {
      /**
       * Telegram notification xato bo'lsa ham
       * amoCRM ma'lumotlari allaqachon saqlangan.
       *
       * Shuning uchun request'ni failed qilmaymiz.
       */

      console.error("=================================");
      console.error("TELEGRAM ERROR");
      console.error("=================================");
      console.error(telegramError);
      console.error("=================================");
    }

    // ==========================================
    // 14. SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,

      step: "completed",

      message:
        "Lead, Contact va message amoCRM'ga muvaffaqiyatli yuborildi",

      data: {
        leadId,

        contactId,

        lead: leadData,

        note: noteData,

        telegramSent,
      },
    });
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