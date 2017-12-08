<template>
  <span class="i-tooltip" :class="classes" :style="style">
    <slot></slot>
  </span>
</template>

<style lang="css" src="../node_modules/i-colors/dist/i-colors.css" scoped></style>
<style lang="scss" src="./iTooltip.scss" scoped></style>

<script>
import transitionEndEventName from './transitionEndEventName';

export default {
  name: 'i-tooltip',
  props: {
    isTooltipPosition: {
      type: String,
      default: 'top',
    },
  },
  data: () => ({
    active: false,
    parentClass: null,
    transitionOff: false,
    top: false,
    left: false,
  }),
  computed: {
    classes() {
      const cssClasses = {
        'is-active': this.active,
        'is-transition-off': this.transitionOff,
        'is-tooltip-top': this.isTooltipPosition === 'top',
        'is-tooltip-right': this.isTooltipPosition === 'right',
        'is-tooltip-bottom': this.isTooltipPosition === 'bottom',
        'is-tooltip-left': this.isTooltipPosition === 'left',
      };
      if (this.parentClass) {
        cssClasses[this.parentClass] = true;
      }
      return cssClasses;
    },
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
      };
    },
  },
  watch: {
    isTooltipPosition() {
      this.calculateTooltipPosition();
    },
  },
  methods: {
    removeTooltips() {
      if (this.tooltipElement && this.tooltipElement.parentNode) {
        this.tooltipElement.removeEventListener(
          transitionEndEventName,
          this.removeTooltips,
        );
        this.tooltipElement.parentNode.removeChild(this.tooltipElement);
      }
    },
    calculateTooltipPosition() {
      let position = this.parentElement.getBoundingClientRect();
      let pos = {};
      switch (this.isTooltipPosition) {
        case 'top':
          this.top = position.top - this.$el.offsetHeight;
          this.left = position.left + position.width / 2;
          break;
        case 'right':
          this.top = position.top;
          this.left = position.left + position.width;
          break;
        case 'bottom':
          this.top = position.bottom;
          this.left = position.left + position.width / 2;
          break;
        case 'left':
          this.top = position.top;
          this.left = position.left - this.$el.offsetWidth;
          break;
        default:
          console.warn(`Invalid ${this.isTooltipPosition} position`);
      }
    },
    generateTooltipClasses() {
      let classes = [];
      [...this.parentElement.classList].forEach(cssClass => {
        if (cssClass.indexOf('is-') >= 0 && cssClass !== 'is-active') {
          classes.push(cssClass + '-tooltip');
        }
      });
      this.parentClass = classes.join(' ');
    },
    open() {
      this.removeTooltips();
      this.$nextTick(() => {
        document.body.appendChild(this.tooltipElement);
        getComputedStyle(this.tooltipElement).top;
        this.transitionOff = true;
        this.generateTooltipClasses();
        this.calculateTooltipPosition();
        window.setTimeout(() => {
          this.transitionOff = false;
          this.active = true;
        }, 10);
      });
    },
    close() {
      this.active = false;
      this.tooltipElement.removeEventListener(
        transitionEndEventName,
        this.removeTooltips,
      );
      this.tooltipElement.addEventListener(
        transitionEndEventName,
        this.removeTooltips,
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tooltipElement = this.$el;
      this.parentElement = this.tooltipElement.parentNode;
      this.$el.parentNode.removeChild(this.$el);
      this.parentElement.addEventListener('mouseenter', this.open);
      this.parentElement.addEventListener('focus', this.open);
      this.parentElement.addEventListener('mouseleave', this.close);
      this.parentElement.addEventListener('blur', this.close);
    });
  },
  beforeDestroy() {
    this.active = false;
    this.removeTooltips();
    if (this.parentElement) {
      this.parentElement.removeEventListener('mouseenter', this.open);
      this.parentElement.removeEventListener('focus', this.open);
      this.parentElement.removeEventListener('mouseleave', this.close);
      this.parentElement.removeEventListener('blur', this.close);
    }
  },
};
</script>