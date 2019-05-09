<template>
    <div>
       <Carousel autoplay :autoplay-speed='3000'>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="/static/lunbo/轮播1.jpg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="/static/lunbo/轮播2.jpg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="/static/lunbo/轮播3.jpg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img class="ad-img" src="/static/lunbo/轮播4.jpg">
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
  height: 400px;
  width: 90%;
}
</style>
