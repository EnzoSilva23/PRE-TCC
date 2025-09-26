const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const menuIcon = document.querySelector(".menu");
const dropdownMenu = document.getElementById("dropdown-menu");

let currentDate = new Date();
let selectedDay = null;
let selectedTime = null;

const menuItems = [
   { text: "Login", href: "#" },
   { text: "Lembretes", href: "#" },
];

menuItems.forEach((item) => {
   const link = document.createElement("a");
   link.textContent = item.text;
   link.href = item.href;
   dropdownMenu.appendChild(link);
});

menuIcon.addEventListener("click", () => {
   dropdownMenu.classList.toggle("show");
});

window.addEventListener("click", function (event) {
   if (!event.target.matches(".menu")) {
      if (dropdownMenu.classList.contains("show")) {
         dropdownMenu.classList.remove("show");
      }
   }
});

function renderCalendar(date) {
   const year = date.getFullYear();
   const month = date.getMonth();

   const firstDay = new Date(year, month, 1).getDay();
   const lastDate = new Date(year, month + 1, 0).getDate();

   const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
   ];

   const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

   monthYear.textContent = `${months[month]} ${year}`;
   calendarDays.innerHTML = "";

   weekDays.forEach((day) => {
      const dayElement = document.createElement("div");
      dayElement.classList.add("weekday");
      dayElement.textContent = day;
      calendarDays.appendChild(dayElement);
   });

   for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement("div");
      calendarDays.appendChild(emptyDiv);
   }

   for (let i = 1; i <= lastDate; i++) {
      const div = document.createElement("div");
      div.textContent = i;
      div.classList.add("day");

      const dayOfWeek = new Date(year, month, i).getDay();

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
         div.classList.add("working-day");
      }

      div.addEventListener("click", () => {
         const currentSelected = document.querySelector(".day.selected");
         if (currentSelected) {
            currentSelected.classList.remove("selected");
         }

         div.classList.add("selected");
         selectedDay = new Date(year, month, i);
         console.log(
            "Dia selecionado:",
            selectedDay.toLocaleDateString("pt-BR")
         );
      });

      calendarDays.appendChild(div);
   }
}

renderCalendar(currentDate);

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carouselSlide = document.querySelector(".carousel-slide");
const slides = document.querySelectorAll(".carousel-slide img");

let slideIndex = 0;
const totalSlides = slides.length;
let autoSlideInterval;

function moveSlide(index) {
   if (index < 0) {
      slideIndex = totalSlides - 1;
   } else if (index >= totalSlides) {
      slideIndex = 0;
   }

   const offset = -slideIndex * 100;
   carouselSlide.style.transform = `translateX(${offset}%)`;
}

function startAutoSlide() {
   autoSlideInterval = setInterval(() => {
      moveSlide(++slideIndex);
   }, 5000);
}

function resetAutoSlide() {
   clearInterval(autoSlideInterval);
   startAutoSlide();
}

nextBtn.addEventListener("click", () => {
   moveSlide(++slideIndex);
   resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
   moveSlide(--slideIndex);
   resetAutoSlide();
});

startAutoSlide();
