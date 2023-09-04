document.addEventListener("DOMContentLoaded", function () {
  // Get all hotspot buttons and the body-hotspot body2
  const body2 = document.querySelector(".body2");
  const hotspots = document.querySelectorAll(".hotspot-btn");
  const bodyHotspot = document.getElementById("body-hotspot");
  // Get all the ellipses by their IDs
  const ellipses = document.querySelectorAll("ellipse");

  // Initialize ScrollMagic
  const controller = new ScrollMagic.Controller();
  let timeline = new TimelineMax();

  // Create ScrollMagic scenes for each image

  timeline
    .to(".image1", 10, { y: 200 })
    .to(".image2", 10, { y: 1000 }, "-=10")
    .to(".image3", 10, { y: 600 }, "-=10");

  new ScrollMagic.Scene({
    triggerElement: "section",
    triggerHook: 0,
    duration: "1500%",
    reverse: true,
  })
    .setTween(timeline)
    .setPin(".image-container")
    .addTo(controller);

  let activeIndex = 0;
  // Function to activate button and ellipse
  function activateButtonAndEllipse(index) {
    const targetButton = hotspots[index];
    const targetEllipse = bodyHotspot.querySelector(
      `g#${targetButton.getAttribute("data-target")}`
    );

    // Hide all ellipses
    const ellipses = bodyHotspot.querySelectorAll("g.hotspot");
    ellipses.forEach((ellipse) => {
      ellipse.style.display = "none";
    });

    // Show the selected ellipse
    if (targetEllipse) {
      targetEllipse.style.display = "block";
    }

    // Deactivate all buttons
    hotspots.forEach((button) => {
      button.classList.remove("active");
    });

    // Activate the current button
    targetButton.classList.add("active");
    activeIndex = index; // Update the active index
  }

  // Create click event handlers for each button
  hotspots.forEach((hotspot, index) => {
    hotspot.addEventListener("click", () => {
      activateButtonAndEllipse(index);
    });
  });

  // Add a click event listener to each ellipse
  ellipses.forEach((ellipse) => {
    ellipse.addEventListener("click", () => {
      // Get the data-target attribute of the clicked ellipse
      const dataTarget = ellipse.getAttribute("data-target");
      // Deactivate all ellipses first
      ellipses.forEach((otherEllipse) => {
        otherEllipse.classList.remove("active");
      });

      // Deactivate all buttons first
      hotspots.forEach((button) => {
        button.classList.remove("active");
      });

      // Find the corresponding button based on the data-target attribute
      const targetButton = document.querySelector(
        `button[data-target="${dataTarget}"]`
      );

      const targetEllipse = bodyHotspot.querySelector(
        `g#${targetButton.getAttribute("data-target")}`
      );

      if (targetButton) {
        // Activate the corresponding button
        targetButton.classList.add("active");
      }
      // Hide all ellipses
      const DeEllipses = bodyHotspot.querySelectorAll("g.hotspot");
      DeEllipses.forEach((ellipse) => {
        ellipse.style.display = "none";
      });
      // Show the selected ellipse
      if (targetEllipse) {
        targetEllipse.style.display = "block";
      }
    });
  });
  // Create scenes for each section
  hotspots.forEach((hotspot, index) => {
    new ScrollMagic.Scene({
      triggerElement: body2, // Trigger when the body2 is in view
      triggerHook: "onEnter",
      offset: index * (body2.clientHeight / hotspots.length), // Adjust the offset for each section
      duration: body2.clientHeight, // Duration for each section
      reverse: true, // Disable reverse initially
    })
      .on("enter", () => {
        activateButtonAndEllipse(index);
      })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: body2, // Trigger when the body2 is in view
      triggerHook: "onLeave", // Trigger when leaving the body2
      offset: index * (body2.clientHeight / hotspots.length), // Adjust the offset for each section
      duration: body2.clientHeight, // Duration for each section
      reverse: true, // Enable reverse when scrolling up
    })
      .on("leave", () => {
        activateButtonAndEllipse(index);
      })
      .addTo(controller);
  });

  // Update the active button and ellipse while scrolling
  body2.addEventListener("scroll", () => {
    const newIndex = Math.floor(
      (body2.scrollTop / body2.scrollHeight) * hotspots.length
    );

    if (newIndex !== activeIndex) {
      activateButtonAndEllipse(newIndex);
    }
  });
});
