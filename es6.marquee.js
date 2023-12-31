class Marquee {
  constructor(element, options) {
    this.element = document.querySelector(element);
    this.wrapper = this.element.parentElement;
    this.items = this.element.querySelectorAll(options.itemSelector);

    this.settings = {
      enable: true,
      direction: options.direction || 'vertical',
      itemSelector: options.itemSelector || 'li',
      delay: options.delay || 3000,
      speed: options.speed || 1,
      timing: options.timing || 1,
      mouse: options.mouse || true
    };

    this.next = 0;
    this.timeoutHandle;
    this.intervalHandle;

    if (!this.settings.enable) return;

    this.init();
  }

  init() {
    try {
      const totalSize = [...this.items].reduce((acc, item) => acc + (this.isHorizontal() ? item.offsetWidth : item.offsetHeight), 0);
      const elementTotalSize = this.isHorizontal() ? this.element.offsetWidth : this.element.offsetHeight;

      if (totalSize < elementTotalSize) return;

      this.setupStyles();
      this.cloneAllItems();

      if (this.settings.mouse) this.addHoverEvent();

      this.timer();
    } catch (error) {
      console.error('Marquee initialization error:', error);
    }
  }

  setupStyles() {
    Object.assign(this.wrapper.style, { position: 'relative', overflow: 'hidden' });
    Object.assign(this.element.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      paddingLeft: '0',
      marginTop: '0',
      [this.isHorizontal() ? 'width' : 'height']: this.isHorizontal() ? this.element.offsetWidth + 'px' : this.element.offsetHeight + 'px',
    });
  }

  timer() {
    this.timeoutHandle = setTimeout(() => this.play(), this.settings.delay);
  }

  play() {
    this.clearTimeout();
    let target = 0;

    for (let i = 0; i <= this.next; i++) target -= this.isHorizontal() ? this.items[i].offsetWidth : this.items[i].offsetHeight;

    this.intervalHandle = setInterval(() => this.animate(target), this.settings.timing);
  }

  animate(target) {
    const mark = this.isHorizontal() ? 'left' : 'top';
    const present = parseInt(this.element.style[mark], 10);
  
    if (present > target) {
      if (present - this.settings.speed <= target) {
        this.element.style[mark] = target + 'px';
      } else {
        this.element.style[mark] = (present - this.settings.speed) + 'px';
      }
    } else {
      this.clearInterval();
  
      // Check if we need to reset to the first item
      if (this.next >= this.items.length - 1) {
        this.element.style[mark] = '0px'; // Reset the position
        this.next = 0; // Reset the counter
      } else {
        this.next++;
      }
  
      this.timer();
    }
  }
  
  isHorizontal() {
    return this.settings.direction === 'horizontal';
  }

  cloneAllItems() {
    this.items.forEach(item => this.element.appendChild(item.cloneNode(true)));
  }

  // addHoverEvent() {
  //   ['mouseenter', 'mouseleave'].forEach(event => this.wrapper.addEventListener(event, () => this[event === 'mouseenter' ? 'clearInterval' : 'play']()));
  // }
  addHoverEvent() {
    this.wrapper.addEventListener('mouseenter', () => {
      this.clearInterval(); // 暫停動畫
      this.clearTimeout();  // 取消任何待執行的跑馬燈開始
    });
  
    this.wrapper.addEventListener('mouseleave', () => {
      if (this.next < this.items.length) {
        this.play(); // 從當前位置恢復動畫
      }
    });
  }
  clearTimeout() {
    clearTimeout(this.timeoutHandle);
  }

  clearInterval() {
    console.log('this.next: ', this.next);
    clearInterval(this.intervalHandle);
  }
}
window.Marquee = Marquee;

// 使用示例
// const marqueeInstance = new Marquee('#yourMarqueeElement', {
//   direction: 'horizontal',
//   itemSelector: 'li',
//   delay: 3000,
//   speed: 1,
//   timing: 1,
//   mouse: true,
// });
