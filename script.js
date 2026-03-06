/* =========================
   COUNTER (nur wenn vorhanden)
========================= */

const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {

    const startCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 120;

        const update = () => {
            count += increment;

            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
}


/* =========================
   SPARKS (nur wenn Canvas existiert)
========================= */

const canvas = document.getElementById("sparks");

if (canvas) {

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let sparks = [];

    class Spark {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * -2 - 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.opacity -= 0.01;
        }

        draw() {
            ctx.fillStyle = `rgba(255,150,0,${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animateSparks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.3) sparks.push(new Spark());

        sparks.forEach((spark, i) => {
            spark.update();
            spark.draw();
            if (spark.opacity <= 0) sparks.splice(i, 1);
        });

        requestAnimationFrame(animateSparks);
    }

    animateSparks();
}


/* =========================
   LIGHTBOX (nur wenn vorhanden)
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const counterText = document.getElementById("image-counter");

if (lightbox && lightboxImg) {

    const images = document.querySelectorAll(".lightbox-img");
    let currentIndex = 0;

    function showImage(index) {

    lightboxImg.classList.remove("fire-glow");

    // kleiner Trick damit Animation neu startet
    void lightboxImg.offsetWidth;

    lightboxImg.src = images[index].src;
    counterText.innerText = `${index + 1} / ${images.length}`;

    lightboxImg.classList.add("fire-glow");
}


    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            lightbox.style.display = "flex";
            showImage(currentIndex);
        });
    });

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

const stats = document.querySelectorAll(".stat-number");