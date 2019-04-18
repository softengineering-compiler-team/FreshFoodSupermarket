<template>
    <div>
       <Carousel autoplay autoplay-speed:5000 loop>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="../assets/default.png">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="../assets/default.png">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="../assets/default.png">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="../assets/default.png">
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
export default {
  data () {
    return {
      value2: 5000
    }
  }
}
</script>
<style>
.ad-img {
  height: 300px;
}
</style>
