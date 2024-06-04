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
        <ion-title>Delete flashcard</ion-title>
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
          <ion-title size="large">Delete flashcard</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- css custom -->
      <div id="container">
        <div id="container-wrap">
          <!-- grid system handle by ionic -->
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label size="default" color="primary">
                  Delete flashcard {{ card.title }} ?
                </ion-label>
              </ion-col>
            </ion-row>
            <ion-row v-if="!card.isDelete">
              <ion-col>
                <!-- link to Delete flashcard page -->
                <ion-button @click="delCard()" color="danger" size="default">
                  Delete
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row v-if="msg.isDisplay">
              <ion-col>
                <ion-label :color="msg.color">
                  {{ msg.text }}
                </ion-label>
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

import { onIonViewWillEnter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import { delAppFileById, readAppFile } from "../composables/filesystem.js";

const card = reactive({
  id: "",
  title: "",
  isDelete: false,
});

const msg = reactive({
  isDisplay: false,
  text: "",
  color: "",
});

onIonViewWillEnter(() => {
  // Reset delete action
  card.isDelete = false;
  // Retrieve /:id from route
  const route = useRoute();
  card.id = route.params.id;
  // Retrieve cards
  readAppFile().then((data) => {
    if (data) {
      // Get current card data by id
      const cardData = data.find((c) => c.id === card.id);
      card.title = cardData.title;
    }
  });
});

async function delCard() {
  try {
    await delAppFileById(card.id);
    msg.isDisplay = true;
    msg.text = "Flashcard deleted";
    msg.color = "success";
    card.isDelete = true;
  } catch (e) {
    msg.isDisplay = true;
    msg.text = "Flashcard not deleted";
    msg.color = "danger";
  }
}
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
  pdeleteing-top: 56px;
  pdeleteing-bottom: 56px;
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
