import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers"; // ✅ Import headers

export const locales = ["en", "ar"];

export default getRequestConfig(async () => {
    const requestHeaders = await headers(); // ✅ Await the headers
    const locale = requestHeaders.get("X-NEXT-INTL-LOCALE"); // ✅ Now `get()` will work
    console.log("Detected locale:", locale); // ✅ Check the locale value

    if (!locale || !locales.includes(locale)) {
        console.log("Locale not found, returning 404");
        notFound();
    }

    return {
        messages: (await import(`./messages/${locale}.json`)).default
    };
});
