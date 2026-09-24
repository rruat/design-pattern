# Documento de Requisitos do Produto (PRD)
## Projeto: Design Pattern Workspace (Web IDE / Multi-View Shell)

---

### 1. Visão Geral do Produto

#### 1.1 Objetivo e Propósito
O **Design Pattern Workspace** é um shell de interface web modular, altamente responsivo e ergonômico, desenhado especificamente para produtividade analítica, gestão de cadastros complexos (ex: apólices de seguros, clientes e contratos) e navegação rápida voltada para operadores que mantêm as **mãos no teclado**.

Inspirado nas melhores convenções de Web IDEs (VS Code), navegadores modernos (Arc) e ferramentas de produtividade espacial, o sistema permite trabalhar com múltiplas **Views** simultâneas (tanto do mesmo tipo quanto de tipos diferentes), com redimensionamento dinâmico, reordenação via teclado ou drag-and-drop, sem sobreposição de popups ou modais que quebrem o fluxo operacional.

#### 1.2 Proposta de Valor
- **Produtividade "Mãos no Teclado"**: Comandos globais acessíveis via Omnibar / Command Palette (`Ctrl + K` / `Ctrl + P`), atalhos `Alt` para troca de foco e movimentação espacial de views, e navegação `↑`/`↓`/`J`/`K` nas listas.
- **Filosofia Sem Dialogs/Popups**: Eliminação estrita de janelas modais intrusivas. Detalhes e cadastros são renderizados diretamente no espaço de trabalho (em painel lateral de detalhe ou como novas views dedicadas).
- **Multi-View Flexível**: Suporte a layouts empilhados (*stacked*) e lado a lado (*side-by-side*), com redimensionamento dinâmico entre divisórias e reordenação via drag-and-drop ou atalhos de teclado.
- **4 Modos de Visualização Intercambiáveis**: Cada view de dados pode alternar dinamicamente entre **Kanban**, **Galeria**, **Tabela** e **Lista & Detalhe (List-Detail)**.
- **Busca Semântica & Flexível na Omnibar**: Pesquisa tolerante a acentuação e caixa alta/baixa, com prefixos dedicados como `apolice: [nome/número]`, `#` para views e `>` para comandos.
- **Leveza Extrema**: Desenvolvido integralmente em **Vanilla Web Technologies** (HTML5 semântico, CSS3 moderno com CSS Variables, JavaScript ES6+ puro), com zero dependências externas de runtime.

---

### 2. O Que Temos Até Agora (Status Atual)

Abaixo está o mapeamento detalhado da arquitetura, componentes e regras de negócio implementados no código-fonte (`index.html`, `main.js`, `style.css`):

