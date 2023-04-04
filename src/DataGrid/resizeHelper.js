let target;
let startOffset;
let callback = () => {};

document.addEventListener('mousemove', (e) => {
  if (target) {
    callback(target.getAttribute('field'), Math.max(25, startOffset + e.pageX));
  }
});

document.addEventListener('mouseup', (e) => {
  if (target) {
    target.classList.remove('active');
  }
  target = null;
});


export default {
  start: (e, cb) => {
    target = e.target;
    startOffset = target.parentElement.offsetWidth - e.pageX;
    callback = cb;
    target.classList.add('active');
  },
  syncWidth: (targetSelector, sourceElement) => {
    [].forEach.call(document.querySelectorAll(targetSelector), (elem) => {
      elem.style.width = window.getComputedStyle(sourceElement).getPropertyValue('width');
    });
  }
}
