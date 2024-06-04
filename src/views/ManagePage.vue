<template>
  <ion-page>
    <!-- haut-de-page -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <!-- slot="start" : force la position à gauche -->
        <ion-buttons slot="start">
          <!-- il s'affiche si historique disponible -->
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Manage</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- contenu scrollable de la page -->
    <ion-content :fullscreen="true">
      <!-- haut-de-page : duplicate for iOS -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <!-- slot="start" : force la position à gauche -->
          <ion-buttons slot="start">
            <!-- il s'affiche si historique disponible -->
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title size="large">Manage</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- css custom -->
      <div id="container">
        <div id="container-wrap">
          <!-- grid system handle by ionic -->
          <ion-grid>
            <ion-row>
              <ion-col>
                <!-- link to add flashcard page -->
                <ion-button
                  color="success"
                  size="default"
                  router-link="/addFlashcard"
                  router-direction="forward"
                >
                  Add flashcard
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-label
                  size="default"
                  color="secondary"
                  class="ion-text-nowrap"
                >
                  List of cards
                </ion-label>
              </ion-col>
            </ion-row>
            <ion-row
              class="card-container"
              v-for="card in manage.data"
              :key="card"
            >
              <ion-col>
                <div>
                  <ion-label class="card-item-title">
                    {{ card.title }}
                  </ion-label>
                </div>
                <div>
                  <ion-button
                    color="warning"
                    fill="outline"
                    :router-link="`/editFlashcard/${card.id}`"
                    router-direction="forward"
                    >EDIT</ion-button
                  >
                  <ion-button
                    color="danger"
                    fill="outline"
                    :router-link="`/deleteFlashcard/${card.id}`"
                    router-direction="forward"
                    >DELETE</ion-button
                  >
                </div>
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
  IonBackButton,
  IonButtons,
} from "@ionic/vue";

import { readAppFile } from "../composables/filesystem.js";
// S'exécute juste avant d'afficher la page
import { onIonViewWillEnter } from "@ionic/vue";
import { reactive } from "vue";

// reactive object to store data retrive from filesystem
const manage = reactive({
  data: [],
});

// Get data from filesystem
onIonViewWillEnter(async () => {
  manage.data = await readAppFile();
});
</script>

<style scoped>
.card-container {
  margin-top: 16px;
  padding: 8px;
  border-top: 1px solid #8c8c8c;
  width: 100%;
}

.card-title-container {
  margin-top: 24px;
}

.card-item-title {
  word-break: break-all;
}

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
