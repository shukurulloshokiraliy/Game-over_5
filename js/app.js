document.addEventListener('DOMContentLoaded', () => {
    const savollar = document.querySelectorAll('.Question');

    savollar.forEach(savol => {
        savol.addEventListener('click', () => {
            const otaElement = savol.parentElement;
            otaElement.classList.toggle('opened');

            document.querySelectorAll('.accord').forEach(boshqaElement => {
                if (boshqaElement !== otaElement && boshqaElement.classList.contains('opened')) {
                    boshqaElement.classList.remove('opened');
                }
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelectorAll('.sub-btn');

    btn.forEach(active => {
        active.addEventListener('click', () => {
            const otaElement = active.parentElement;
            otaElement.classList.toggle('opened');
            document.querySelectorAll('.add-form').forEach(boshqaElement => {
                if (boshqaElement !== otaElement && boshqaElement.classList.contains('opened')) {
                    boshqaElement.classList.remove('opened');
                }
            });
        });
    });
});