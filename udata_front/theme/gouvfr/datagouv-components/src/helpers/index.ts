import { readonly } from "vue";
import { useI18n } from "vue-i18n";
import { dayjs } from "./i18n";
import markdown, { removeMarkdown } from "./markdown";
import { toggleAccordion } from "./toggleAccordion";
import { ResourceType } from "../types/resources";
import { TemporalCoverage } from "../types/datasets";
import getUserAvatar, { useUserAvatar } from "./getUserAvatar";

export const RESOURCE_TYPE = readonly(["main", "documentation", "update", "api", "code", "other"] as const);

export const getResourceLabel = (type: ResourceType) => {
  const { t } = useI18n();
  switch(type) {
    case "main":
      return t("Main file");
    case "documentation":
      return t("Documentation");
    case "update":
      return t("Update");
    case "api":
      return t("API");
    case "code":
      return t("Source code");
    case "other":
      return t("Other");
  }
}

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

export const summarize = (val: number, fractionDigits = 0) => {
  const toFixedIfNotZero = (value: number) => {
    const asString = value.toFixed(fractionDigits);
    if (! asString.includes('.')) {
      return asString;
    }

    // Remove trailing "0" to not show "1.0" but only "1"
    return asString.replace(/0+$/, '').replace(/\.$/, '')
  }

  if(!val) {
    return "0";
  }
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z']
  for (let unit of units) {
      if (Math.abs(val) < 1000.0) {
        return `${toFixedIfNotZero(val)}${unit}`
      }
      val /= 1000.0
  }
  return `${toFixedIfNotZero(val)}Y`
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
  return dateWithoutTime.fromNow();
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

const isFirstYearDay = (date: dayjs.Dayjs): boolean => { return date.date() == 1 && date.month() == 0; }
const isLastYearDay = (date: dayjs.Dayjs): boolean => { return date.date() == 31 && date.month() == 11; }
const isFirstMonthDay = (date: dayjs.Dayjs): boolean => { return date.date() == 1; }
const isLastMonthDay = (date: dayjs.Dayjs): boolean => {
  let nextDay = date.add(1, 'day');
  return nextDay.month() !== date.month();
}

export const formatDateRange = (daterange: TemporalCoverage) => {
  if(!daterange.start)
    return ''
  const { t } = useI18n();
  const start = dayjs(daterange.start);
  const end = daterange.end ? dayjs(daterange.end) : null;
  if (end) {
    if ( isFirstYearDay(start) && isLastYearDay(end)) {
      if (start.year() === end.year())
        return start.format('YYYY');
      return t("{start} to {end}", {start: start.format('YYYY'), end: end.format('YYYY')});
    }
    if ( isFirstMonthDay(start) && isLastMonthDay(end) ) {
      if (start.month() === end.month() && start.year() === end.year())
        return start.format('YYYY/MM');
      return t("{start} to {end}", {start: start.format('YYYY/MM'), end: end.format('YYYY/MM')});
    }
    return t("{start} to {end}", {start: start.format('L'), end: end.format('L')});
  }
  return t("since {date}", {date: start.format('L')});
}

export { getUserAvatar, markdown, removeMarkdown, toggleAccordion, useUserAvatar };
