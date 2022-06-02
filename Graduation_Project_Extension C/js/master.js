//to take screen shot of tab whern click

const screenShotBtn = document.getElementById("screenshot");

screenShotBtn.addEventListener("click", () => {
  chrome.tabs.captureVisibleTab((dataUrl) => {
    chrome.downloads.download({
      filename: "download.jpg",
      url: dataUrl,
    });
  });
});
