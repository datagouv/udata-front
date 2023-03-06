import {customRef, ref} from 'vue'

/**
 *
 * @param {Function} fn
 * @param {number} delay
 * @param {boolean} immediate
 * @returns {(...args: any[]) => void} debounced function
 */
export const debounce = (fn, delay = 0, immediate = false) => {
  let timeout;
  return (...args) => {
    if (immediate && !timeout) {
      fn(...args);
    }
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}

/**
 * @template T
 * @param {T} initialValue
 * @param {number} delay
 * @param {boolean} immediate
 * @returns {import("vue").Ref<import("vue").UnwrapRef<T>>}
 */
export default function useDebouncedRef (initialValue, delay = 0, immediate = false) {
  const state = ref(initialValue);
  return customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(
      value => {
        state.value = value;
        trigger();
      },
      delay,
      immediate,
    ),
  }));
}
