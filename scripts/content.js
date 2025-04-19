let title = document.querySelector('title')?.innerText || "No title found";
let description = document.body.innerText;

// Optionally narrow it down:
if (document.querySelector('#productDescription')) {
  description = document.querySelector('#productDescription').innerText;
}

chrome.storage.local.set({ productTitle: title, productText: description });
