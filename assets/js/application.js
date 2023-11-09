//= require carousel

document.addEventListener("DOMContentLoaded", function () {
  var carouselLists, touchendX, touchendY, touchstartX, touchstartY, update;

  carouselLists = document.querySelectorAll('.carousel__list');

  touchstartX = touchstartY = touchendX = touchendY = 0;

  carouselLists.forEach(function(carousel) {
    carousel.addEventListener('touchstart', (function(event) {
      touchstartX = event.touches[0].screenX;
      touchstartY = event.touches[0].screenY;
    }), false);
    carousel.addEventListener('touchend', (function(event) {
      var el;
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      if (touchendX < touchstartX) {
        el = carousel.querySelector("[data-index='1']");
        update(el, carousel);
      }
      if (touchendX > touchstartX) {
        el = carousel.querySelector("[data-index='-1']");
        update(el, carousel);
      }
    }), false);
    return carousel.addEventListener('click', function(event) {
      var isItem, newActive;
      newActive = event.target;
      isItem = newActive.parentElement;
      if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
      }
      return update((isItem.classList.contains('carousel__item') ? isItem : newActive), carousel);
    });
  });

  update = function(newActive, carousel) {
    var carouselItems, current, elems, els, min, newActiveIndex, newElems, x;
    carouselItems = carousel.querySelectorAll('.carousel__item');
    elems = Array.from(carouselItems).sort(function(a, b) {
      return Number(a.dataset.index) - Number(b.dataset.index);
    });
    newActiveIndex = newActive.dataset.index;
    current = elems.find(function(elem) {
      return elem.dataset.index === '0';
    });
    newElems = [];
    if (newActiveIndex < 0) {
      newElems.push(elems[elems.length - 1]);
      newElems.push(elems.slice(0, elems.length - 1));
    } else {
      newElems.push(elems.slice(1, elems.length));
      newElems.push(elems[0]);
    }
    newElems = newElems.flat();
    min = Math.min.apply(Math, (function() {
      var i, len, ref, results;
      ref = elems.map((function(_this) {
        return function(item) {
          return Number(item.dataset.index);
        };
      })(this));
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        x = ref[i];
        results.push(x);
      }
      return results;
    }).call(this));
    els = Array.from({
      length: elems.length
    }, (function(_this) {
      return function(val, index) {
        return min + index;
      };
    })(this));
    current.classList.remove('carousel__item_active');
    return els.forEach(function(index, idx) {
      if (newElems[idx]) {
        return newElems[idx].dataset.index = index;
      }
    });
  };

  if (window.matchMedia("(max-width: 768px)").matches) {
    document.getElementById('header').classList.add('mobile-only');
  } else {
    document.getElementById('header').classList.add('desktop-only');
  };
});
