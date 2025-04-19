# EcoCart

EcoCart is a Chrome extension that promotes environmentally conscious shopping by suggesting greener alternatives for products you browse online.

## Features

- Scans product listings on supported e‑commerce platforms  
- Displays eco‑friendly alternatives using a curated dataset  
- Provides a simple and clean popup interface  
- Built with core web technologies for maximum compatibility  

## Project Structure

```text
EcoCart/
├── assets/             # Icons and images used in the extension
├── eco-data/           # Contains JSON data of eco‑friendly products
├── content.js          # Script that interacts with web pages
├── manifest.json       # Configuration file for the Chrome extension
├── popup.html          # HTML structure for the popup interface
├── popup.css           # Styling for the popup
└── popup.js            # JavaScript logic for the popup
```

## Getting Started

### Prerequisites

- Google Chrome browser

### Installation

1. Clone this repository:  
   ```
   git clone https://github.com/TanishG01/EcoCart.git
   ```

2. Open Chrome and navigate to:  
   ```
   chrome://extensions/
   ```

3. Enable “Developer mode” using the toggle on the top right.  
4. Click on “Load unpacked” and select the folder where you cloned this repository.  
5. The EcoCart extension should now be added to your browser.

## Usage

1. Visit an online shopping site.  
2. Click the EcoCart extension icon in the Chrome toolbar.  
3. View suggestions for more environmentally friendly alternatives.

## Tech Stack

- JavaScript – for logic and DOM interaction  
- HTML – for layout  
- CSS – for styling  
- Chrome Extensions API – for browser integration  

## Future Enhancements

- Support for more e‑commerce platforms  
- Real‑time product suggestions using external APIs  
- Integration of product carbon footprint ratings  

## Contributing

Contributions are welcome. If you have ideas or improvements, feel free to fork the repository and submit a pull request.

