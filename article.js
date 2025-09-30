// جلب الـ ID من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("id");
// تحميل المقالات من JSON
fetch("articles.json")
  .then(response => response.json())
  .then(data => {
    const article = data.find(a => a.id == articleId);

    const container = document.getElementById("article-content");

    if (article) {
      let html = `
        <h1>${article.title}</h1>
        <img src ="${article.image}" width="70%">
        <p><strong>الكاتب:</strong> ${article.author}</p>
        <p><strong>التاريخ:</strong> ${article.date}</p>
        <hr>
        <p>${article.content}</p>
      `;

      // إضافة الفيديو لو موجود
      if (article.video && article.video.trim() !== "") {
        html += `<video src="${article.video}" width="90%" controls></video>`;
      }

      container.innerHTML = html;
    } else {
      container.innerHTML = "<p>المقال غير موجود.</p>";
    }
  })
  .catch(error => console.error("خطأ في تحميل المقال:", error));