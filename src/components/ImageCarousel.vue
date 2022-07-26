<template>
  <Carousel :itemsToShow="1.6" :wrapAround="true" :autoplay="5000">
    <Slide v-for="image in images" :key="image">
      <div class="carousel__item">
        <img :src="image" alt="" />
      </div>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import {Carousel, Pagination, Slide} from "vue3-carousel";

const images = [
  "/assets/images/home_carousel/extinguisher.jpg",
  "/assets/images/home_carousel/helper.jpg",
  "/assets/images/home_carousel/hero-1.jpg",
  "/assets/images/home_carousel/portrait-of-smiling-female-firefighter-in-helmet-at-fire-station-MASF14186.jpg",
  "/assets/images/home_carousel/smoke_alarm.0.jpg",
];
</script>

<style scoped>
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}

.carousel__slide--visible > .carousel__item {
  margin: 0 20px 0 20px;
  opacity: 1;
  transform: rotateY(0);
}

.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}

.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}

.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}
</style>
