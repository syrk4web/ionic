<template>
  <ion-page>
    <!-- haut-de-page -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- contenu scrollable de la page -->
    <ion-content :fullscreen="true">
      <!-- haut-de-page : duplicate for iOS -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- css custom -->
      <div id="container">
        <div id="container-wrap">
          <!-- grid system handle by ionic -->
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label color="primary"
                  >Welcome to flashcard app !</ion-label
                >
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <!-- button to choose mode -->
                <!-- go to /mode (render ModePage.vue)-->
                <!-- router-direction : animation -->
                <ion-button
                  router-link="/mode"
                  router-direction="forward"
                  size="default"
                >
                  Learn
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <!-- button to manage flashcard -->
                <ion-button
                  router-link="/manage"
                  router-direction="forward"
                  size="default"
                  >Manage</ion-button
                >
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </div>
    </ion-content>

    <!-- pied-de-page -->
    <ion-footer>
      <ion-toolbar>
        <ion-title size="small" class="ion-text-center">
          Flashcard app
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

// Lifecycle hook
// Execute du code quand la page est affichée
import { onIonViewDidEnter } from "@ionic/vue";
// Check les permissions
import { setPermissions } from "../composables/filesystem.js";

// Quand la page est affichée, vérifier ou demander
// les permissions à l'utilisateur
onIonViewDidEnter(async () => {
  await setPermissions();
});
</script>

<style scoped>
#container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* limit width of elements and center them */
#container-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding-top: 56px;
  padding-bottom: 56px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
