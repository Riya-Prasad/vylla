var image = document.getElementsByClassName("parallax-img");
new simpleParallax(image, {
  scale: 1.4,
  delay: 0.7,
  transition: "cubic-bezier(0,0,0,0.4)",
});

gsap.registerPlugin(ScrollTrigger);

// nav link animation
ScrollTrigger.create({
  animation: gsap.from(".menu-items li", {
    yPercent: -250,
    stagger: 0.2,
    duration: 1,
  }),
  trigger: ".primary-header",
  start: "top 50%",
  ease: "power3.easeOut",
});

// footer-link animation
ScrollTrigger.create({
  animation: gsap.from(".footer-links li", {
    xPercent: 20,
    stagger: 0.1252,
    duration: 1.1,
    opacity: 0,
  }),
  trigger: ".footer",
  start: "top 50%",
  ease: "power3.easeInOut",
});

// work animation
ScrollTrigger.matchMedia({
  "(min-width:550px)": () => {
    ScrollTrigger.create({
      trigger: ".work-sec",
      start: "top 10%",
      end: "bottom bottom",
      pin: ".work-sec .left-sec",
      scrub: true,
    });
  },
});

// values
ScrollTrigger.create({
  animation: gsap.from(".value", {
    stagger: 0.2502,
    duration: 1.2,
    yPercent: 200,
    opacity: 0,
  }),
  trigger: ".values-sec",
  start: "top 40%",
  ease: "power3.easeInOut",
});

// news
ScrollTrigger.create({
  animation: gsap.from(".news", {
    stagger: 0.1502,
    duration: 1.1,
    yPercent: 50,
    opacity: 0,
  }),
  trigger: ".news-sec-heading",
  start: "top 40%",
  ease: "power3.easeInOut",
});

// split text animation
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div class="words">
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset",
        start: "top 50%",
      },
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 200,
      ease: Power3.easeOut,
      stagger: 0.25,
      delay: 0.2,
    });
  });
});

jQuery(document).ready(function () {
  let splitLines = jQuery("[data-line]");
  splitLines.each(function (i, j) {
    let x = new SplitText(j, {
      type: j.getAttribute("data-line"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
    let delay = j.getAttribute("data-delay");

    x.chars.forEach((ele, index) => {
      if (delay) {
        gsap.to(ele, { "--delay": index + parseInt(delay) + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
  let splitLines2 = jQuery("[data-line-no-animation]");
  splitLines2.each(function (i, j) {
    new SplitText(j, {
      type: j.getAttribute("data-line-no-animation"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
  });

  let splitLines3 = jQuery("[data-line-within-line]");
  splitLines3.each(function (i, j) {
    let x = new SplitText(j, { type: "lines", linesClass: "line-inner" });
    new SplitText(jQuery(j).find(".line-inner"), {
      type: "lines",
      linesClass: "line-mask",
    });
    let delay = j.getAttribute("data-delay");

    x.lines.forEach((ele, index) => {
      if (delay) {
        let delaytamp = index + parseInt(delay);
        gsap.to(ele, { "--delay": delaytamp + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
});

jQuery(window).on("load", function () {
  document.body.classList.add("loaded");
});
