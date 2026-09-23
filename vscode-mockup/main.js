document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 1. DRAG VERTICAL (ASIDE) ATRAVÉS DO .aside-indicator
    // ========================================================
    const aside = document.getElementById('mAside');
    const asideIndicator = document.querySelector('.aside-indicator');
    let isResizingAside = false;

    asideIndicator.addEventListener('mousedown', (e) => {
        isResizingAside = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    // ========================================================
    // 2. DRAG HORIZONTAL (SECTIONS) ATRAVÉS DO .main-indicator
    // ========================================================
    const main = document.getElementById('mMain');
    const mainIndicator = document.querySelector('.main-indicator');
    let isResizingMain = false;

    mainIndicator.addEventListener('mousedown', (e) => {
        isResizingMain = true;
        document.body.style.cursor = main.classList.contains('is-vertical')
            ? 'col-resize'
            : 'row-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    mainIndicator.addEventListener('dblclick', () => {
        main.classList.toggle('is-vertical');
        document.body.style.removeProperty('--bottom-height');
        document.body.style.removeProperty('--left-width');
        document.body.style.removeProperty('--right-width');
    });

    // ========================================================
    // MOVIMENTO DO MOUSE & SOLTURA
    // ========================================================
    document.addEventListener('mousemove', (e) => {
        if (isResizingAside) {
            const asideRect = aside.getBoundingClientRect();
            const newWidth = e.clientX - asideRect.left;

            if (newWidth >= 40 && newWidth <= window.innerWidth - 200) {
                document.body.style.setProperty('--aside-width', `${newWidth}px`);
            }
        }

        if (isResizingMain) {
            const mainRect = main.getBoundingClientRect();
            if (main.classList.contains('is-vertical')) {
                const newWidth = e.clientX - mainRect.left;

                if (newWidth >= 40 && newWidth <= mainRect.width - 40) {
                    document.body.style.setProperty('--left-width', `${newWidth}px`);
                    document.body.style.setProperty('--right-width', `${mainRect.width - newWidth}px`);
                }
            } else {
                const newHeight = mainRect.bottom - e.clientY;

                if (newHeight >= 30 && newHeight <= mainRect.height - 40) {
                    document.body.style.setProperty('--bottom-height', `${newHeight}px`);
                }
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (isResizingAside) {
            isResizingAside = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }

        if (isResizingMain) {
            isResizingMain = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
});
