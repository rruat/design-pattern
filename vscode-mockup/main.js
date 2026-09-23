document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 1. DRAG VERTICAL (ASIDE) ATRAVÉS DO .aside-indicator
    // ========================================================
    const aside = document.getElementById('mAside');
    const asideIndicator = document.querySelector('.aside-indicator');
    let isResizingAside = false;

    if (asideIndicator && aside) {
        asideIndicator.addEventListener('mousedown', (e) => {
            isResizingAside = true;
            document.body.classList.add('is-resizing-col');
            e.preventDefault();
        });

        // Duplo clique redefine a largura do aside para o padrão
        asideIndicator.addEventListener('dblclick', () => {
            document.body.style.removeProperty('--aside-width');
        });
    }

    // ========================================================
    // 2. DRAG DAS SEÇÕES (HORIZONTAL / VERTICAL)
    // ========================================================
    const main = document.getElementById('mMain');
    const mainIndicator = document.querySelector('.main-indicator');
    let isResizingMain = false;

    if (mainIndicator && main) {
        mainIndicator.addEventListener('mousedown', (e) => {
            isResizingMain = true;
            document.body.classList.add(
                main.classList.contains('is-vertical') ? 'is-resizing-col' : 'is-resizing-row'
            );
            e.preventDefault();
        });

        // Duplo clique alterna entre divisão horizontal e vertical
        mainIndicator.addEventListener('dblclick', () => {
            main.classList.toggle('is-vertical');
            document.body.style.removeProperty('--bottom-height');
            document.body.style.removeProperty('--left-width');
        });
    }

    // ========================================================
    // MOVIMENTO GLOBAL DO MOUSE
    // ========================================================
    document.addEventListener('mousemove', (e) => {
        if (isResizingAside && aside) {
            const asideRect = aside.getBoundingClientRect();
            const newWidth = e.clientX - asideRect.left;

            if (newWidth >= 50 && newWidth <= window.innerWidth - 200) {
                document.body.style.setProperty('--aside-width', `${newWidth}px`);
            }
        }

        if (isResizingMain && main) {
            const mainRect = main.getBoundingClientRect();

            if (main.classList.contains('is-vertical')) {
                const newWidth = e.clientX - mainRect.left;
                if (newWidth >= 50 && newWidth <= mainRect.width - 50) {
                    document.body.style.setProperty('--left-width', `${newWidth}px`);
                }
            } else {
                const newHeight = mainRect.bottom - e.clientY;
                if (newHeight >= 40 && newHeight <= mainRect.height - 40) {
                    document.body.style.setProperty('--bottom-height', `${newHeight}px`);
                }
            }
        }
    });

    const stopResizing = () => {
        if (isResizingAside || isResizingMain) {
            isResizingAside = false;
            isResizingMain = false;
            document.body.classList.remove('is-resizing-col', 'is-resizing-row');
        }
    };

    document.addEventListener('mouseup', stopResizing);
    window.addEventListener('blur', stopResizing);
});
