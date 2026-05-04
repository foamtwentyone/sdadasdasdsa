(function () {
    'use strict';

    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var navList = document.getElementById('nav-list');
    if (toggle && navList) {
        toggle.addEventListener('click', function () {
            var open = navList.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Theme toggle with localStorage persistence
    var STORAGE_KEY = 'infostorage-theme';
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    var themeButtons = document.querySelectorAll('#theme-toggle');
    function syncPressed() {
        var current = document.documentElement.getAttribute('data-theme') === 'dark';
        themeButtons.forEach(function (b) {
            b.setAttribute('aria-pressed', current ? 'true' : 'false');
        });
    }
    syncPressed();
    themeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(STORAGE_KEY, next);
            syncPressed();
        });
    });

    // Save current page as PDF via print dialog
    var pdfButton = document.getElementById('pdf-button');
    if (pdfButton) {
        pdfButton.addEventListener('click', function () {
            var prevTitle = document.title;
            document.title = 'Перспективные технологии хранения информации';
            window.print();
            setTimeout(function () { document.title = prevTitle; }, 1000);
        });
    }

    // Glossary live search
    var search = document.getElementById('glossary-search');
    var glossary = document.getElementById('glossary');
    if (search && glossary) {
        var items = glossary.querySelectorAll('.g-item');
        search.addEventListener('input', function () {
            var q = search.value.trim().toLowerCase();
            items.forEach(function (it) {
                var text = it.textContent.toLowerCase();
                it.style.display = (q === '' || text.indexOf(q) !== -1) ? '' : 'none';
            });
        });
    }
})();
