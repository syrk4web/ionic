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
        <ion-title>Edit flashcard</ion-title>
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
          <ion-title size="large">Edit flashcard</ion-title>
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
                  Edit your flashcard !
                </ion-label>
              </ion-col>
            </ion-row>
            <ion-row v-if="!card.isEdit">
              <ion-col>
                <!-- ion-list = <ul> ou <ol> en html -->
                <ion-list>
                  <!-- ion-item = <li> en html -->
                  <ion-item>
                    <!-- label-placement : position du label-->
                    <!-- label : ajoute un label -->
                    <!-- placeholder + type : similaire à HTML -->
                    <!-- @ionInput : event qui se fire à l'input -->
                    <!-- validate($event, title) : la fonction à exécuter -->
                    <ion-input
                      @ionInput="validate($event, title)"
                      label="Title"
                      label-placement="stacked"
                      placeholder="Enter title"
                      type="text"
                      :value="title.value"
                    >
                    </ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input
                      @ionInput="validate($event, question)"
                      label="Question"
                      label-placement="stacked"
                      placeholder="Enter question"
                      type="text"
                      :value="question.value"
                    >
                    </ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input
                      @ionInput="validate($event, answer)"
                      label="Answer"
                      label-placement="stacked"
                      placeholder="Enter answer"
                      type="text"
                      :value="answer.value"
                    >
                    </ion-input>
                  </ion-item>
                </ion-list>
              </ion-col>
            </ion-row>
            <ion-row v-if="!card.isEdit">
              <ion-col>
                <!-- link to add flashcard page -->
                <ion-button @click="edit()" color="warning" size="default">
                  Edit
                </ion-button>
              </ion-col>
            </ion-row>
            <!-- display on add click event -->
            <ion-row v-if="msg.isDisplay">
              <ion-col>
                <!-- msg is feedback of action -->
                <ion-label size="default" :color="msg.color">
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
  IonList,
  IonItem,
  IonInput,
} from "@ionic/vue";
import { readAppFile, editAppFileById } from "../composables/filesystem.js";

// Allow to use reactive object
import { reactive } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { useRoute } from "vue-router";

const card = reactive({
  id: "",
  title: "",
  isEdit: false,
});

onIonViewWillEnter(() => {
  // Reset delete action
  card.isEdit = false;
  // Retrieve /:id from route
  const route = useRoute();
  card.id = route.params.id;
  // Retrieve cards
  readAppFile().then((data) => {
    if (data) {
      // Get current card data by id
      const cardData = data.find((c) => c.id === card.id);
      card.title = cardData.title;
      // Set input values
      title.value = cardData.title;
      question.value = cardData.question;
      answer.value = cardData.answer;
    }
  });
});

const msg = reactive({
  isDisplay: false,
  text: "", // feedback message
  color: "danger", // success || warning
});

// objet reactif pour le titre
const title = reactive({
  // regex to validate title
  // only letters, numbers and spaces
  // length between 1 and 50
  regex: /^[a-zA-Z0-9\s]{1,50}$/,
  // state of validity
  isValid: true,
  value: "",
});

// objet reactif pour le titre
const question = reactive({
  // regex to validate title
  // only letters, numbers and spaces
  // length between 1 and 50
  regex: /^[a-zA-Z0-9\s]{8,50}$/,
  // state of validity
  isValid: true,
  value: "",
});

// objet reactif pour le titre
const answer = reactive({
  // regex to validate title
  // only letters, numbers and spaces
  // length between 1 and 50
  regex: /^[a-zA-Z0-9\s]{8,50}$/,
  // state of validity
  isValid: true,
  value: "",
});

// validate the input value and update the state
function validate(e, data) {
  const target = e.target;
  const value = e.target.value;
  // la valeur reactive est mise à jour pour :value
  data.value = value;
  // Check validity to update the state and UI
  if (data.regex.test(value)) {
    // "ion-invalid" and "ion-valid" are classes from ionic
    target.classList.remove("ion-invalid");
    target.classList.add("ion-valid");
    data.isValid = true;
  } else {
    target.classList.remove("ion-valid");
    target.classList.add("ion-invalid");
    data.isValid = false;
  }
}

async function edit() {
  // Check if all inputs are valid
  if (!title.isValid || !question.isValid || !answer.isValid) {
    // Send invalid feedback
    msg.text = "Invalid field input";
    msg.color = "danger";
    msg.isDisplay = true;
    return;
  }
  // If valid, retrieve and prepare data
  const item = {
    id: card.id,
    title: title.value,
    question: question.value,
    answer: answer.value,
  };
  // Try to store data
  try {
    await editAppFileById(card.id, item);
    // Feedback user
    msg.text = "Flashcard edited";
    msg.color = "success";
    msg.isDisplay = true;
    card.isEdit = true;
  } catch (e) {
    // Error feedback
    msg.text = "Error while editing flashcard";
    msg.color = "danger";
    msg.isDisplay = true;
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
