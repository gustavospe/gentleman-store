document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('produtos-container');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  function renderProdutos(produtos) {
    container.innerHTML = '';
    if (!produtos.length) {
      container.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }
    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.style = "width:260px;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:24px;display:flex;flex-direction:column;align-items:center;gap:16px;";
      card.innerHTML = `
        <img src="assets/produtos/${produto.imagem}" alt="${produto.nome}" style="width:180px;height:180px;object-fit:contain;">
        <h3 style="margin:0;font-size:1.1rem;text-align:center;">${produto.nome}</h3>
        <p style="margin:0;font-weight:bold;font-size:1.2rem;">R$ ${produto.valor.toFixed(2)}</p>
        <p style="margin:0;color:${produto.estoque > 0 ? '#2a8c2a' : '#c00'};">
          ${produto.estoque > 0 ? `${produto.estoque} unidade(s) disponiveis` : 'Esgotado'}
        </p>
        <button class="add-carrinho-btn${produto.estoque < 1 ? ' esgotado' : ''}" data-id="${produto.id}" ${produto.estoque < 1 ? 'disabled' : ''}>
          ${produto.estoque > 0 ? 'Adicionar ao carrinho' : 'Esgotado'}
        </button>
      `;
      container.appendChild(card);
    });

    // Adiciona eventos aos botões
    document.querySelectorAll('.add-carrinho-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.target.getAttribute('data-id'));
        fetch('/api/produtos')
          .then(res => res.json())
          .then(produtos => {
            const produto = produtos.find(p => p.id === id);
            if (!produto || produto.estoque < 1) {
              alert('Produto esgotado!');
              return;
            }
            adicionarAoCarrinho(id);
          });
      });
    });
  }

  function fetchProdutos(url) {
    fetch(url)
      .then(res => res.json())
      .then(renderProdutos)
      .catch(() => {
        container.innerHTML = '<p>Erro ao carregar produtos.</p>';
      });
  }

  // Busca inicial
  fetchProdutos('/api/produtos');

  // Busca por termo
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const term = searchInput.value.trim();
    if (term) {
      fetchProdutos(`/api/produtos/search/${encodeURIComponent(term)}`);
    } else {
      fetchProdutos('/api/produtos');
    }
  });

  // Carrinho
  function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho') || '[]');
  }

  function setCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  function adicionarAoCarrinho(id) {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(produtos => {
        const produto = produtos.find(p => p.id === id);
        if (!produto || produto.estoque < 1) {
          alert('Produto sem estoque!');
          return;
        }
        let carrinho = getCarrinho();
        const item = carrinho.find(item => item.id === id);
        if (item) {
          if (item.qtd < produto.estoque) {
            item.qtd += 1;
          } else {
            alert('Quantidade máxima em estoque atingida!');
            return;
          }
        } else {
          carrinho.push({ id, qtd: 1 });
        }
        setCarrinho(carrinho);
        alert('Produto adicionado ao carrinho!');
        atualizarBotaoCarrinho();
      });
  }

  function atualizarBotaoCarrinho() {
    let btn = document.getElementById('ver-carrinho-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'ver-carrinho-btn';
      btn.textContent = 'Ver carrinho';
      btn.style = "position:fixed;bottom:24px;right:24px;z-index:1000;background:#bfa14a;color:#fff;padding:16px 24px;border:none;border-radius:8px;font-size:1.1rem;box-shadow:0 2px 12px rgba(0,0,0,0.13);cursor:pointer;";
      btn.addEventListener('click', mostrarCarrinho);
      document.body.appendChild(btn);
    }
    const carrinho = getCarrinho();
    btn.textContent = `Ver carrinho (${carrinho.reduce((a, b) => a + b.qtd, 0)})`;
  }

  function mostrarCarrinho() {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(produtos => {
        const carrinho = getCarrinho();
        const carrinhoSection = document.getElementById('carrinho-section');
        const carrinhoContent = document.getElementById('carrinho-content');
        if (!carrinho.length) {
          carrinhoContent.innerHTML = '<p>Carrinho vazio!</p>';
        } else {
          let html = '<h2 style="margin-top:0;">Carrinho de compras</h2><ul class="carrinho-list">';
          let total = 0;
          carrinho.forEach(item => {
            const prod = produtos.find(p => p.id === item.id);
            if (prod) {
              html += `
                <li>
                  <img src="assets/produtos/${prod.imagem}" alt="${prod.nome}">
                  <span class="carrinho-nome">${prod.nome}</span>
                  <span class="carrinho-qtd">
                    <button class="menos-qtd" data-id="${prod.id}" ${item.qtd <= 1 ? 'disabled' : ''}>-</button>
                    <span>${item.qtd}</span>
                    <button class="mais-qtd" data-id="${prod.id}" ${item.qtd >= prod.estoque ? 'disabled' : ''}>+</button>
                  </span>
                  <span class="carrinho-preco">R$ ${(prod.valor * item.qtd).toFixed(2)}</span>
                </li>
              `;
              total += prod.valor * item.qtd;
            }
          });
          html += `</ul><p style="font-weight:bold;font-size:1.1rem;text-align:right;">Total: R$ ${total.toFixed(2)}</p>`;
          html += `
            <button id="finalizar-compra-btn" style="background:#2a8c2a;color:#fff;padding:12px 20px;border:none;border-radius:6px;font-size:1rem;cursor:pointer;margin-top:16px;">
              Finalizar Compra
            </button>
            <button id="fechar-carrinho-btn" style="margin-left:12px;padding:12px 20px;border:none;border-radius:6px;font-size:1rem;cursor:pointer;">
              Fechar
            </button>`;
          carrinhoContent.innerHTML = html;
        }
        carrinhoSection.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
          const finalizarBtn = document.getElementById('finalizar-compra-btn');
          if (finalizarBtn) {
            finalizarBtn.addEventListener('click', () => {
              if (confirm('Deseja realmente finalizar a compra?')) {
                setCarrinho([]);
                carrinhoSection.style.display = 'none';
                atualizarBotaoCarrinho();
                alert('Compra finalizada com sucesso!');
              }
            });
          }
        }, 0);


        // Eventos de fechar
        document.getElementById('fechar-carrinho-btn')?.addEventListener('click', () => {
          carrinhoSection.style.display = 'none';
        });

        // Eventos de quantidade
        carrinhoContent.querySelectorAll('.mais-qtd').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = Number(this.getAttribute('data-id'));
            let carrinho = getCarrinho();
            const item = carrinho.find(i => i.id === id);
            const prod = produtos.find(p => p.id === id);
            if (item && prod && item.qtd < prod.estoque) {
              item.qtd += 1;
              setCarrinho(carrinho);
              mostrarCarrinho();
              atualizarBotaoCarrinho();
            }
          });
        });
        carrinhoContent.querySelectorAll('.menos-qtd').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = Number(this.getAttribute('data-id'));
            let carrinho = getCarrinho();
            const item = carrinho.find(i => i.id === id);
            if (item && item.qtd > 1) {
              item.qtd -= 1;
              setCarrinho(carrinho);
              mostrarCarrinho();
              atualizarBotaoCarrinho();
            }
          });
        });
      });
  }

  // Inicializa botão do carrinho ao carregar
  atualizarBotaoCarrinho();

  document.querySelectorAll('.menu a[data-categoria]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const categoria = this.getAttribute('data-categoria');
      if (categoria === 'todos') {
        fetchProdutos('/api/produtos');
        history.replaceState(null, '', '/');
      } else {
        fetchProdutos(`/api/produtos/categoria/${categoria}`);
        history.replaceState(null, '', `/?categoria=${categoria}`);
      }
    });
  });

  // Ao carregar, verifica se tem categoria na URL
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');
  if (categoria && categoria !== 'todos') {
    fetchProdutos(`/api/produtos/categoria/${categoria}`);
  }
});