#### 2.1 Arquitetura e Stack
- **HTML5 Semântico**: Estruturação com `<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<footer>`.
- **CSS Grid & Flexbox**: Layout do desktop montado em CSS Grid com áreas nomeadas (`mHeader`, `mNav`, `mNavDivider`, `mAside`, `mMain`, `mFooter`).
- **Design Tokens (CSS Variables)**:
  - Dimensões: `--nav-width`, `--header-height`, `--nav-item-size`, `--gap-size`, `--aside-width`.
  - Cores semânticas neutras / dark-light adaptado: `--color-black` (#fafafa), `--color-white` (#1d2124), `--color-cyan` (#ebebeb), `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-outline`, `--color-outline-focus`.
  - Tipografia: Google Sans Flex e ícones Material Symbols Rounded integrados via Google Fonts.
- **Engine JavaScript Reativo (Event-Driven & In-Memory)**: Estado desacoplado de views abertas, foco ativo, proporções espaciais e dados das apólices.

---

#### 2.2 Diagrama Estrutural do Workspace

```
+---------------------------------------------------------------------------------------------+
|  [Logo] [Menu li]            [ 🔍 Buscar / Omnibar (Ctrl+K) ]                    [Header R] |
+---+---+----------------------+--------------------------------------------------------------+
| N | D | ASIDE                | MAIN WORKSPACE (Layout: Stacked ou Side-by-Side)             |
| A | I | - EXPLORADOR VIEWS   | +----------------------------------------------------------+ |
| V | V | - Botão alternar     | | Header View 1 (Foco Sutil, Drag, Prev, Next, Close)       | |
|   | I | - Botão nova view (+) | | Toolbar: [Filtro] [ ⊞ | ▦ | ☷ | ◫ ] [Nova Apólice]       | |
| B | D |   - Kanban           | | Modo: Kanban / Galeria / Tabela / Lista & Detalhes       | |
| A | E |   - Galeria          | +==========================================================+ |
| R | R |   - Tabela           | | Divisória de Redimensionamento (Splitter Arrastável)      | |
|   |   |   - Lista & Detalhe  | +----------------------------------------------------------+ |
|   |   |   - Documento        | | Header View 2 (Cadastro Segurado / Documento)            | |
|   |   |                      | | Detalhes em painel integrado sem popup                   | |
|   |   | <--- Splitter --->   | +----------------------------------------------------------+ |
|   |   |                      | (Ou Empty State elegante caso todas as views sejam fechadas) |
+---+---+----------------------+--------------------------------------------------------------+
| FOOTER (Atalhos rápidos: Ctrl+K Busca • Alt+←→ Mover View • Alt+[] Ciclar Foco)              |
+---------------------------------------------------------------------------------------------+
```

---

#### 2.3 Especificação dos 4 Modos de Visualização de Dados

Cada View de dados suporta alternância instantânea entre 4 modos através de um segmented toggle na barra de ferramentas superior (`.view-mode-toggle`):

##### 1. Modo Kanban (`view_kanban`)
- **Colunas por Etapa**: Organizado em "Em Análise", "Ativa / Vigente" e "Renovada".
- **Cards Ricos**: Exibe número de apólice (badge mono), nome do cliente, ramo de seguro (tag), seguradora, prêmio, data de vigência, avatar do corretor/atendente e botão de desanexação rápida para view dedicada (`open_in_new`).
- **Drag & Drop de Cards**: Arraste nativo de cards entre colunas para mudança imediata de status.
- **Filtro Local**: Barra de busca instantânea com highlight dinâmico de termos pesquisados.

##### 2. Modo Galeria (`grid_view`)
- **Grade Responsiva**: Cards compactos dispostos em grid com altura autoajustável para evitar espaços vazios.
- **Status Selector Direto**: Dropdown em cada card permitindo alteração rápida de status sem sair do modo.
- **Abertura como View**: Botão discreto `open_in_new` para projetar a apólice em um card de cadastro no workspace.

##### 3. Modo Tabela (`table_rows`)
- **Visualização Densa em Linhas e Colunas**: Cabeçalho fixo (*sticky header*) com colunas:
  - *Apólice*: Badge tipográfico com número formatado.
  - *Segurado / Cliente*: Avatar de iniciais e nome completo com highlight de busca.
  - *Tipo / Ramo*: Tag do produto (Auto, Vida, Residencial, Saúde, etc.).
  - *Prêmio Total*: Valor financeiro em destaque.
  - *Status*: Pílula colorida com ponto indicador de status.
  - *Vigência*: Data de início ou término.
  - *Ações*: Botão para abrir o registro como view independente.
- **Interação**: Clique em qualquer linha abre a view detalhada de cadastro no workspace.

##### 4. Modo Lista & Detalhes (`view_sidebar` - Master-Detail)
- **Motivação do Usuário**: Consulta sequencial rápida de múltiplas apólices sem abrir e fechar views ou acumular seções no workspace.
- **Arquitetura Bipartida**:
  - **Master List (Painel Esquerdo)**: Lista rolável independente com apólices formatadas, tags de status, prêmio e botão de desanexação.
  - **Detail Pane (Painel Direito)**: Painel de detalhamento instantâneo exibindo:
    - Barra de navegação superior com contador (`X de Y`), botões de seta anterior/próximo (<kbd>expand_less</kbd>/<kbd>expand_more</kbd>) e botão "Abrir como View".
    - *Hero Card*: Avatar, nome do segurado, badge da apólice, seletor de status e valores principais.
    - *Box 1: Dados do Segurado* (Nome, CPF, E-mail, Telefone, Endereço).
    - *Box 2: Detalhes da Apólice* (Seguradora, Ramo, Franquia, Vigência, Status alterável).
    - *Box 3: Coberturas Contratadas* (Coberturas principais e histórico de sinistros).
    - *Box 4: Observações e Notas* (Textarea interativo para anotações rápidas).
- **Ergonomia e Foco Contínuo**:
  - Seleção por clique ou por teclado (<kbd>↑</kbd>/<kbd>↓</kbd> ou <kbd>K</kbd>/<kbd>J</kbd>).
  - A troca de card atualiza os detalhes em memória **sem destruir o DOM da lista**, mantendo o foco do teclado intacto e preservando o scroll da master list.

---

#### 2.4 Sistema de Navegação "Mãos no Teclado"

Para garantir que o operador realize todo o seu trabalho sem precisar recorrer ao mouse, foi construído um ecossistema de atalhos globais e locais:

| Atalho | Contexto | Ação Realizada |
|---|---|---|
| <kbd>Ctrl</kbd> + <kbd>K</kbd> ou <kbd>Ctrl</kbd> + <kbd>P</kbd> | Global | Abre/foca a Omnibar de busca inteligente |
| <kbd>Alt</kbd> + <kbd>←</kbd> / <kbd>↑</kbd> | Global | Move a view em foco para a esquerda / cima na ordem do workspace |
| <kbd>Alt</kbd> + <kbd>→</kbd> / <kbd>↓</kbd> | Global | Move a view em foco para a direita / baixo na ordem do workspace |
| <kbd>Alt</kbd> + <kbd>[</kbd> | Global | Move o foco para a view anterior |
| <kbd>Alt</kbd> + <kbd>]</kbd> | Global | Move o foco para a próxima view |
| <kbd>Alt</kbd> + <kbd>1</kbd> a <kbd>9</kbd> | Global | Foca diretamente a view pelo seu número de índice |
| <kbd>Alt</kbd> + <kbd>W</kbd> | Global | Fecha a view atualmente em foco |
| <kbd>Alt</kbd> + <kbd>L</kbd> | Global | Alterna o layout do workspace (Empilhado vs Lado a Lado) |
| <kbd>↑</kbd> / <kbd>↓</kbd> ou <kbd>K</kbd> / <kbd>J</kbd> | Lista & Detalhes | Alterna entre apólices na lista e atualiza detalhes em tempo real |
| <kbd>Enter</kbd> | Lista & Detalhes | Abre a apólice selecionada como uma nova view no workspace |
| <kbd>Esc</kbd> | Omnibar | Fecha o dropdown de busca e remove o foco |

---

#### 2.5 Omnibar & Mecanismo de Busca Insensível a Acentos e Caixa

A Omnibar superior (`#smartSearchBar`) possui normalização NFD (`normalizeStr`) e expressões regulares dinâmicas para busca tolerante a acentos e maiúsculas/minúsculas:

- **Busca por Apólice / Pessoa (`apolice: [consulta]`)**:
  - Suporta qualquer variação: `apolice: claudio`, `apólice: cláudio`, `APOLICE: CLAUDIO`, `apolice: auto`, `apolice: 2024`.
  - Retorna cadastros de pessoas e apólices, além de views do workspace que contenham o termo.
- **Prefixos Operacionais**:
  - `>` : Filtra exclusivamente comandos do workspace (layout, criação de views, fechamento, etc.).
  - `#` : Filtra exclusivamente views disponíveis no explorador.
  - Texto livre: Executa busca híbrida unificada entre Apólices, Views e Comandos.
- **Realce Tipográfico**: Os caracteres correspondentes são destacados com tags `<mark>` preservando a acentuação e capitalização originais do texto.

---

#### 2.6 Gerenciamento e Redimensionamento de Espaço

- **Redimensionamento Dinâmico de Views**: Divisórias interativas (`.section-divider`) calculam o *flex-ratio* relativo de views vizinhas com limite de segurança de 50px.
- **Redimensionamento do Menu Lateral**: Alça vertical arrastável com persistência dinâmica de `--aside-width`.
- **Modo Mobile Especializado**:
  - O workspace opera como uma esteira horizontal fluida com *scroll-snap*.
  - Detecção nativa de gestos *touch* (Swipe via `touchstart`/`touchend`).
  - O painel lateral opera como *Push Sheet* sem tela de bloqueio (*scrim*).
  - A barra de navegação ancora no rodapé (`Bottom Bar`) respeitando áreas seguras do dispositivo móvel.

---

### 3. Matriz de Requisitos e Funcionalidades

| Módulo | Funcionalidade | Status Atual | Detalhes da Implementação |
|---|---|---|---|
| **Views** | Modo Kanban | ✅ Concluído | Colunas de status, drag & drop de cards, filtro instantâneo |
| **Views** | Modo Galeria | ✅ Concluído | Grid responsivo de cards com seletor de status |
| **Views** | Modo Tabela | ✅ Concluído | Tabela com colunas detalhadas e ação de abertura direta |
| **Views** | Modo Lista & Detalhe | ✅ Concluído | Painel master-detail em tile único com navegação por teclado |
| **Views** | View de Cadastro Dedicada | ✅ Concluído | Visualização completa de dados cadastrais, coberturas e sinistros |
| **Views** | Indicador Sutil de Foco | ✅ Concluído | Borda refinada e badge "Em Foco" na view ativa |
| **Views** | Reordenação via Teclado | ✅ Concluído | `Alt + ←` / `Alt + →` move a view ativa para antes/depois |
| **Views** | Ciclo de Foco via Teclado | ✅ Concluído | `Alt + [` / `Alt + ]` e `Alt + 1..9` para focar views |
| **Header** | Omnibar com Sintaxe `apolice:` | ✅ Concluído | Busca insensível a acentuação e caixa para pessoas e apólices |
| **Header** | Comandos de Criação de Views | ✅ Concluído | Atalhos para Kanban, Galeria, Tabela, Lista & Detalhe e Doc |
| **Aside** | Menu "+ View" com Tipos | ✅ Concluído | Dropdown com ícones e descrições dos 5 tipos de view |
| **Workspace** | Layout Empilhado vs Lado a Lado | ✅ Concluído | Alternância fluida com redistribuição proporcional |
| **Workspace** | Redimensionamento por Arraste | ✅ Concluído | Divisores dinâmicos de flex-ratio |
| **Workspace** | Política Sem Popups/Modais | ✅ Concluído | 100% das interações mantidas no canvas/tiles |
| **Mobile** | Scroll-Snap e Gesto Swipe | ✅ Concluído | Navegação lateral fluida por toque |
| **Mobile** | Lista & Detalhe Responsiva | ✅ Concluído | Empilhamento vertical em telas pequenas |
| **Persistência** | LocalStorage | ⚪ Próxima fase | Salvar views abertas e ordem ao recarregar |
| **Footer** | Métricas e Status Bar | 🟡 Parcial | Exibição de atalhos de teclado ativos |

---

### 4. Requisitos Não-Funcionais

1. **Performance e Footprint**:
   - Zero dependências de terceiros (*vanilla only*).
   - Renderização inicial instantânea (First Contentful Paint < 250ms).
   - Manipulação eficiente do DOM: mudanças de seleção na Lista & Detalhes não destroem nem recriam a lista master.
2. **Ergonomia e Usabilidade**:
   - Manter operadores experientes com a mão no teclado sem quebras de foco.
   - Feedback visual imediato e sutil (sem flashes de tela ou modais bloqueantes).
3. **Acessibilidade**:
   - Tags semânticas, atributos `role="listbox"`, `role="option"`, `aria-selected`, `tabindex="0"` e suporte completo a leitores de tela.

---

### 5. Próximos Passos Sugeridos

1. **Persistência em LocalStorage**: Salvar a lista de `openViewIds`, `layoutMode`, proporções `viewSizes` e notas das apólices para persistência entre sessões.
2. **Edição Inline de Campos**: Permitir alterar dados cadastrais (ex: telefone, e-mail, prêmio) com edição direta na tela (*click to edit*).
3. **Exportação de Relatórios**: Exportar dados filtrados da Tabela para CSV ou JSON com um comando da Omnibar.
