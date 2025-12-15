let articles = []; // متغير عام هنخزن فيه المقالات
let currentIndex = 0;
const articlesPerPage = 3;

// إنشاء زرار عرض المزيد
const loadMoreBtn = document.createElement("button");
loadMoreBtn.id = "load-more";
loadMoreBtn.textContent = "عرض المزيد";

// تحميل المقالات من JSON
fetch("https://raw.githubusercontent.com/MoemenMounir/School_website_data/main/articles.json")
  .then(response => response.json())
  .then(data => {
    articles = data;
    displayNextArticles(); // نعرض أول 3 بس
  })
  .catch(error => console.error("خطأ في تحميل المقالات:", error));

// دالة لعرض المقالات
function displayArticles(list) {
  const container = document.getElementById("articles-container");

  list.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";

    card.innerHTML = `
      <h2>${article.title}</h2>
      <img src="${article.image}" width="35%">
      <p><strong>الكاتب:</strong> ${article.author} | <strong>التاريخ:</strong> ${article.date}</p>
      <a href="article.html?id=${article.id}" id="aa">اقرأ المزيد</a>
    `;

    container.appendChild(card);
  });
}

// عرض 3 مقالات كل مرة
function displayNextArticles() {
  const container = document.getElementById("articles-container");
  const nextArticles = articles.slice(currentIndex, currentIndex + articlesPerPage);

  displayArticles(nextArticles);
  currentIndex += articlesPerPage;

  if (currentIndex >= articles.length) {
    loadMoreBtn.style.display = "none";
  }
}

// ربط الزرار
loadMoreBtn.onclick = displayNextArticles;
document.getElementById("articles-container").after(loadMoreBtn);

// البحث
document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = articles.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  const container = document.getElementById("articles-container");
  container.innerHTML = "";
  displayArticles(filtered);
  loadMoreBtn.style.display = "none";
});

function toggleSearch() {
  const box = document.getElementById("searchBox");
  const input = document.getElementById("searchInput");

  box.classList.toggle("active");

  if (box.classList.contains("active")) {
    input.focus();
  } else {
    input.value = "";
  }
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});