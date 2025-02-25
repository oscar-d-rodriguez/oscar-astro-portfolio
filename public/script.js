document.addEventListener("astro:page-load", () => {
   // const cursor = document.getElementById("cursor");

   // // Track mouse position
   // let mouseX = 0;
   // let mouseY = 0;

   // // Update mouse position on mousemove
   // document.addEventListener("mousemove", (event) => {
   //    mouseX = event.clientX;
   //    mouseY = event.clientY;

   //    // Update cursor circle position
   //    cursor.style.left = `${mouseX}px`;
   //    cursor.style.top = `${mouseY}px`;
   // });

   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext("2d");

   // Set canvas size to match the viewport
   let width = (canvas.width = window.innerWidth);
   let height = (canvas.height = window.innerHeight);

   // Configuration for gradient circles
   const gradientCircles = [];
   const circleCount = 8;
   const colorPalette = ["#000000", "#111111", "#222222", "#333333"];

   class GradientCircle {
      constructor(x, y, radius, dx, dy, color) {
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.dx = dx;
         this.dy = dy;
         this.color = color;
      }

      draw() {
         const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.radius,
         );
         gradient.addColorStop(0, this.color);
         gradient.addColorStop(0.9, "transparent");

         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         ctx.fillStyle = gradient;
         ctx.fill();
      }

      update() {
         this.x += this.dx;
         this.y += this.dy;

         // Reverse direction when hitting canvas edges
         if (this.x + this.radius < 0 || this.x - this.radius > width) {
            this.dx = -this.dx;
         }
         if (this.y + this.radius < 0 || this.y - this.radius > height) {
            this.dy = -this.dy;
         }

         this.draw();
      }
   }

   // Initialize gradient circles
   for (let i = 0; i < circleCount; i++) {
      const radius = Math.random() * 1000 + 1000; // Massive circle sizes (600px–1400px)
      const x = Math.random() * width;
      const y = Math.random() * height;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const color =
         colorPalette[Math.floor(Math.random() * colorPalette.length)];

      gradientCircles.push(new GradientCircle(x, y, radius, dx, dy, color));
   }

   // Animation loop
   function animate() {
      ctx.clearRect(0, 0, width, height); // Clear only the visible area

      // Clip anything outside the canvas
      ctx.globalCompositeOperation = "destination-over";

      // Update and redraw each circle
      gradientCircles.forEach((circle) => circle.update());

      requestAnimationFrame(animate);
   }

   // Handle canvas resizing
   window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
   });

   animate();
});
