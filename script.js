/**
 * Atidaro pasirinktą polangį (sub-page)
 * @param {string} pageId - Elemento ID, kurį norime parodyti
 */
function openPage(pageId) {
    const targetPage = document.getElementById(pageId);
    const mainWindow = document.getElementById('main-window');

    if (targetPage) {
        // 1. Pridedame klasę, kuri CSS faile turi "display: flex !important"
        targetPage.classList.add('fade-in');

        // 2. Modifikuojame pagrindinį langą (sukuriamas "floating" efektas)
        if (mainWindow) {
            mainWindow.style.filter = 'blur(15px) brightness(0.4)';
            mainWindow.style.transform = 'scale(0.95)';
            mainWindow.style.pointerEvents = 'none'; // Neleidžia spausti kortelių fone
        }

        // Užfiksuojame skrolinimą, kad fonas nejudėtų
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Klaida: Puslapis su ID '" + pageId + "' nerastas.");
    }
}

/**
 * Grįžta į pagrindinį meniu
 */
function goBack() {
    // 1. Surandame visus atidarytus polangius ir juos paslepiame
    const subPages = document.querySelectorAll('.sub-page');
    subPages.forEach(page => {
        page.classList.remove('fade-in');
        // Po trumpos pauzės (kol baigsis animacija) galutinai paslepiame
        setTimeout(() => {
            if (!page.classList.contains('fade-in')) {
                page.style.display = 'none';
            }
        }, 500);
    });

    // 2. Atstatome pagrindinį langą į pradinę būseną
    const mainWindow = document.getElementById('main-window');
    if (mainWindow) {
        mainWindow.style.filter = 'none';
        mainWindow.style.transform = 'scale(1)';
        mainWindow.style.pointerEvents = 'auto';
    }

    // Grąžiname galimybę skrolinti (jei reikia)
    document.body.style.overflow = 'auto';
}

// PAPILDOMA: Uždarome langą paspaudus ESC mygtuką
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        goBack();
    }
});

// PELĖS TAKO EFEKTAS
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', function (e) {
    // Optimizacija: kuriame tašką tik jei pelė pajudėjo bent 10 pikselių
    // Tai sumažina DOM elementų kiekį ir pagreitina puslapį
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (dist < 10) return;

    lastX = e.clientX;
    lastY = e.clientY;

    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');

    // Nustatome poziciją (centruojame ant pelytės)
    trail.style.left = (e.clientX - 3) + 'px';
    trail.style.top = (e.clientY - 3) + 'px';

    document.body.appendChild(trail);

    // Išvalome elementą po animacijos
    setTimeout(() => {
        trail.remove();
    }, 400); // Turi sutapti su CSS animacijos trukme
});