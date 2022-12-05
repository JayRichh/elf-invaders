<script>
import axios from "axios";
import CustomModal from "./components/CustomModal.vue";

export default {
  name: "GameWindow",

  data() {
    return {
      elves: [],
      timer: 0,
      name: "",
      gameOver: false,
      modal: false,
      loading: true,
      countdown: 5,
    };
  },

  async mounted() {
    // hit the API endpoint to wake the elves up
    const response = await axios.get(
      "https://elf-server.herokuapp.com/api/elf"
    );
    this.readyGame();
    this.elves = response.data;
  },

  methods: {
    async readyGame() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown--;
          this.readyGame();
        }, 1000);
      } else {
        this.loading = false;
        this.startTimer();
      }
    },

    resetTimer() {
      this.timer = 0;
    },

    startTimer() {
      // if modal is open then stop the timer
      if (this.modal) {
        return;
      } else if (!this.gameOver) {
        this.timer = Math.round((this.timer + 0.01) * 100) / 100;
        setTimeout(this.startTimer, 10);
      }
    },

    pauseTimer() {
      clearInterval(this.timer);
    },

    reset() {
      this.$router.push("/");
    },

    endGame() {
      this.gameOver = true;
      this.modal = true;
      this.pauseTimer();
    },

    openModal() {
      this.modal = true;
      this.pauseTimer();
    },

    handleElfClick(elf) {
      // find the elf in the array
      const foundElf = this.elves.find((e) => e._id === elf._id);
      // remove the elf from the array
      this.elves.splice(this.elves.indexOf(foundElf), 1);
      // if there are no more elves, call the endGame function
      if (this.elves.length === 0) {
        this.endGame();
      }
    },
  },

  components: {
    CustomModal,
  },

  computed: {
    elvesRemaining() {
      return this.elves.length;
    },
    timeTaken() {
      return this.timer;
    },
    isLoading() {
      return this.loading;
    },
  },
};
</script>

<template>
  <div v-if="isLoading" class="loading">
    <div class="loading-content">
      <p>Get Ready!!</p>
      <p>{{ countdown }}</p>
    </div>
  </div>
  <div v-else class="game-window">
    <nav>
      <h3>Find the elves!</h3>
      <h4 class="timer">Time: {{ timer }}</h4>
      <h4>Elves remaining: {{ elvesRemaining }}</h4>
      <button @click="$router.push('/')">Restart</button>
    </nav>

    <CustomModal
      v-if="modal"
      :show="modal"
      @confirm="confirm"
      @cancel="cancel"
      :timeTaken="timeTaken"
    />

    <div class="game-window__container">
      <!-- // img req bg image for the game -->
      <div class="image-container">
        <img
          src="../assets/houses.jpg"
          class="gameboard-img"
          alt="elf background"
        />
        <img
          v-for="elf in elves"
          :key="elf._id"
          class="game-window__elf"
          @click="handleElfClick(elf)"
          :src="elf.url"
          alt="elf"
          :id="'elf' + elf.elfId"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
}

.loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
}

.game-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f5f5f5;
}

.game-window__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.image-container {
  position: relative;
  object-fit: cover;
  margin: 0 auto;
}

.gameboard-img {
  max-height: 100vh;
  width: 100%;
  object-fit: contain;
}

.game-window__elf {
  position: absolute;
  height: 5%;
  width: auto;
  z-index: 1;
  cursor: pointer;
}

#elf1 {
  top: 40.5%;
  left: 46%;
  transform: scaleX(-1);
  rotate: -120deg;
}

#elf2 {
  top: 14%;
  left: 8%;
}

#elf3 {
  top: 34.5%;
  left: 5%;
}

#elf4 {
  top: 89.5%;
  left: 4.5%;
}

#elf5 {
  top: 33.5%;
  left: 96%;
  transform: scaleX(-1);
}

#elf6 {
  top: 3%;
  left: 90%;
  transform: scaleX(-1);
}

#elf7 {
  top: 84.5%;
  left: 56%;
}

#elf8 {
  top: 19%;
  left: 52.5%;
}

#elf9 {
  top: 48%;
  left: 65%;
  transform: scaleX(-1);
}

#elf10 {
  top: 52%;
  left: 26%;
}

nav {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 7vh;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

nav h3 {
  margin-left: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

nav h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

nav button {
  margin-right: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
  background-color: #f5f5f5;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  cursor: pointer;
}

.modal {
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal__content {
  margin-bottom: 1rem;
}

.modal__action {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 1rem;
}

.modal__close {
  background-color: transparent;
  border: none;
  font-size: 2rem;
  position: absolute;
  top: 0;
  right: 0;
}

.modal__close svg {
  fill: #000;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: #f2f2f2;
  padding: 0 1rem;
}

.nav h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.nav h4 {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}
</style>
