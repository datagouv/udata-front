<!--
---
name: Scrollable
category: Interactions
---

# Scrollable

A mixin to allow Vue components to scroll after all data are loaded.
This works with our global event bus `$bus`.
The events used are :
- `loading` to register a loading in progress
- `loaded` to inform that the loading is finished
-->
<script>
export default {
  data() {
    return {
      _dataLoadingOnPage: 0,
      _dataLoadedOnPage: 0,
      _scrollIntent: null,
    }
  },
  computed: {
    _noLoadingOnPage() {
      return this._dataLoadingOnPage === this._dataLoadedOnPage;
    }
  },
  watch: {
    _noLoadingOnPage: {
      immediate: false,
      handler() {
        if (this._noLoadingOnPage && this._scrollIntent) {
          setTimeout(() => {
            this._scrollIntent();
            this._scrollIntent = null;
          }, 350)
        }
      }
    }
  },
  mounted() {
    this.$bus.on("loading", () => this._countLoadingOnPage());
    this.$bus.on("loaded", () => this._countLoadedOnPage());
  },
  methods: {
    addScrollIntent(scrollFunction) {
      if(this._noLoadingOnPage) {
        scrollFunction();
      } else {
        this._scrollIntent = scrollFunction;
      }
    },
    _countLoadedOnPage() {
      this._dataLoadedOnPage++;
    },
    _countLoadingOnPage() {
      this._dataLoadingOnPage++;
    },
  }
}
</script>
