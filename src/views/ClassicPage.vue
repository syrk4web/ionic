<template>
  <ion-page>
    <!-- haut-de-page -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <!-- il s'affiche si historique disponible -->
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Classic</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- contenu scrollable de la page -->
    <ion-content :fullscreen="true">
      <!-- haut-de-page : duplicate for iOS -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-buttons slot="start">
            <!-- il s'affiche si historique disponible -->
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title size="large">Classic</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- css custom -->
      <div id="container">
        <div id="container-wrap">
          <swiper class="swiper-custom">
            <swiper-slide
              v-for="(card, id) in cards.data"
              :key="card"
              class="slide-custom"
              @click="cards.showAnswerID = cards.showAnswerID === id ? -1 : id"
            >
              <ion-label
                :color="cards.showAnswerID === id ? 'success' : 'primary'"
              >
                {{ cards.showAnswerID === id ? card.answer : card.question }}
              </ion-label>
            </swiper-slide>
          </swiper>
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
  IonFooter,
  IonBackButton,
  IonButtons,
  IonLabel,
} from "@ionic/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

import { onIonViewWillEnter } from "@ionic/vue";
import { reactive } from "vue";
import { readAppFile } from "../composables/filesystem.js";

const cards = reactive({
  data: [],
  showAnswerID: -1,
});

onIonViewWillEnter(async () => {
  // reset
  cards.showAnswerID = -1;
  cards.data = await readAppFile();
});
</script>

<style scoped>
/* swiper take all height but footer and header exclude */
.swiper-custom {
  height: 75vh;
}
/* slides take all viewport width */
.slide-custom {
  width: 100%;
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
