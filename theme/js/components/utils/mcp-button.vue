<template>
    <div class="fr-connect-group">
        <button @click.prevent="launchSso" class="fr-connect">
            <span class="fr-connect__login">S’identifier avec</span>
            <span class="fr-connect__brand">MonComptePro</span>
        </button>
        <p>
            <a href="https://moncomptepro.beta.gouv.fr/" target="_blank"  rel="noopener" title="Qu’est-ce que MonComptePro ?">Qu’est-ce que MonComptePro ?</a>
        </p>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { fetchHtml } from '../../api/mcp';

export default defineComponent({
setup() {
    const launchSso = () => {
        fetchHtml().then(console.log('CALL'))
    };

    return {
      launchSso
    }
},
});
</script>
