# Tri-Calendar App - Beautiful Multi-Calendar System

A stunning, modern web-based calendar application that displays three calendar systems simultaneously:
- **English (Gregorian)** - Main view
- **Bangla (বাংলা)** - Bengali calendar
- **Arabic (عربي)** - Hijri/Islamic calendar

## ✨ Features

### 🎨 Beautiful Modern UI
- Dark gradient theme with gold accents
- Smooth animations and transitions
- Glassmorphism design effects
- Fully responsive for all screen sizes
- Touch-friendly interface

### 📅 Multiple View Modes
- **Unified View**: All three calendars in one grid (Main view)
- **All Calendars**: See all three calendars side by side
- **Individual Views**: Focus on Bengali, English, or Arabic calendar

### 🔄 100% Offline & Automated
- **Fully Client-side conversion** - No API calls needed!
- Calculates Hijri (Arabic) calendar dates locally using accurate algorithm
- Calculates Bengali calendar dates automatically
- Works completely offline - perfect for Bangladesh
- Instant loading - no waiting for API responses
- No internet permission required

### 🌍 Perfect for Bangladesh
- Works without internet connection
- Stable performance regardless of connectivity
- Bengali numbers and text support
- Arabic month names displayed in Bengali script

## 📁 Files Structure

```
calender_bn_en_ar/
├── index.html      # Beautiful HTML structure with modern UI
├── styles.css      # Stunning responsive styling with animations
├── script.js       # Calendar logic with client-side conversion
└── README.md       # This file
```

## 🚀 How to Use in Android Studio

1. **Copy Files to Assets Folder**
   - Copy all files (`index.html`, `styles.css`, `script.js`) to your Android project's `assets` folder
   - Typically located at: `app/src/main/assets/`

2. **Load in WebView**
   ```java
   WebView webView = findViewById(R.id.webView);
   WebSettings webSettings = webView.getSettings();
   webSettings.setJavaScriptEnabled(true);
   webSettings.setDomStorageEnabled(true);
   webSettings.setLoadWithOverviewMode(true);
   webSettings.setUseWideViewPort(true);
   
   // Load the calendar
   webView.loadUrl("file:///android_asset/index.html");
   ```

3. **No Internet Permission Needed!**
   - The app works completely offline
   - All calendar conversions are done client-side
   - No API calls required

## 📊 Calendar Systems

### English (Gregorian) Calendar
- Standard international calendar
- Main view displayed prominently

### Bangla (Bengali) Calendar
- Calculated automatically using conversion algorithm
- Starts from April 14/15
- Shows Bengali month names and dates
- Bengali numbers (০-৯) support

### Arabic (Hijri) Calendar
- Converted client-side using accurate algorithm
- Islamic calendar dates
- Shows Arabic month names in **Bengali script** (as requested)
- Works completely offline

## 🎨 Color Coding

- 🔵 **Blue (#4facfe)**: English calendar dates
- 🟣 **Purple (#667eea)**: Bangla calendar dates
- 🔴 **Red (#f5576c)**: Arabic calendar dates
- 🟡 **Gold**: Today's date highlight

## 🎯 View Modes

1. **Unified View** (Default): Shows all three calendars in one grid
   - English date (large, blue)
   - Bengali date (purple)
   - Arabic date (red)
   - Month indicators show when Bengali/Arabic months start

2. **All Calendars**: Display all three calendars side by side

3. **Individual Views**: Focus on one calendar system at a time

## 💡 Features

- **Month Navigation**: Previous/Next buttons for each calendar
- **Today Highlight**: Current date highlighted in gold
- **Season Display**: Shows current season in English and Bengali
- **Day of Year**: Displays day number in the year
- **Week Number**: Shows current week number
- **Month Indicators**: Visual dots show when Bengali/Arabic months start
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## 🌐 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Android WebView
- iOS Safari
- Responsive design works on all screen sizes

## 🎨 Customization

You can customize the appearance by modifying CSS variables in `styles.css`:

```css
:root {
    --primary: #1a1a2e;
    --gold: #d4af37;
    --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* ... more variables */
}
```

## 📝 Notes

- **100% Offline** - No internet connection required!
- All three calendars (English, Bangla, Arabic) are calculated client-side
- Perfect for use in Bangladesh where internet connectivity may vary
- Instant loading - no API delays
- Arabic month names displayed in Bengali script as requested
- All dates are displayed in a single calendar grid view in unified mode
- Hover/tap on any date to see full details in tooltip

## 🔧 Technical Details

- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **No External APIs**: All conversions done client-side
- **Lightweight**: Fast loading and smooth performance
- **Mobile Optimized**: Prevents unwanted zoom on double-tap

## 📄 License

Free to use and modify for your projects.

---

**Created with ❤️ for Bangladesh**
