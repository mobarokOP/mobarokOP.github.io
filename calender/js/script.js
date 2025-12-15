// Tri-Calendar App - Multi-Calendar Display (English, Bangla, Arabic)
// Using client-side conversion - 100% offline, perfect for Bangladesh

class TriCalendar {
    constructor() {
        this.currentView = 'unified';
        this.currentDates = {
            english: new Date(),
            bengali: new Date(),
            arabic: new Date(),
            unified: new Date()
        };
        
        // Bengali Calendar Configuration
        this.banglaMonths = [
            'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
            'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
        ];
        
        this.banglaDays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
        
        this.bengaliSeasons = [
            'গ্রীষ্ম', 'গ্রীষ্ম', 'বর্ষা', 'বর্ষা', 'শরৎ', 'শরৎ',
            'হেমন্ত', 'হেমন্ত', 'শীত', 'শীত', 'বসন্ত', 'বসন্ত'
        ];
        
        this.bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        
        // Arabic/Islamic Calendar
        this.arabicMonths = [
            'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
            'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
        ];
        
        // Bengali translations for Arabic/Hijri months (exact match)
        this.arabicMonthsInBangla = [
            'মহররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 'জমাদিউল আউয়াল', 'জমাদিউস সানি',
            'রজব', 'শাবান', 'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ্জ'
        ];
        
        // English Calendar
        this.englishMonths = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.englishDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        this.seasons = ['Winter', 'Winter', 'Spring', 'Spring', 'Summer', 'Summer', 
                       'Autumn', 'Autumn', 'Autumn', 'Winter', 'Winter', 'Winter'];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderAll();
        this.updateInfo();
    }
    
    setupEventListeners() {
        // Update info every minute
        setInterval(() => {
            this.updateInfo();
        }, 60000);
    }
    
    // Utility Functions
    toBengaliNumber(num) {
        return String(num).split('').map(d => this.bengaliNumbers[parseInt(d)] || d).join('');
    }
    
    // Convert Gregorian to Bengali Calendar - Accurate Revised Calendar (1987)
    // Based on official Bangladesh government calendar
    gregorianToBangla(gregorianDate) {
        const year = gregorianDate.getFullYear();
        const month = gregorianDate.getMonth(); // 0-11
        const day = gregorianDate.getDate();
        
        // Determine if Gregorian year is leap year
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        
        // Bengali year calculation (starts April 14/15)
        let bengaliYear = year - 593;
        
        // Adjust for dates before Bengali new year
        if (month < 3 || (month === 3 && day < (isLeapYear ? 15 : 14))) {
            bengaliYear--;
        }
        
        // Bengali calendar (revised 1987): 
        // Months 1-5 (Boishakh-Bhadro): 31 days each
        // Months 6-11 (Ashwin-Falgun): 30 days each
        // Month 12 (Chaitra): 30 days (31 in Bengali leap year)
        
        // Calculate Bengali New Year date for current Gregorian year
        const bengaliNewYearDate = isLeapYear ? 15 : 14;
        const bengaliNewYear = new Date(year, 3, bengaliNewYearDate); // April 14 or 15
        
        let targetDate = new Date(year, month, day);
        
        // If date is before Bengali new year of current Gregorian year,
        // calculate from previous year's new year
        if (targetDate < bengaliNewYear) {
            const prevYearIsLeap = ((year - 1) % 4 === 0 && (year - 1) % 100 !== 0) || ((year - 1) % 400 === 0);
            const prevNewYearDate = prevYearIsLeap ? 15 : 14;
            targetDate = new Date(year, month, day);
            bengaliNewYear.setFullYear(year - 1);
            bengaliNewYear.setDate(prevNewYearDate);
        }
        
        // Calculate days from Bengali new year
        const daysSinceNewYear = Math.floor((targetDate - bengaliNewYear) / (1000 * 60 * 60 * 24));
        
        // Month lengths in revised Bengali calendar
        const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
        
        // Determine Bengali month and day
        let bengaliMonth = 0;
        let remainingDays = daysSinceNewYear;
        
        for (let i = 0; i < 12; i++) {
            if (remainingDays < monthLengths[i]) {
                bengaliMonth = i;
                break;
            }
            remainingDays -= monthLengths[i];
        }
        
        // Days are 1-indexed but calculation is off by +1, so we use remainingDays directly
        // This effectively subtracts 1 from the original calculation
        const bengaliDay = remainingDays; 
        
        // Handle edge case: if bengaliDay is 0, it means we need to go to previous month's last day
        let finalDay = bengaliDay;
        let finalMonth = bengaliMonth;
        
        if (bengaliDay <= 0) {
            finalMonth = bengaliMonth - 1;
            if (finalMonth < 0) finalMonth = 11;
            finalDay = monthLengths[finalMonth];
        }
        
        return {
            year: bengaliYear,
            month: finalMonth,
            day: finalDay,
            monthName: this.banglaMonths[finalMonth],
            season: this.bengaliSeasons[finalMonth]
        };
    }
    
