import { useI18n } from "vue-i18n";
import { dayjs } from "./i18n";
import markdown from "./markdown";
import { toggleAccordion } from "./toggleAccordion";
import RemoveMarkdown from "remove-markdown";

export const filesize = (val: number) => {
  const { t } = useI18n();
  const suffix = t('B')
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z']
  for (let unit of units) {
      if (Math.abs(val) < 1024.0) {
        return `${val.toFixed(1)}${unit}${suffix}`
      }
      val /= 1024.0
  }
  return `${val.toFixed(1)}Y${suffix}`
}

/**
 * Format date based on locale.
 */
export const formatDate = (date: Date | string, format = 'LL') => {
  return dayjs(date).format(format);
}

/**
 * Format date as relative from now.
 * It displays "today" or dayjs.fromNow content, based on date.
 */
export const formatFromNow = (date: Date | string) => {
  const { t } = useI18n();
  const today = dayjs().startOf("date");
  const dateWithoutTime = dayjs(date).startOf("date");
  if(today.isSame(dateWithoutTime)) {
    return t("today");
  }
  return dayjs(date).fromNow();
}

/**
 * Format date relative form now if date is less than a month ago.
 * Otherwise, show a formatted date.
 */
export const formatRelativeIfRecentDate = (date: Date | string) => {
  const { t } = useI18n();
  const today = dayjs().startOf("date");
  const dateWithoutTime = dayjs(date).startOf("date");
  const DONT_ROUND_DIFF = true;
  if(today.diff(dateWithoutTime, 'month', DONT_ROUND_DIFF) > 1) {
    return t("on {date}", {date: formatDate(date)});
  }
  return formatFromNow(date);
}

export const truncate = (val: string, length = 300) => {
  if (typeof val !== "string") return;
  return val.length > length ? val.slice(0, length) + "…" : val;
};

export const excerpt = (val: string, length = 300) => {
  if (typeof val !== "string") return;
  return truncate(RemoveMarkdown(val), length);
};

export { markdown, toggleAccordion };
