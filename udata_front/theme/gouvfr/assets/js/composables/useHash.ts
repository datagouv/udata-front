import { ref, onMounted, onUnmounted } from 'vue'

export function useHash() {
    const hash = ref(window.location.hash);
    const update = () => hash.value = window.location.hash;

    onMounted(() => window.addEventListener('hashchange', update));
    onUnmounted(() => window.removeEventListener('hashchange', update));

    return { hash };
}

export function resetHash() {
    history.pushState(null, "", " ");
    window.dispatchEvent(new HashChangeEvent('hashchange'));
}