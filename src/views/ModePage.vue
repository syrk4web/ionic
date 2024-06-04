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
        <ion-title>Modes</ion-title>
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
          <ion-title size="large">Modes</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- css custom -->
      <div id="container">
        <div id="container-wrap">
          <!-- grid system handle by ionic -->
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label color="primary"> Choose your mode ! </ion-label>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <!-- button to choose mode -->
                <!-- go to /mode (render ModePage.vue)-->
                <!-- router-direction : animation -->
                <ion-button
                  router-link="/classic"
                  router-direction="forward"
                  size="default"
                >
                  Classic
                </ion-button>
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
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
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
