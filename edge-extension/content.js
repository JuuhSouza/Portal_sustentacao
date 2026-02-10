(() => {
  if (window.__guideOverlay) {
    return;
  }

  const ROOT_ID = 'guide-overlay-root';
  const data = [
    {
      id: 1,
      nome: 'Guia de Processos',
      categoria: 'Processos',
      descricao:
        'Neste link encontra-se um guia de processos gerais que serao necessarios para resolver os chamados. Cada caso exige medidas diferentes e novos chamados podem aparecer. Consulte seus colegas quando necessario.',
      instrucoes: [
        {
          passo: '1o Passo',
          info:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae pariatur veritatis, veniam dolor, suscipit doloremque quibusdam quos, incidunt deserunt commodi.'
        },
        {
          passo: '2o Passo',
          info:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae pariatur veritatis, veniam dolor, suscipit doloremque quibusdam quos, incidunt deserunt commodi.'
        }
      ],
      links: [
        {
          url:
            'https://ciazaffari-my.sharepoint.com/:w:/g/personal/kaillanny_santos_ciazaffari_com_br/IQCnvptunduyQJ6i23cHx3BKATUgpWMv7nOrMi5Qn-evkqE?e=XjhO9J&wdOrigin=TEAMS-WEB.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1770723259084&web=1',
          label: 'Guia de Processos'
        }
      ]
    },
    {
      id: 2,
      nome: 'FAQ - Termos Tecnicos',
      categoria: 'Sustentacao',
      descricao:
        'Guia de termos basicos sobre a parte de Sustentacao. Termos tecnicos explicados: Sustentacao, Contingencia, EAC, WPS, Portal GEI, Job, ATM, NF-e, NFS-e, NFC-e, Cupom Fiscal, NSU, RPS.',
      instrucoes: [
        {
          passo: '1o Passo',
          info:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae pariatur veritatis, veniam dolor, suscipit doloremque quibusdam quos, incidunt deserunt commodi.'
        }
      ],
      links: [
        {
          url:
            'https://ciazaffari-my.sharepoint.com/:w:/g/personal/kaillanny_santos_ciazaffari_com_br/IQCnvptunduyQJ6i23cHx3BKATUgpWMv7nOrMi5Qn-evkqE?e=XjhO9J&wdOrigin=TEAMS-WEB.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1770723259084&web=1',
          label: 'Guia de chamados'
        }
      ]
    },
    {
      id: 3,
      nome: 'Analise Contingencia Pendente',
      categoria: 'Cupom',
      descricao:
        'Guia para resolver chamados de contingencia/pendente com passo-a-passo detalhado. Em caso de duvidas, consulte o Rilo ou o Rinaldo.',
      instrucoes: [
        {
          passo: '1o Passo',
          info:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae pariatur veritatis, veniam dolor, suscipit doloremque quibusdam quos, incidunt deserunt commodi.'
        }
      ],
      links: [
        {
          url:
            'https://ciazaffari-my.sharepoint.com/:w:/g/personal/kaillanny_santos_ciazaffari_com_br/IQBBMq8NK1bERKYxS-q2u-XzAdwooG-jQrbImnzD5bIuexY?e=puee0f&wdOrigin=TEAMS-WEB.null_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1770732584479&web=1',
          label: 'Contingencia e Pendente'
        }
      ]
    }
  ];

  let root = null;
  let shadow = null;
  let rootEl = null;
  let openBtn = null;
  let closeBtn = null;
  let listEl = null;
  let selectEl = null;
  let inputEl = null;
  let mounted = false;
  const state = {
    open: true,
    selectedId: null,
    category: 'Todos',
    search: ''
  };

  const renderList = () => {
    if (!listEl) {
      return;
    }
    const term = state.search.trim().toLowerCase();
    const filtered = data.filter((item) => {
      const matchCategory =
        state.category === 'Todos' || item.categoria === state.category;
      const matchText =
        item.nome.toLowerCase().includes(term) ||
        item.descricao.toLowerCase().includes(term);
      return matchCategory && matchText;
    });

    listEl.innerHTML = '';
    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'guide-card';
      card.innerHTML = `
        <h4>Categoria: <span class="guide-badge">${item.categoria}</span></h4>
        <h3>${item.nome}</h3>
      `;

      if (state.selectedId === item.id) {
        const details = document.createElement('div');
        details.className = 'guide-details';
        details.innerHTML = `
          <p>${item.descricao}</p>
          <div>
            <strong>Guia</strong>
            <ul>
              ${item.instrucoes
                .map(
                  (step) =>
                    `<li><strong>${step.passo}</strong><p>${step.info}</p></li>`
                )
                .join('')}
            </ul>
          </div>
          <div class="guide-links">
            <strong>Links</strong>
            <ul>
              ${item.links
                .map(
                  (link) =>
                    `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`
                )
                .join('')}
            </ul>
          </div>
        `;
        card.appendChild(details);
      }

      card.addEventListener('click', () => {
        state.selectedId = state.selectedId === item.id ? null : item.id;
        renderList();
      });

      listEl.appendChild(card);
    });
  };

  const setOpen = (value) => {
    state.open = value;
    if (!rootEl) {
      return;
    }
    rootEl.classList.toggle('open', state.open);
    rootEl.classList.toggle('closed', !state.open);
  };

  const mount = () => {
    if (mounted) {
      return;
    }

    root = document.createElement('div');
    root.id = ROOT_ID;
    root.style.position = 'fixed';
    root.style.top = '0';
    root.style.right = '0';
    root.style.width = '0';
    root.style.height = '0';
    root.style.zIndex = '2147483647';
    document.documentElement.appendChild(root);

    shadow = root.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      .guide-root {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 360px;
        transform: translateX(0);
        font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
        pointer-events: none;
      }
      .guide-panel {
        position: absolute;
        top: 0;
        right: 0;
        height: 100vh;
        width: 360px;
        background: #e8eae4;
        box-shadow: -6px 0 16px rgba(0,0,0,0.2);
        transform: translateX(0);
        transition: transform 0.2s ease;
        pointer-events: auto;
        overflow-y: auto;
        padding: 12px 14px 20px;
      }
      .guide-root.closed .guide-panel {
        transform: translateX(100%);
      }
      .guide-open {
        position: fixed;
        top: 16px;
        right: 16px;
        padding: 8px 14px;
        border-radius: 999px;
        border: none;
        background: #3698d4;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        pointer-events: auto;
      }
      .guide-root.closed .guide-open {
        display: block;
      }
      .guide-root.open .guide-open {
        display: none;
      }
      .guide-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .guide-close {
        border: none;
        background: #3698d4;
        color: #fff;
        border-radius: 6px;
        width: 28px;
        height: 28px;
        cursor: pointer;
      }
      .guide-header h1 {
        margin: 0;
        font-size: 18px;
        color: #122e40;
      }
      .guide-filters {
        display: grid;
        gap: 10px;
        margin-bottom: 12px;
      }
      .guide-select {
        padding: 8px 10px;
        border-radius: 12px;
        border: 1px solid #3698d4;
        background: #fff;
        color: #122e40;
      }
      .guide-search {
        display: flex;
        align-items: center;
        border: 1px solid #3698d4;
        border-radius: 16px;
        padding: 6px 10px;
        background: rgba(255,255,255,0.8);
      }
      .guide-input {
        border: none;
        outline: none;
        width: 100%;
        background: transparent;
        color: #122e40;
      }
      .guide-card {
        background: #ba0b32;
        color: #fff;
        border-radius: 12px;
        padding: 12px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .guide-card h3 {
        margin: 4px 0 6px;
        font-size: 16px;
      }
      .guide-card h4 {
        margin: 0 0 6px;
        font-size: 13px;
        font-weight: 600;
      }
      .guide-badge {
        color: #d0e5f2;
        font-weight: 700;
      }
      .guide-details {
        margin-top: 8px;
        background: rgba(255,255,255,0.08);
        border-radius: 8px;
        padding: 8px;
      }
      .guide-details p {
        margin: 6px 0;
        font-size: 13px;
      }
      .guide-links a {
        color: #f7a5bb;
        text-decoration: none;
      }
      .guide-links a:hover { text-decoration: underline; }
    </style>
    <div class="guide-root open">
      <button class="guide-open">Guia de chamados</button>
      <div class="guide-panel">
        <div class="guide-header">
          <button class="guide-close">x</button>
          <h1>Guia de chamados</h1>
        </div>
        <div class="guide-filters">
          <select class="guide-select">
            <option value="Todos">Todas as categorias</option>
            <option value="Processos">Processos</option>
            <option value="Sustentacao">Sustentacao</option>
            <option value="Cupom">Cupom</option>
          </select>
          <div class="guide-search">
            <input class="guide-input" placeholder="Pesquisa geral" />
          </div>
        </div>
        <div class="guide-list"></div>
      </div>
    </div>
  `;
    rootEl = shadow.querySelector('.guide-root');
    openBtn = shadow.querySelector('.guide-open');
    closeBtn = shadow.querySelector('.guide-close');
    listEl = shadow.querySelector('.guide-list');
    selectEl = shadow.querySelector('.guide-select');
    inputEl = shadow.querySelector('.guide-input');

    openBtn.addEventListener('click', () => setOpen(true));
    closeBtn.addEventListener('click', () => setOpen(false));
    selectEl.addEventListener('change', (event) => {
      state.category = event.target.value;
      renderList();
    });
    inputEl.addEventListener('input', (event) => {
      state.search = event.target.value;
      renderList();
    });

    setOpen(true);
    renderList();
    mounted = true;
  };

  const unmount = () => {
    if (!mounted) {
      return;
    }
    if (root && root.parentNode) {
      root.parentNode.removeChild(root);
    }
    root = null;
    shadow = null;
    rootEl = null;
    openBtn = null;
    closeBtn = null;
    listEl = null;
    selectEl = null;
    inputEl = null;
    mounted = false;
  };

  const toggle = () => {
    if (mounted) {
      unmount();
    } else {
      mount();
    }
  };

  window.__guideOverlay = {
    mount,
    unmount,
    toggle,
    isMounted: () => mounted
  };
})();
