document.addEventListener("astro:page-load", () => {
   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext("2d");

   // Set canvas size to match the viewport
   let width = (canvas.width = window.innerWidth);
   let height = (canvas.height = window.innerHeight);

   // Configuration for gradient circles
   const gradientCircles = [];
   const circleCount = 50;
   const colorPalette = ["#337394"];

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
         gradient.addColorStop(1, "rgba(51, 115, 148, 0)");

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
      const radius = Math.random() * 2 + 2; // Massive circle sizes (600px–1400px)
      const x = Math.random() * width;
      const y = Math.random() * height;
      const dx = (Math.random() - 0.5) * 0.5;
      const dy = (Math.random() - 0.5) * 0.5;
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
