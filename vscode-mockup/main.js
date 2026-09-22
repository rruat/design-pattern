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
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
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
            const newHeight = mainRect.bottom - e.clientY;

            if (newHeight >= 30 && newHeight <= mainRect.height - 40) {
                document.body.style.setProperty('--bottom-height', `${newHeight}px`);
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