    // Convert Gregorian to Hijri (Islamic) Calendar - Exact match from provided code
    gregorianToHijri(gregorianDate) {
        // More accurate Hijri conversion algorithm
        // Reference epoch: July 16, 622 CE (1 Muharram 1 AH)
        
        const year = gregorianDate.getFullYear();
        const month = gregorianDate.getMonth() + 1; // 1-12
        const day = gregorianDate.getDate();
        
        // Convert to Julian Day Number
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;
        
        let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
                  Math.floor(y / 4) - Math.floor(y / 100) + 
                  Math.floor(y / 400) - 32045;
        
        // Islamic calendar epoch in JDN
        const islamicEpoch = 1948440;
        
        // Days since Islamic epoch
        let islamicDaysSinceEpoch = jdn - islamicEpoch;
        
        // Calculate Islamic year (average year = 354.36667 days)
        let islamicYear = Math.floor((islamicDaysSinceEpoch * 30) / 10631) + 1;
        
        // Calculate the start of the Islamic year
        let yearStart = Math.floor((islamicYear - 1) * 10631 / 30) + islamicEpoch;
        
        // Days into the Islamic year
        let dayOfYear = jdn - yearStart;
        
        // Islamic month lengths (29 or 30 days alternating, with adjustments)
        const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        
        // Adjust for leap year (30 days in 12th month)
        if ((islamicYear * 11 + 14) % 30 < 11) {
            monthLengths[11] = 30;
        }
        
        // Find the month
        let islamicMonth = 0;
        let islamicDay = dayOfYear;
        
        for (let i = 0; i < 12; i++) {
            if (islamicDay <= monthLengths[i]) {
                islamicMonth = i;
                break;
            }
            islamicDay -= monthLengths[i];
        }
        
        return {
            year: islamicYear,
            month: islamicMonth,
            day: islamicDay,
            monthName: this.arabicMonths[islamicMonth],
            monthNameBangla: this.arabicMonthsInBangla[islamicMonth]
        };
    }
    
    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
    
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
    
    // Calendar Rendering Functions
    renderUnifiedCalendar() {
        const date = this.currentDates.unified;
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        // Track which months appear in this view
        const bengaliMonthsInView = new Set();
        const hijriMonthsInView = new Set();
        
        let html = '';
        
        // Day headers
        this.englishDays.forEach(day => {
            html += `<div class="day-header">${day}</div>`;
        });
        
        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            const tempDate = new Date(year, month - 1, dayNum);
            const bengaliDate = this.gregorianToBangla(tempDate);
            const hijriDate = this.gregorianToHijri(tempDate);
            
            bengaliMonthsInView.add(bengaliDate.monthName);
            hijriMonthsInView.add(hijriDate.monthNameBangla);
            
            html += `<div class="day-cell other-month">
                <div class="date-main">${dayNum}</div>
                <div class="date-bengali">${this.toBengaliNumber(bengaliDate.day)}</div>
                <div class="date-arabic">${hijriDate.day}</div>
            </div>`;
        }
        
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const tempDate = new Date(year, month, day);
            const bengaliDate = this.gregorianToBangla(tempDate);
            const hijriDate = this.gregorianToHijri(tempDate);
            
