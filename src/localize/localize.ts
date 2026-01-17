import * as en from './languages/en.json';
import * as fr from './languages/fr.json';
import { HomeAssistant } from '../types/hass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  en: en,
  fr: fr,
};

const DEFAULT_LANG = 'en';

/**
 * Localize a string key based on the current Home Assistant language
 * @param hass Home Assistant instance
 * @param string Dot-notation key (e.g., 'card.turn_on')
 * @param search Optional search string to replace or object with replacements
 * @param replace Optional replacement string (used only if search is a string)
 * @returns Localized string
 */
export function localize(
  hass: HomeAssistant | undefined,
  string: string,
  search: string | Record<string, string | number> = '',
  replace = ''
): string {
  const lang = hass?.locale?.language ?? DEFAULT_LANG;

  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages[DEFAULT_LANG]);
  }

  if (translated === undefined) {
    translated = string.split('.').reduce((o, i) => o[i], languages[DEFAULT_LANG]);
  }

  if (typeof search === 'object' && search !== null) {
    // Handle object-based replacements
    Object.entries(search).forEach(([key, value]) => {
      translated = translated.replace(`\${${key}}`, String(value));
    });
  } else if (search !== '' && replace !== '') {
    // Handle string-based replacements
    translated = translated.replace(search, replace);
  }

  return translated || string;
}

/**
 * Get a translated string for a specific key and language
 */
function getTranslatedString(key: string, lang: string): string | undefined {
  try {
    return key
      .split('.')
      .reduce((o, i) => (o as Record<string, unknown>)[i], languages[lang]) as string;
  } catch (_) {
    return undefined;
  }
}

/**
 * Setup a custom localize function bound to a Home Assistant instance
 * @param hass Home Assistant instance
 * @returns Localize function
 */
export default function setupCustomlocalize(hass?: HomeAssistant) {
  return function (key: string): string {
    const lang = hass?.locale?.language ?? DEFAULT_LANG;

    let translated = getTranslatedString(key, lang);
    if (!translated) translated = getTranslatedString(key, DEFAULT_LANG);
    return translated ?? key;
  };
}
