(function(window) {

  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;

  function easeOutCubic(t, b, c, d) {
    t = t / d - 1;
    return c * (t * t * t + 1) + b;
  }

  function scroll(from, to) {
    var el = document.body;
    var time = 0;
    var duration = 1000;
    var increment = 20;

    var scrollHelper = function() {
      time += increment;
      var scrollValue = easeOutCubic(time, from, to - from, duration);
      el.scrollTop = scrollValue;

      if (time < duration) {
        requestAnimationFrame(scrollHelper);
      }
    };

    requestAnimationFrame(scrollHelper);
  }

  function extractHash(anchor) {
    return anchor.href.replace(/^.*(#.*)$/, '$1');
  }

  function scrollToSection(id) {
    var section = document.querySelector(id);
    scroll(document.documentElement.scrollTop, section.offsetTop);
  }

  function scrollToHashSection() {
    if (location.hash) {
      scrollToSection(location.hash);
    }
  }

  function clickNavLink(e) {
    var el = e.target;

    if (el.tagName !== 'A') {
      return;
    }

    var hash = extractHash(el);

    if (hash) {
      scrollToSection(hash);
      location.hash = hash;
      e.preventDefault();
    }
  }

  document.querySelector('.nav-header').addEventListener('click', clickNavLink, false);
  window.addEventListener('hashchange', scrollToHashSection, false);
  window.addEventListener('DOMContentLoaded', scrollToHashSection);

})(window);
