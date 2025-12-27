import { ui, type TranslationKey } from "./ui";

/**
 * Returns translation function for specific language
 * Supports namespace:key format (e.g., "common:nav.home")
 */
export function useTranslations(lang: keyof typeof ui) {
    return function t(
        key: TranslationKey,
        params?: Record<string, string | number>
    ) {
        let namespace: string;
        let translationKey: string;

        // If no colon, assume "common" namespace
        if (!key.includes(":")) {
            namespace = "common";
            translationKey = key;
        } else {
            [namespace, translationKey] = key.split(":");
            if (!namespace || !translationKey) {
                return key;
            }
        }

        // Support nested object access with dot notation (e.g., "languages.en")
        const getNestedValue = (obj: any, path: string): any => {
            return path
                .split(".")
                .reduce((current, key) => current?.[key], obj);
        };

        const translation =
            getNestedValue(ui[lang]?.[namespace], translationKey) ||
            key;

        return params && typeof translation === "string"
            ? interpolateParams(translation, params)
            : translation;
    };
}

/**
 * Replaces {{key}} placeholders in text with provided parameters
 */
function interpolateParams(
    text: string,
    params: Record<string, string | number>
): string {
    return Object.entries(params).reduce(
        (result, [key, value]) =>
            result.replace(new RegExp(`{{${key}}}`, "g"), String(value)),
        text
    );
}