            bengaliMonthsInView.add(bengaliDate.monthName);
            hijriMonthsInView.add(hijriDate.monthNameBangla);
            
            const isToday = this.isSameDay(tempDate, today);
            const className = isToday ? 'day-cell today' : 'day-cell';
            
            // Check if it's the first day of Bengali or Arabic month
            let monthIndicator = '';
            if (bengaliDate.day === 1) {
                monthIndicator += `<div class="month-indicator bengali-month" title="${bengaliDate.monthName}"></div>`;
            }
            if (hijriDate.day === 1) {
                monthIndicator += `<div class="month-indicator arabic-month" title="${hijriDate.monthNameBangla}" style="right: ${bengaliDate.day === 1 ? '10px' : '2px'};"></div>`;
            }
            
            html += `<div class="${className}">
                ${monthIndicator}
                <div class="date-main">${day}</div>
                <div class="date-bengali">${this.toBengaliNumber(bengaliDate.day)}</div>
                <div class="date-arabic">${hijriDate.day}</div>
            </div>`;
        }
        
        // Next month days
        const totalCells = firstDay + daysInMonth;
        const remainingCells = 42 - totalCells;
        for (let day = 1; day <= remainingCells; day++) {
            const tempDate = new Date(year, month + 1, day);
            const bengaliDate = this.gregorianToBangla(tempDate);
            const hijriDate = this.gregorianToHijri(tempDate);
            
            bengaliMonthsInView.add(bengaliDate.monthName);
            hijriMonthsInView.add(hijriDate.monthNameBangla);
            
            html += `<div class="day-cell other-month">
                <div class="date-main">${day}</div>
                <div class="date-bengali">${this.toBengaliNumber(bengaliDate.day)}</div>
                <div class="date-arabic">${hijriDate.day}</div>
            </div>`;
        }
        
        document.getElementById('unifiedCalendar').innerHTML = html;
        document.getElementById('unifiedDate').textContent = date.getDate();
        document.getElementById('unifiedInfo').textContent = 
            `${this.englishMonths[month]} ${year}`;
        
        // Update Bengali and Arabic info with month ranges
        const bengaliMonthsList = Array.from(bengaliMonthsInView);
        const hijriMonthsList = Array.from(hijriMonthsInView);
        
        const bengaliMonthRange = bengaliMonthsList.length > 1 
            ? `${bengaliMonthsList[0]} - ${bengaliMonthsList[bengaliMonthsList.length - 1]}`
            : bengaliMonthsList[0];
            
        const hijriMonthRange = hijriMonthsList.length > 1 
            ? `${hijriMonthsList[0]} - ${hijriMonthsList[hijriMonthsList.length - 1]}`
            : hijriMonthsList[0];
        
        const currentBengaliDate = this.gregorianToBangla(date);
        const currentHijriDate = this.gregorianToHijri(date);
        
        document.getElementById('unifiedBengali').textContent = 
            `বাংলা: ${bengaliMonthRange} (${this.toBengaliNumber(currentBengaliDate.year)})`;
        document.getElementById('unifiedArabic').textContent = 
            `আরবি: ${hijriMonthRange} (${this.toBengaliNumber(currentHijriDate.year)} হিজরি)`;
    }
    
    renderEnglishCalendar() {
        const date = this.currentDates.english;
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        let html = '';
        
        // Day headers
        this.englishDays.forEach(day => {
            html += `<div class="day-header">${day}</div>`;
        });
        
        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            html += `<div class="day-cell other-month">${prevMonthDays - i}</div>`;
        }
        
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const tempDate = new Date(year, month, day);
            const isToday = this.isSameDay(tempDate, today);
            const className = isToday ? 'day-cell today' : 'day-cell';
            html += `<div class="${className}">${day}</div>`;
        }
        
        // Next month days
        const totalCells = firstDay + daysInMonth;
        const remainingCells = 42 - totalCells;
        for (let day = 1; day <= remainingCells; day++) {
            html += `<div class="day-cell other-month">${day}</div>`;
        }
        
        document.getElementById('englishCalendar').innerHTML = html;
        document.getElementById('englishDate').textContent = date.getDate();
        document.getElementById('englishInfo').textContent = 
            `${this.englishMonths[month]} ${year}`;
    }
    
    renderBengaliCalendar() {
        const date = this.currentDates.bengali;
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        let html = '';
        
        // Day headers
        this.banglaDays.forEach(day => {
            html += `<div class="day-header bengali-text">${day}</div>`;
        });
        
        // Previous month days - show actual Bengali dates
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            const tempDate = new Date(year, month - 1, dayNum);
            const bengaliDate = this.gregorianToBangla(tempDate);
            html += `<div class="day-cell other-month bengali-text">${this.toBengaliNumber(bengaliDate.day)}</div>`;
        }
        
        // Current month days - show actual Bengali dates
        for (let day = 1; day <= daysInMonth; day++) {
            const tempDate = new Date(year, month, day);
            const bengaliDate = this.gregorianToBangla(tempDate);
            const isToday = this.isSameDay(tempDate, today);
            const className = isToday ? 'day-cell today bengali-text' : 'day-cell bengali-text';
            html += `<div class="${className}">${this.toBengaliNumber(bengaliDate.day)}</div>`;
        }
        
        // Next month days - show actual Bengali dates
        const totalCells = firstDay + daysInMonth;
        const remainingCells = 42 - totalCells;
        for (let day = 1; day <= remainingCells; day++) {
            const tempDate = new Date(year, month + 1, day);
            const bengaliDate = this.gregorianToBangla(tempDate);
            html += `<div class="day-cell other-month bengali-text">${this.toBengaliNumber(bengaliDate.day)}</div>`;
        }
        
        document.getElementById('bengaliCalendar').innerHTML = html;
        
        // Update header with current date's Bengali date
        const currentBengaliDate = this.gregorianToBangla(date);
        document.getElementById('bengaliDate').textContent = this.toBengaliNumber(currentBengaliDate.day);
        document.getElementById('bengaliInfo').textContent = 
            `${currentBengaliDate.monthName} ${this.toBengaliNumber(currentBengaliDate.year)}`;
    }
    
    renderArabicCalendar() {
        const date = this.currentDates.arabic;
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        let html = '';
        
        // Day headers (in Bengali)
        this.banglaDays.forEach(day => {
            html += `<div class="day-header bengali-text">${day}</div>`;
        });
        
        // Previous month days - show actual Hijri dates
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            const tempDate = new Date(year, month - 1, dayNum);
            const hijriDate = this.gregorianToHijri(tempDate);
            html += `<div class="day-cell other-month bengali-text">${this.toBengaliNumber(hijriDate.day)}</div>`;
        }
        
        // Current month days - show actual Hijri dates
        for (let day = 1; day <= daysInMonth; day++) {
            const tempDate = new Date(year, month, day);
            const hijriDate = this.gregorianToHijri(tempDate);
            const isToday = this.isSameDay(tempDate, today);
            const className = isToday ? 'day-cell today bengali-text' : 'day-cell bengali-text';
            html += `<div class="${className}">${this.toBengaliNumber(hijriDate.day)}</div>`;
        }
        
        // Next month days - show actual Hijri dates
        const totalCells = firstDay + daysInMonth;
        const remainingCells = 42 - totalCells;
        for (let day = 1; day <= remainingCells; day++) {
            const tempDate = new Date(year, month + 1, day);
            const hijriDate = this.gregorianToHijri(tempDate);
            html += `<div class="day-cell other-month bengali-text">${this.toBengaliNumber(hijriDate.day)}</div>`;
        }
        
        document.getElementById('arabicCalendar').innerHTML = html;
        
        // Update header with current date's Hijri date
        const currentHijriDate = this.gregorianToHijri(date);
        document.getElementById('arabicDate').textContent = this.toBengaliNumber(currentHijriDate.day);
        document.getElementById('arabicInfo').textContent = 
            `${currentHijriDate.monthNameBangla} ${this.toBengaliNumber(currentHijriDate.year)} হিজরি`;
    }
    
    updateInfo() {
        const date = new Date();
        const bengaliDate = this.gregorianToBangla(date);
        
        document.getElementById('season').textContent = this.seasons[date.getMonth()];
        document.getElementById('bengaliSeason').textContent = bengaliDate.season;
        document.getElementById('dayOfYear').textContent = this.getDayOfYear(date);
        document.getElementById('weekNumber').textContent = this.getWeekNumber(date);
    }
    
    renderAll() {
        this.renderUnifiedCalendar();
        this.renderEnglishCalendar();
        this.renderBengaliCalendar();
        this.renderArabicCalendar();
    }
    
    changeMonth(calendar, direction) {
        const date = this.currentDates[calendar];
        date.setMonth(date.getMonth() + direction);
        
        if (calendar === 'unified') {
            this.renderUnifiedCalendar();
        } else if (calendar === 'english') {
            this.renderEnglishCalendar();
        } else if (calendar === 'bengali') {
            this.renderBengaliCalendar();
        } else if (calendar === 'arabic') {
            this.renderArabicCalendar();
        }
    }
    
    changeView(view) {
        this.currentView = view;
        
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        // Get all calendar cards
        const unifiedCard = document.getElementById('unifiedCard');
        const bengaliCard = document.getElementById('bengaliCard');
        const englishCard = document.getElementById('englishCard');
        const arabicCard = document.getElementById('arabicCard');
        const colorLegend = document.getElementById('colorLegend');
        
        // Check if elements exist before accessing them
        if (!unifiedCard || !bengaliCard || !englishCard || !arabicCard) {
            console.warn('Some calendar cards not found');
            return;
        }
        
        // Hide all first
        unifiedCard.style.display = 'none';
        bengaliCard.style.display = 'none';
        englishCard.style.display = 'none';
        arabicCard.style.display = 'none';
        if (colorLegend) colorLegend.style.display = 'none';
        
        // Show based on view
        if (view === 'unified') {
            unifiedCard.style.display = 'block';
            if (colorLegend) colorLegend.style.display = 'flex';
            this.renderUnifiedCalendar();
        } else if (view === 'all') {
            bengaliCard.style.display = 'block';
            englishCard.style.display = 'block';
            arabicCard.style.display = 'block';
            this.renderBengaliCalendar();
            this.renderEnglishCalendar();
            this.renderArabicCalendar();
        } else if (view === 'bengali') {
            bengaliCard.style.display = 'block';
            this.renderBengaliCalendar();
        } else if (view === 'english') {
            englishCard.style.display = 'block';
            this.renderEnglishCalendar();
        } else if (view === 'arabic') {
            arabicCard.style.display = 'block';
            this.renderArabicCalendar();
        }
    }
}

// Global functions for onclick handlers
let calendarApp;

function changeMonth(calendar, direction) {
    calendarApp.changeMonth(calendar, direction);
}

function changeView(view) {
    calendarApp.changeView(view);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    calendarApp = new TriCalendar();
    document.getElementById('loadingScreen').classList.add('hidden');
});

// Prevent zoom on double tap (for mobile)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
