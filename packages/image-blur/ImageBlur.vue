<template>
  <figure
    name="blur"
    ref="blur"
    class="blur-img-container"
    :style="{background:color}"
    :data-real-width="width"
    :data-real-height="height"
    :data-src="min"
    :src="src"
  ></figure>
</template>

<script>
export default {
  name: 'ImageBlur',
  props: {
    width: [String, Number],
    height: [String, Number],
    src: String,
    color: String,
    min: String
  },
  mounted () {
    let elem = this.$refs.blur
    let setStyle = (elem, className) => {
      if (elem.classList) {
        elem.classList.add(className);
      } else {
        elem.className += ` ${className}`;
      }
    };

    let blurImg = () => {
      let thumbSrc = elem.getAttribute('data-src'),
        lgSrc = elem.getAttribute('src'),
        realWidth = elem.getAttribute('data-real-width'),
        realHeight = elem.getAttribute('data-real-height');
      elem.style.paddingBottom = `${(realHeight / realWidth) * 100}%`;

      let thumb = new Image();
      thumb.src = thumbSrc;
      thumb.onload = () => {
        setStyle(thumb, 'thumb-loaded');
      };
      elem.appendChild(thumb);

      let realImg = new Image();
      realImg.src = lgSrc;
      realImg.onload = () => {
        setStyle(realImg, 'large-loaded');
        setStyle(thumb, 'thumb-hidden');
      };
      elem.appendChild(realImg);
    };
    blurImg();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.blur-img-container {
  position: relative;
  background: #eeeeee;
  background-size: cover;
  overflow: hidden;
}

.blur-img-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.4s ease-in-out;
}

.blur-img-container .thumb-loaded {
  opacity: 1;
  filter: blur(10px);
  transform: scale(1);
}

.blur-img-container .large-loaded {
  opacity: 1;
}

.blur-img-container .thumb-hidden {
  opacity: 0;
}
</style>
