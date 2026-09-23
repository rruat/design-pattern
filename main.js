document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // ESTADO DA APLICAÇÃO
    // ========================================================
    const availableSections = [
        { id: 's1', title: 's1' },
        { id: 's2', title: 's2' },
        { id: 's3', title: 's3' },
        { id: 's4', title: 's4' }
    ];

    let openSectionIds = ['s1', 's2'];
    let layoutMode = 'stacked'; // 'stacked' (cima / baixo) ou 'side-by-side' (lado a lado)
    const sectionSizes = new Map(); // id -> flex ratio

    // Elementos DOM principais
    const navItemExplorer = document.getElementById('navItemExplorer');
    const aside = document.getElementById('mAside');
    const asideSectionList = document.getElementById('asideSectionList');
    const btnAddSection = document.getElementById('btnAddSection');
    const btnToggleLayout = document.getElementById('btnToggleLayout');
    const asideIndicator = document.querySelector('.aside-indicator');
    const main = document.getElementById('mMain');
    const btnCloseAsideMobile = document.getElementById('btnCloseAsideMobile');

    // ========================================================
    // 1. RENDERIZAÇÃO DO ASIDE (LISTA DE SEÇÕES)
    // ========================================================
    function renderAside() {
        if (!asideSectionList) return;
        asideSectionList.innerHTML = '';

        availableSections.forEach((sec) => {
            const isOpen = openSectionIds.includes(sec.id);

            const item = document.createElement('div');
            item.className = `aside-section-item ${isOpen ? 'is-open' : ''}`;
            item.title = isOpen
                ? `Seção ${sec.title} está aberta (clique para focar)`
                : `Clique para abrir a seção ${sec.title}`;

            item.innerHTML = `
                <div class="aside-item-icon"><span class="material-symbols-rounded">article</span></div>
                <div class="aside-item-title">${sec.title}</div>
                <span class="aside-item-badge">${isOpen ? 'aberta' : 'fechada'}</span>
            `;

            item.addEventListener('click', () => {
                if (!isOpen) {
                    openSection(sec.id);
                } else {
                    // Se já estiver aberta, destaca a seção no main
                    focusSection(sec.id);
                }
            });

            asideSectionList.appendChild(item);
        });
    }

    // ========================================================
    // 2. RENDERIZAÇÃO DO MAIN (SEÇÕES / ESTADO VAZIO)
    // ========================================================
    function renderMain() {
        if (!main) return;
        main.innerHTML = '';

        // Aplica classe de orientação
        if (layoutMode === 'side-by-side') {
            main.classList.add('is-side-by-side');
            if (btnToggleLayout) {
                btnToggleLayout.innerHTML = '<span class="material-symbols-rounded">view_agenda</span>';
                btnToggleLayout.title = 'Alternar para empilhado (cima / baixo)';
            }
        } else {
            main.classList.remove('is-side-by-side');
            if (btnToggleLayout) {
                btnToggleLayout.innerHTML = '<span class="material-symbols-rounded">view_column</span>';
                btnToggleLayout.title = 'Alternar para lado a lado';
            }
        }

        // Caso 0: Nenhuma seção aberta -> ESTADO VAZIO
        if (openSectionIds.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = `
                <div class="empty-state-icon"><span class="material-symbols-rounded">layers_clear</span></div>
                <h2 class="empty-state-title">Nenhuma seção aberta</h2>
                <p class="empty-state-desc">Selecione uma seção no menu lateral (Item 1 do Nav) ou clique no botão abaixo para abrir.</p>
                <button id="btnOpenDefault" class="empty-state-btn" type="button">
                    <span class="material-symbols-rounded" style="vertical-align: middle; margin-right: 4px; font-size: 18px;">add</span>Abrir s1
                </button>
            `;

            empty.querySelector('#btnOpenDefault')?.addEventListener('click', () => {
                openSection('s1');
            });

            main.appendChild(empty);
            return;
        }

        // Renderiza cada seção aberta
        openSectionIds.forEach((id, index) => {
            const secData = availableSections.find((s) => s.id === id) || { id, title: id };
            const flexRatio = sectionSizes.get(id) || 1;

            const sectionEl = document.createElement('section');
            sectionEl.id = id;
            sectionEl.className = 'main-section';
            sectionEl.style.flex = `${flexRatio} 1 0px`;
            sectionEl.dataset.id = id;

            // Header da seção
            const isFirst = index === 0;
            const isLast = index === openSectionIds.length - 1;
            const movePrevIcon = layoutMode === 'stacked'
                ? '<span class="material-symbols-rounded">arrow_upward</span>'
                : '<span class="material-symbols-rounded">arrow_back</span>';
            const moveNextIcon = layoutMode === 'stacked'
                ? '<span class="material-symbols-rounded">arrow_downward</span>'
                : '<span class="material-symbols-rounded">arrow_forward</span>';

            sectionEl.innerHTML = `
                <header class="section-header" draggable="true" title="Arraste para reordenar">
                    <div class="section-header-left">
                        <span class="section-icon"><span class="material-symbols-rounded">article</span></span>
                        <span class="section-title">${secData.title}</span>
                    </div>
                    <div class="section-header-actions">
                        <button class="section-btn btn-move-prev" type="button" title="Mover para antes" ${isFirst ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>${movePrevIcon}</button>
                        <button class="section-btn btn-move-next" type="button" title="Mover para depois" ${isLast ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>${moveNextIcon}</button>
                        <button class="section-close" type="button" aria-label="Fechar ${secData.title}" title="Fechar seção"><span class="material-symbols-rounded">close</span></button>
                    </div>
                </header>
                <div class="section-body">
                    <h3>Seção ${secData.title}</h3>
                    <p>Conteúdo da ${secData.title}. Você pode redimensionar arrastando a barra entre as seções, reordenar ou alternar entre empilhado e lado a lado.</p>
                </div>
            `;

            // Botão Fechar
            sectionEl.querySelector('.section-close')?.addEventListener('click', (e) => {
                e.stopPropagation();
                closeSection(id);
            });

            // Botão Mover para antes
            sectionEl.querySelector('.btn-move-prev')?.addEventListener('click', (e) => {
                e.stopPropagation();
                moveSection(index, -1);
            });

            // Botão Mover para depois
            sectionEl.querySelector('.btn-move-next')?.addEventListener('click', (e) => {
                e.stopPropagation();
                moveSection(index, 1);
            });

            // Drag & Drop no Header para reordenar
            const header = sectionEl.querySelector('.section-header');
            setupDragAndDrop(sectionEl, header, id);

            main.appendChild(sectionEl);

            // Adiciona divisória entre seções adjacentes
            if (index < openSectionIds.length - 1) {
                const divider = document.createElement('div');
                divider.className = 'section-divider';
                divider.dataset.dividerIndex = index;
                divider.title = 'Arraste para redimensionar ou duplo clique para alternar layout';
                divider.innerHTML = `<span class="indicator-dots"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>`;

                setupSectionDividerResize(divider, index);

                divider.addEventListener('dblclick', () => {
                    toggleLayout();
                });

                main.appendChild(divider);
            }
        });
    }

    // ========================================================
    // 3. AÇÕES DE SEÇÃO (ABRIR, FECHAR, MOVER, CRIAR, FOCAR)
    // ========================================================
    function openSection(id) {
        if (!openSectionIds.includes(id)) {
            openSectionIds.push(id);
            if (!sectionSizes.has(id)) {
                sectionSizes.set(id, 1);
            }
            renderMain();
            renderAside();
            setTimeout(() => {
                focusSection(id);
            }, 60);
        } else {
            focusSection(id);
        }
    }

    function closeSection(id) {
        openSectionIds = openSectionIds.filter((item) => item !== id);
        renderMain();
        renderAside();
    }

    function moveSection(index, direction) {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= openSectionIds.length) return;

        const temp = openSectionIds[index];
        openSectionIds[index] = openSectionIds[targetIndex];
        openSectionIds[targetIndex] = temp;

        renderMain();
    }

    function createNewSection() {
        const nextNumber = availableSections.length + 1;
        const newId = `s${nextNumber}`;
        availableSections.push({ id: newId, title: newId });
        openSection(newId);
    }

    function toggleLayout() {
        layoutMode = layoutMode === 'stacked' ? 'side-by-side' : 'stacked';
        // Redefine as proporções para ficarem distribuídas igualmente
        openSectionIds.forEach((id) => sectionSizes.set(id, 1));
        renderMain();
    }

    function focusSection(id) {
        const el = document.getElementById(id);
        if (el) {
            if (window.innerWidth <= 768 && main) {
                main.scrollTo({
                    left: el.offsetLeft - 16,
                    behavior: 'smooth'
                });
            } else {
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
            el.style.boxShadow = '0 0 1rem var(--color-outline-focus, #d7d7d9)';
            setTimeout(() => {
                el.style.boxShadow = '';
            }, 600);
        }
    }

    // ========================================================
    // 4. DRAG & DROP PARA REORDENAÇÃO DAS SEÇÕES
    // ========================================================
    let draggedId = null;

    function setupDragAndDrop(sectionEl, headerEl, id) {
        headerEl.addEventListener('dragstart', (e) => {
            draggedId = id;
            e.dataTransfer.setData('text/plain', id);
            e.dataTransfer.effectAllowed = 'move';
            sectionEl.style.opacity = '0.5';
        });

        headerEl.addEventListener('dragend', () => {
            draggedId = null;
            sectionEl.style.opacity = '1';
            document.querySelectorAll('.main-section').forEach((el) => {
                el.classList.remove('is-drag-over');
            });
        });

        sectionEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (draggedId && draggedId !== id) {
                sectionEl.classList.add('is-drag-over');
            }
        });

        sectionEl.addEventListener('dragleave', () => {
            sectionEl.classList.remove('is-drag-over');
        });

        sectionEl.addEventListener('drop', (e) => {
            e.preventDefault();
            sectionEl.classList.remove('is-drag-over');
            if (!draggedId || draggedId === id) return;

            const fromIndex = openSectionIds.indexOf(draggedId);
            const toIndex = openSectionIds.indexOf(id);

            if (fromIndex !== -1 && toIndex !== -1) {
                // Move o elemento arrastado para a posição do alvo
                openSectionIds.splice(fromIndex, 1);
                openSectionIds.splice(toIndex, 0, draggedId);
                renderMain();
            }
        });
    }

    // ========================================================
    // 5. REDIMENSIONAMENTO ENTRE SEÇÕES (DIVIDERS DINÂMICOS)
    // ========================================================
    let activeDividerResize = null;

    function setupSectionDividerResize(dividerEl, dividerIndex) {
        dividerEl.addEventListener('mousedown', (e) => {
            const isCol = layoutMode === 'side-by-side';
            document.body.classList.add(isCol ? 'is-resizing-col' : 'is-resizing-row');

            const idA = openSectionIds[dividerIndex];
            const idB = openSectionIds[dividerIndex + 1];
            const secA = document.getElementById(idA);
            const secB = document.getElementById(idB);

            if (!secA || !secB) return;

            const rectA = secA.getBoundingClientRect();
            const rectB = secB.getBoundingClientRect();

            activeDividerResize = {
                idA,
                idB,
                secA,
                secB,
                isCol,
                startX: e.clientX,
                startY: e.clientY,
                startSizeA: isCol ? rectA.width : rectA.height,
                startSizeB: isCol ? rectB.width : rectB.height,
                totalSize: isCol ? rectA.width + rectB.width : rectA.height + rectB.height
            };

            e.preventDefault();
        });
    }

    // ========================================================
    // 6. REDIMENSIONAMENTO DO ASIDE (VERTICAL DRAG)
    // ========================================================
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
    // 7. EVENTOS GLOBAIS DO MOUSE (MOVE & UP)
    // ========================================================
    document.addEventListener('mousemove', (e) => {
        // Redimensionamento do Aside
        if (isResizingAside && aside) {
            const asideRect = aside.getBoundingClientRect();
            const newWidth = e.clientX - asideRect.left;

            if (newWidth >= 50 && newWidth <= window.innerWidth - 200) {
                document.body.style.setProperty('--aside-width', `${newWidth}px`);
            }
        }

        // Redimensionamento entre duas seções adjacentes
        if (activeDividerResize) {
            const { idA, idB, secA, secB, isCol, startX, startY, startSizeA, totalSize } =
                activeDividerResize;

            const delta = isCol ? e.clientX - startX : e.clientY - startY;

            let newSizeA = startSizeA + delta;
            if (newSizeA < 50) newSizeA = 50;
            if (newSizeA > totalSize - 50) newSizeA = totalSize - 50;

            const newSizeB = totalSize - newSizeA;

            // Calcula proporção flex relativa (baseada na soma das duas seções)
            const flexA = (newSizeA / totalSize) * 2;
            const flexB = (newSizeB / totalSize) * 2;

            secA.style.flex = `${flexA} 1 0px`;
            secB.style.flex = `${flexB} 1 0px`;

            sectionSizes.set(idA, flexA);
            sectionSizes.set(idB, flexB);
        }
    });

    const stopAllResizing = () => {
        if (isResizingAside || activeDividerResize) {
            isResizingAside = false;
            activeDividerResize = null;
            document.body.classList.remove('is-resizing-col', 'is-resizing-row');
        }
    };

    document.addEventListener('mouseup', stopAllResizing);
    window.addEventListener('blur', stopAllResizing);

    // ========================================================
    // 8. EVENTOS DOS BOTÕES E NAVEGAÇÃO
    // ========================================================
    // Item 1 do Nav: ao ser clicado, ativa e gera os itens no aside
    if (navItemExplorer) {
        navItemExplorer.addEventListener('click', () => {
            renderAside();

            // No mobile: alterna abertura/fechamento do Aside (Push Sheet em fluxo)
            if (window.innerWidth <= 768 && aside) {
                const willOpen = !aside.classList.contains('is-open-mobile');
                aside.classList.toggle('is-open-mobile');

                document.querySelectorAll('#mNav ul li').forEach((li) => li.classList.remove('is-active'));
                if (willOpen) {
                    navItemExplorer.classList.add('is-active');
                }
            } else {
                document.querySelectorAll('#mNav ul li').forEach((li) => li.classList.remove('is-active'));
                navItemExplorer.classList.add('is-active');
            }
        });
    }

    // Botão de recolher o Aside no Mobile
    if (btnCloseAsideMobile && aside) {
        btnCloseAsideMobile.addEventListener('click', () => {
            aside.classList.remove('is-open-mobile');
            if (navItemExplorer) {
                navItemExplorer.classList.remove('is-active');
            }
        });
    }

    // Item de Pesquisa na barra inferior do mobile: foca a barra inteligente
    const navItemSearch = document.querySelector('#mNav ul li[title="Pesquisa"]');
    if (navItemSearch) {
        navItemSearch.addEventListener('click', () => {
            if (window.innerWidth <= 768 && aside) {
                aside.classList.remove('is-open-mobile');
            }
            document.querySelectorAll('#mNav ul li').forEach((li) => li.classList.remove('is-active'));
            navItemSearch.classList.add('is-active');
            const input = document.getElementById('smartSearchInput');
            if (input) {
                input.focus();
            }
        });
    }

    // Botão "+" no topo do aside: adiciona nova seção
    if (btnAddSection) {
        btnAddSection.addEventListener('click', () => {
            createNewSection();
        });
    }

    // Botão de alternar layout no aside
    if (btnToggleLayout) {
        btnToggleLayout.addEventListener('click', () => {
            toggleLayout();
        });
    }

    // ========================================================
    // 9. BARRA DE BUSCA INTELIGENTE (COMMAND PALETTE / OMNIBAR)
    // ========================================================
    const smartSearchBar = document.getElementById('smartSearchBar');
    const smartSearchInput = document.getElementById('smartSearchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchResults = document.getElementById('searchResults');

    let selectedIndex = 0;
    let currentResults = [];

    // Lista de comandos / ações inteligentes
    const commandList = [
        {
            id: 'cmd-toggle-layout',
            type: 'command',
            title: 'Alternar Layout (Empilhado / Lado a Lado)',
            icon: 'view_agenda',
            hint: 'Layout',
            action: () => toggleLayout()
        },
        {
            id: 'cmd-new-section',
            type: 'command',
            title: 'Criar Nova Seção',
            icon: 'add',
            hint: 'Ação',
            action: () => createNewSection()
        },
        {
            id: 'cmd-open-all',
            type: 'command',
            title: 'Abrir Todas as Seções Disponíveis',
            icon: 'tab',
            hint: 'Ação',
            action: () => {
                availableSections.forEach((s) => {
                    if (!openSectionIds.includes(s.id)) openSectionIds.push(s.id);
                });
                renderMain();
                renderAside();
            }
        },
        {
            id: 'cmd-close-all',
            type: 'command',
            title: 'Fechar Todas as Seções (Mostrar Estado Vazio)',
            icon: 'layers_clear',
            hint: 'Ação',
            action: () => {
                openSectionIds = [];
                renderMain();
                renderAside();
            }
        },
        {
            id: 'cmd-reset-aside',
            type: 'command',
            title: 'Redefinir Largura do Menu Lateral (Aside)',
            icon: 'vertical_split',
            hint: 'Aparência',
            action: () => {
                document.body.style.removeProperty('--aside-width');
            }
        },
        {
            id: 'cmd-focus-explorer',
            type: 'command',
            title: 'Abrir / Focar Explorador de Seções',
            icon: 'folder_open',
            hint: 'Navegação',
            action: () => {
                if (navItemExplorer) navItemExplorer.click();
            }
        }
    ];

    function openSearchDropdown() {
        if (!searchDropdown) return;
        searchDropdown.style.display = 'block';
        updateSearchResults();
    }

    function closeSearchDropdown() {
        if (!searchDropdown) return;
        searchDropdown.style.display = 'none';
        selectedIndex = 0;
    }

    function updateSearchResults() {
        if (!searchResults || !smartSearchInput) return;
        const query = smartSearchInput.value.trim().toLowerCase();

        let filteredItems = [];

        // Filtro por prefixo:
        // Se começar com ">", filtra apenas comandos
        // Se começar com "#", filtra apenas seções
        const isCommandOnly = query.startsWith('>');
        const isSectionOnly = query.startsWith('#');
        const cleanQuery = query.replace(/^[>#]/, '').trim();

        // 1. Coleta e filtra seções
        if (!isCommandOnly) {
            const matchedSections = availableSections
                .filter((s) => !cleanQuery || s.id.toLowerCase().includes(cleanQuery) || s.title.toLowerCase().includes(cleanQuery))
                .map((s) => {
                    const isOpen = openSectionIds.includes(s.id);
                    return {
                        id: s.id,
                        type: 'section',
                        title: `Seção ${s.title}`,
                        icon: 'article',
                        hint: isOpen ? 'Aberta (Enter para focar)' : 'Fechada (Enter para abrir)',
                        action: () => {
                            if (!isOpen) {
                                openSection(s.id);
                            } else {
                                focusSection(s.id);
                            }
                        }
                    };
                });

            filteredItems.push(...matchedSections);
        }

        // 2. Coleta e filtra comandos
        if (!isSectionOnly) {
            const matchedCommands = commandList.filter((cmd) => {
                return !cleanQuery || cmd.title.toLowerCase().includes(cleanQuery);
            });

            filteredItems.push(...matchedCommands);
        }

        currentResults = filteredItems;
        if (selectedIndex >= currentResults.length) {
            selectedIndex = 0;
        }

        renderSearchResults(cleanQuery);
    }

    function renderSearchResults(query) {
        if (!searchResults) return;
        searchResults.innerHTML = '';

        if (currentResults.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    Nenhum resultado encontrado para "<strong>${escapeHtml(query)}</strong>"
                </div>
            `;
            return;
        }

        // Agrupa por tipo (Seções vs Comandos) se houver ambos
        const sections = currentResults.filter((r) => r.type === 'section');
        const commands = currentResults.filter((r) => r.type === 'command');

        const renderItem = (item, globalIndex) => {
            const el = document.createElement('div');
            el.className = `search-item ${globalIndex === selectedIndex ? 'is-selected' : ''}`;
            el.dataset.index = globalIndex;

            // Highlight no texto se houver busca
            let highlightedTitle = escapeHtml(item.title);
            if (query) {
                const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
                highlightedTitle = highlightedTitle.replace(regex, '<mark>$1</mark>');
            }

            el.innerHTML = `
                <div class="search-item-icon"><span class="material-symbols-rounded">${item.icon}</span></div>
                <div class="search-item-title">${highlightedTitle}</div>
                <span class="search-item-hint">${item.hint}</span>
            `;

            el.addEventListener('click', () => {
                executeItem(globalIndex);
            });

            el.addEventListener('mouseenter', () => {
                selectedIndex = globalIndex;
                updateSelectedVisual();
            });

            return el;
        };

        let currentIndex = 0;

        if (sections.length > 0) {
            const cat = document.createElement('div');
            cat.className = 'search-category-title';
            cat.textContent = 'Seções / Editores';
            searchResults.appendChild(cat);

            sections.forEach((sec) => {
                searchResults.appendChild(renderItem(sec, currentIndex++));
            });
        }

        if (commands.length > 0) {
            const cat = document.createElement('div');
            cat.className = 'search-category-title';
            cat.textContent = 'Ações e Comandos';
            searchResults.appendChild(cat);

            commands.forEach((cmd) => {
                searchResults.appendChild(renderItem(cmd, currentIndex++));
            });
        }

        scrollToSelected();
    }

    function updateSelectedVisual() {
        const items = searchResults.querySelectorAll('.search-item');
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add('is-selected');
            } else {
                item.classList.remove('is-selected');
            }
        });
    }

    function scrollToSelected() {
        const selected = searchResults.querySelector('.search-item.is-selected');
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }

    function executeItem(index) {
        const item = currentResults[index];
        if (item && item.action) {
            item.action();
            closeSearchDropdown();
            if (smartSearchInput) {
                smartSearchInput.value = '';
                smartSearchInput.blur();
            }
        }
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Eventos da Search Bar
    if (smartSearchInput) {
        smartSearchInput.addEventListener('focus', () => {
            openSearchDropdown();
        });

        smartSearchInput.addEventListener('input', () => {
            openSearchDropdown();
        });

        smartSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = (selectedIndex + 1) % currentResults.length;
                    updateSelectedVisual();
                    scrollToSelected();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
                    updateSelectedVisual();
                    scrollToSelected();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    executeItem(selectedIndex);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeSearchDropdown();
                smartSearchInput.blur();
            }
        });
    }

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!smartSearchBar?.contains(e.target) && !searchDropdown?.contains(e.target)) {
            closeSearchDropdown();
        }
    });

    // Atalho global de teclado: Ctrl + K ou Ctrl + P para focar a barra inteligente
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'p')) {
            e.preventDefault();
            if (smartSearchInput) {
                smartSearchInput.focus();
                smartSearchInput.select();
                openSearchDropdown();
            }
        }
    });

    // ========================================================
    // 10. CONTROLE DO GESTO (SWIPE ENTRE AS VIEWS NO MOBILE)
    // ========================================================
    let startX = 0;
    let startScroll = 0;

    if (main) {
        main.addEventListener(
            'touchstart',
            (event) => {
                if (window.innerWidth > 768) return;
                startX = event.touches[0].clientX;
                startScroll = main.scrollLeft;
            },
            { passive: true }
        );

        main.addEventListener(
            'touchend',
            (event) => {
                if (window.innerWidth > 768) return;

                const endX = event.changedTouches[0].clientX;
                const distance = endX - startX;

                // Ignora movimentos muito pequenos
                if (Math.abs(distance) < 30) {
                    return;
                }

                const views = main.querySelectorAll('.main-section');
                if (views.length === 0) return;

                const viewWidth = views[0].offsetWidth;
                const gap = 8;
                const currentIndex = Math.round(
                    (startScroll + 16) / (viewWidth + gap)
                );

                let nextIndex = currentIndex;

                // Arrastou para a esquerda (avança 1 view)
                if (distance < 0) {
                    nextIndex = Math.min(currentIndex + 1, views.length - 1);
                }
                // Arrastou para a direita (recua 1 view)
                else {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }

                // Move exatamente uma view
                main.scrollTo({
                    left: views[nextIndex].offsetLeft - 16,
                    behavior: 'smooth'
                });
            },
            { passive: true }
        );
    }

    // Inicialização
    renderAside();
    renderMain();
});
