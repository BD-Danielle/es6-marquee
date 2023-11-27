(function (window, document) {

  // Create the defaults once
  var pluginName = "marquee";

  var defaults = {
    enable: true,
    direction: 'vertical',
    itemSelector: 'li',
    delay: 3000,
    speed: 1,
    timing: 1,
    mouse: true
  };

  function Widget(element, options) {
    this.element = element;
    this.settings = Object.assign({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.version = 'v1.0.0';

    this.element = document.querySelector(element);
    this.wrapper = this.element.parentElement;
    this.items = this.element.querySelectorAll(this.settings.itemSelector);

    this.next = 0;
    this.timeoutHandle;
    this.intervalHandle;

    if (!this.settings.enable) return;

    this.init();
  }

  Widget.prototype = {
    init: function () {
      var that = this;

      var totalSize = 0;

      for (var i = 0; i < this.items.length; i++) {
        totalSize += that.isHorizontal() ? parseInt(this.items[i].offsetWidth) : parseInt(this.items[i].offsetHeight);
      }

      var elementTotalSize = this.isHorizontal() ? this.element.offsetWidth : this.element.offsetHeight;

      if (totalSize < elementTotalSize) return;

      this.wrapper.style.position = 'relative';
      this.wrapper.style.overflow = 'hidden';

      this.element.style.position = 'absolute';
      this.element.style.top = '0';
      this.element.style.left = '0';
      this.element.style.paddingLeft = '0';
      this.element.style.marginTop = '0';

      this.element.style[this.isHorizontal() ? 'width' : 'height'] = elementTotalSize + 'px';

      this.cloneAllItems();

      if (this.settings.mouse)
        this.addHoverEvent(that);

      this.timer(that);
    },

    timer: function (that) {
      this.timeoutHandle = setTimeout(function () {
        that.play(that);
      }, this.settings.delay);
    },

    play: function (that) {
      this.clearTimeout();
      var target = 0;
      for (let i = 0; i <= this.next; i++) {
        target -= this.isHorizontal() ? parseInt(this.items[i].offsetWidth) : parseInt(this.items[i].offsetHeight);
      }
      this.intervalHandle = setInterval(function () {
        that.animate(target);
      }, this.settings.timing);
    },

    animate: function (target) {
      var mark = this.isHorizontal() ? 'left' : 'top';
      var present = parseInt(this.element.style[mark]);
      if (present > target) {
        if (present - this.settings.speed <= target) {
          this.element.style[mark] = target + 'px';
        } else
          this.element.style[mark] = present - this.settings.speed + 'px';
      } else {
        this.clearInterval();
        if (this.next + 1 < this.items.length) {
          this.next++;
        } else {
          this.next = 0;
          this.element.style[mark] = '0';
        }
        this.timer(this);
      }
    },

    isHorizontal: function () {
      return this.settings.direction == 'horizontal';
    },

    cloneAllItems: function () {
      for (var i = 0; i < this.items.length; i++) {
        this.element.appendChild(this.items[i].cloneNode(true));
      }
    },

    clearTimeout: function () {
      clearTimeout(this.timeoutHandle);
    },

    clearInterval: function () {
      clearInterval(this.intervalHandle);
    },

    addHoverEvent: function (that) {
      this.wrapper.addEventListener('mouseenter', function () {
        that.clearInterval();
        that.clearTimeout();
      });

      this.wrapper.addEventListener('mouseleave', function () {
        that.play(that);
      });
    }
  };

  window.marquee = function (element, options) {
    return new Widget(element, options);
  };

})(window, document);
