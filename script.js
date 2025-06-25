const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src = "page1.jpg";

bgImage.onload = () => {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

function getSelectedWorkers() {
  const checkboxes = document.querySelectorAll('input[name="worker"]:checked');
  const names = Array.from(checkboxes).map(cb => cb.value);

  const other = document.getElementById("workerOther").value.trim();
  if (names.includes("その他") && other) {
    names[names.indexOf("その他")] = other;
  }

  return names.join(", ");
}

function generate() {
  const property = document.getElementById("propertyName").value;
  const workerNames = getSelectedWorkers();

  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  ctx.font = "bold 24px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(`物件名：${property}`, 100, 100);
  ctx.fillText(`作業者：${workerNames}`, 100, 150);

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.getElementById("downloadLink");
    link.href = url;
    link.download = "nippo_page1.jpg";
    link.textContent = "画像をダウンロードする";
    link.style.display = "inline-block";
  }, "image/jpeg", 0.8);
}
