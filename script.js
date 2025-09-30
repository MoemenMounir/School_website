let articles = []; // متغير عام هنخزن فيه المقالات

// تحميل المقالات من JSON
fetch("articles.json")
  .then(response => response.json())
  .then(data => {
    articles = data; // نخزن البيانات هنا
    displayArticles(articles); // نعرض كل المقالات أول ما تتحمل
  })
  .catch(error => console.error("خطأ في تحميل المقالات:", error));

// دالة لعرض المقالات
function displayArticles(list) {
  const container = document.getElementById("articles-container");
  container.innerHTML = ""; // نفرغ المحتوى القديم

  list.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";

    card.innerHTML = `
      <h2>${article.title}</h2>
      <img src="${article.image}" width="35%">
      <p><strong>الكاتب:</strong> ${article.author} | <strong>التاريخ:</strong> ${article.date}</p>
      <a href="article.html?id=${article.id}" id ="aa">اقرأ المزيد</a>
    `;

    container.appendChild(card);
  });
}

// البحث
document.getElementById("searchInput").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = articles.filter(p => p.title.toLowerCase().includes(value));
  displayArticles(filtered);
});

function toggleSearch() {
  const box = document.getElementById("searchBox");
  const input = document.getElementById("searchInput");
  
  box.classList.toggle("active");

  if (box.classList.contains("active")) {
    input.focus(); // يركز على البحث أول ما يفتح
  } else {
    input.value = ""; // يمسح الكلمة لو اتقفل
  }
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});