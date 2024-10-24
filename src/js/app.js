document.addEventListener("DOMContentLoaded", () => {
  const popoverBtn = document.getElementById("popover-btn");

  // Создание элемента popover
  const popover = document.createElement("div");
  popover.className = "popover";

  // Установка HTML для заголовка и содержимого popover
  popover.innerHTML = `
      <div class="popover-title">Типа зоголовок Popover</div>
      <div class="popover-content">А это типа интересный контент заголовка Popover.</div>
    `;

  document.body.appendChild(popover);

  // Функция для переключения видимости popover
  function togglePopover() {
    if (popover.style.display === "block") {
      popover.style.display = "none";
    } else {
      popover.style.display = "block";

      // Получение позиции и размера кнопки
      const rect = popoverBtn.getBoundingClientRect();

      // Установка позиции popover относительно кнопки
      const popoverWidth = popover.offsetWidth;
      popover.style.top = `${rect.top - popover.offsetHeight}px`;
      popover.style.left = `${rect.left + rect.width / 2 - popoverWidth / 2}px`;
    }
  }

  // Добавление обработчика событий для кнопки
  popoverBtn.addEventListener("click", togglePopover);

  // Закрытие popover при клике вне его области
  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target) && event.target !== popoverBtn) {
      popover.style.display = "none";
    }
  });
});
