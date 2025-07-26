// Khai báo biến
const quizSection = document.getElementById("quizSection");
const birthdaySection = document.getElementById("birthdaySection");
const quizMessage = document.getElementById("quizMessage");
const continueButton = document.getElementById("continueButton");
const options = document.querySelectorAll(".option");
const btnLetter = document.getElementById("btn__letter");
const boxLetter = document.querySelector(".box__letter");
const letterBorder = document.querySelector(".letter__border");
const closeBtn = document.querySelector(".close");
const heartLetter = document.getElementById("heart__letter");
const loveImg = document.querySelector(".love__img");
const mewmew = document.getElementById("mewmew");

// Xử lý lựa chọn câu trả lời
options.forEach((option) => {
  option.addEventListener("click", () => {
    const isCorrect = option.dataset.correct === "true";
    const quizResult = document.getElementById("quizResult");
    const quizMessage = document.getElementById("quizMessage");

    // Hiển thị modal thông báo
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content ${isCorrect ? "success" : "error"}">
        <span class="modal-icon">${isCorrect ? "🥳" : "😭"}</span>
        <p class="modal-text">${
          isCorrect
            ? "Yes sir!!! Bấm dô đây sang bước tiếp theo đi bạn!"
            : "Ối dồi ôi!!! Thử lại lần nữa coi sau!!!"
        }</p>
        ${
          isCorrect
            ? '<p style="font-size: 0.9rem; color: #c00; margin-top: -10px;">🔈 Có âm thanh nha bạn, đừng hoảng 😄</p>'
            : ""
        }
        <button class="modal-button">${
          isCorrect ? "Đi đi đi" : "Thử lại"
        }</button>
      </div>
    `;
    document.body.appendChild(modal);

    // Xử lý khi nhấn nút trong modal
    const modalButton = modal.querySelector(".modal-button");
    modalButton.addEventListener("click", () => {
      document.body.removeChild(modal);

      if (isCorrect) {
        const correctSound = document.getElementById("correctSound");
        if (correctSound) correctSound.play(); // ✅ phát nhạc khi bấm "Đi đi đi"

        quizSection.classList.add("hidden");
        birthdaySection.classList.remove("hidden");

        const hat = document.querySelector(".hat");
        hat.classList.add("animateHat");
      }
    });

    // Hiển thị nút "Thử lại" hoặc "Tiếp theo"
    quizMessage.classList.remove("hidden", "error", "success");
    quizMessage.innerHTML = isCorrect
      ? '<button class="continue">Tiếp theo</button>'
      : '<button class="retry">Thử lại</button>';
    quizMessage.classList.add(isCorrect ? "success" : "error");

    // Xử lý nút "Tiếp theo"
    if (isCorrect) {
      const continueBtn = quizMessage.querySelector(".continue");
      continueBtn.addEventListener("click", () => {
        quizSection.classList.add("hidden");
        birthdaySection.classList.remove("hidden");

        const hat = document.querySelector(".hat");
        hat.classList.add("animateHat");
      });
    } else {
      // Xử lý nút "Thử lại"
      const retryBtn = quizMessage.querySelector(".retry");
      retryBtn.addEventListener("click", () => {
        quizResult.classList.add("hidden");
        quizMessage.classList.add("hidden");
      });
    }
  });
});

// Xử lý nút mở lá thư
btnLetter.addEventListener("click", () => {
  boxLetter.style.display = "block";
  letterBorder.style.display = "block";
  heartLetter.classList.add("animationOp");
  loveImg.classList.add("animationOp");
  mewmew.classList.add("animationOp");
  const textBlock = document.querySelector(".text__letter");
  typeWriterParagraph(textBlock); // Bỏ tham số fullText
  // tốc độ và delay mượt
});

// Xử lý nút đóng lá thư
closeBtn.addEventListener("click", () => {
  boxLetter.style.display = "none";
  letterBorder.style.display = "none";
});

function typeWriterParagraph(element, speed = 30, delayBetween = 400) {
  const fullText = `
    "Chúc cậu tuổi mới nhiều niềm vui, hạnh phúc, gặt hái nhiều thành công ."
    "Học kỳ tới auto điểm cao 😎✨."
    "Sinh nhật thì quẩy banh nóc, quà nhận không kịp đếm, deadline tự né :))) 🎁🎉
    "Cuối cùng chúc cậu tuổi 20 , tuổi đẹp nhất của người con gái đầy thành công và sẽ mamg lại thật nhiều hựa hẹn ."
  `;

  const sentences = fullText
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");
  element.innerHTML = "";

  // CSS cố định
  // CSS cố định
element.style.whiteSpace = "pre-line";
element.style.textIndent = "1.5em";
element.style.lineHeight = "1.5"; // Giãn dòng cho dễ đọc
element.style.fontFamily = "'Bubblegum Sans', cursive"; // Font chữ dễ thương, nổi bật
element.style.fontSize = "1.5rem"; // Chữ to hơn
element.style.color = "#ff3366"; // Hồng đậm cho nổi bật
element.style.textAlign = "center"; // Căn giữa đoạn text
element.style.textShadow = "1px 1px 3px rgba(0,0,0,0.3)"; // Đổ bóng giúp dễ nhìn hơn


  let currentIndex = 0;

  function typeNextSentence() {
    if (currentIndex >= sentences.length) return;

    const sentence = sentences[currentIndex].trim();
    const paragraph = document.createElement("div");
    paragraph.style.marginBottom = "15px";
    element.appendChild(paragraph);

    let charIndex = 0;
    const typing = setInterval(() => {
      paragraph.textContent += sentence.charAt(charIndex);
      charIndex++;
      if (charIndex >= sentence.length) {
        clearInterval(typing);
        currentIndex++;
        setTimeout(typeNextSentence, delayBetween);
      }
    }, speed);
  }

  typeNextSentence();
}
