(function () {
  const input = document.querySelector("input");

  const timeline = anime.timeline({
    update: ({ progress }) => {
      input.value = progress;
    },
  });
  function handleInput() {
    const { value } = this;
    timeline.seek((timeline.duration * value) / 100);
  }

  input.addEventListener("input", handleInput);
  input.addEventListener("mousedown", () => timeline.pause());
  input.addEventListener("mouseup", () => timeline.play());
  timeline.add({
    targets: "#fuse",
    strokeDashoffset: (target) => -target.getTotalLength(),
    duration: 5000,
    begin: (animation) => {
      const target = animation.animatables[0].target;
      const length = target.getTotalLength();
      target.setAttribute("stroke-dasharray", length);
    },
    easing: "linear",
  });
  const motionPath = document.querySelector("#fuse");
  const path = anime.path(motionPath);
  timeline.add(
    {
      targets: "#spark",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      duration: 5000,
      easing: "linear",
    },
    "-=5000"
  );

  timeline.add(
    {
      targets: "#ember",
      transform: Array(21)
        .fill("scale(2.5)")
        .map((scale, index) => (index % 2 === 0 ? "scale(1.4)" : scale)),
      duration: 5000,
      easing: "easeInOutSine",
      direction: "alternate",
    },
    "-=5000"
  );

  timeline.add(
    {
      targets: "#sparkles",
      transform: Array(21)
        .fill("scale(1.5)")
        .map((scale, index) => (index % 2 === 0 ? "scale(0)" : scale)),
      duration: 5000,
      easing: "easeInOutSine",
      direction: "alternate",
    },
    "-=5000"
  );

  timeline.add({
    targets: "#spark",
    scale: 4.5,
    opacity: 0,
    duration: 250,
    easing: "easeInOutSine",
  });
  timeline.add({
    targets: "#bomb",
    opacity: 0,
    duration: 250,
    easing: "easeInOutSine",
  });
})();
