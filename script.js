// ============================================
// ARQUIVO: script.js
// TODAS AS FUNÇÕES DE NAVEGAÇÃO E INTERAÇÃO
// ============================================

/**
 * Função para navegar entre páginas
 * @param {string} url - URL da página destino
 */
function navigateTo(url) {
    window.location.href = url;
}

/**
 * Função para voltar à página anterior
 * @param {string} url - URL da página anterior
 */
function goBack(url) {
    window.location.href = url;
}

// ============================================
// 1. PÁGINA INICIAL (paginainicial.html)
// ============================================
function initPaginaInicial() {
    // EXPLORAR (hero) → detalhesdisco.html
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('detalhesdisco.html');
        });
    }
    
    // CARRINHO (header) → index.html
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('index.html');
        });
    }
    
    // Bottom-nav CART → index.html
    const bottomCart = document.querySelector('.bottom-nav__item[href="../index.html"]');
    if (bottomCart) {
        bottomCart.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('index.html');
        });
    }
}

// ============================================
// 2. DETALHES DO DISCO (detalhesdisco.html)
// ============================================
function initDetalhesDisco() {
    const goToHome = () => navigateTo('paginainicial.html');

    const backSelectors = [
        '.back-button',
        '.details-actions__back',
        '.details-back-row'
    ];

    backSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener('click', goToHome);
        });
    });
    
    // CARRINHO → index.html
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('index.html');
        });
    }
}

// ============================================
// 3. CARRINHO (index.html) - CORRIGIDO
// ============================================
function initCarrinho() {
    // IR PARA CHECKOUT → resumo.html
    const checkoutBtn = document.querySelector('.checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            navigateTo('resumo.html');
        });
    }
    
    // VOLTAR → detalhesdisco.html
    const backButton = document.querySelector('.icon-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('detalhesdisco.html');
        });
    }

    // Botões de quantidade (- e +)
    document.querySelectorAll('.qty-button').forEach((btn) => {
        btn.addEventListener('click', function() {
            const itemActions = this.closest('.item-actions');
            const qtyElement = itemActions.querySelector('.qty-number');
            const priceElement = itemActions.querySelector('strong');
            
            // Pegar a quantidade atual
            let qty = parseInt(qtyElement.textContent);
            
            // Pegar o preço BASE (salvo no data-base ou calcular do preço atual / quantidade)
            let basePrice = parseFloat(priceElement.getAttribute('data-base'));
            
            // Se não tiver data-base, calcular a partir do preço atual
            if (!basePrice || isNaN(basePrice)) {
                const currentPrice = parseFloat(priceElement.textContent.replace('R$ ', '').replace(',', '.'));
                basePrice = currentPrice / qty;
                // Salvar o preço base
                priceElement.setAttribute('data-base', basePrice);
            }
            
            // Aumentar ou diminuir
            if (this.classList.contains('qty-button--plus')) {
                qty++;
            } else {
                if (qty > 1) {
                    qty--;
                }
            }
            
            // Atualizar quantidade
            qtyElement.textContent = qty;
            
            // Calcular novo preço
            const newPrice = basePrice * qty;
            priceElement.textContent = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
            
            // Atualizar subtotal
            updateSubtotal();
        });
    });
    
    // Inicializar data-base para cada item
    document.querySelectorAll('.item-actions').forEach((itemActions) => {
        const priceElement = itemActions.querySelector('strong');
        const qtyElement = itemActions.querySelector('.qty-number');
        const qty = parseInt(qtyElement.textContent);
        const currentPrice = parseFloat(priceElement.textContent.replace('R$ ', '').replace(',', '.'));
        const basePrice = currentPrice / qty;
        priceElement.setAttribute('data-base', basePrice);
    });
}

/**
 * Atualiza o subtotal e total no carrinho
 */
function updateSubtotal() {
    const prices = document.querySelectorAll('.item-actions strong');
    let total = 0;
    prices.forEach(price => {
        const value = parseFloat(price.textContent.replace('R$ ', '').replace(',', '.'));
        if (!isNaN(value)) {
            total += value;
        }
    });
    
    const subtotalElement = document.querySelector('.summary-line:first-child strong');
    const totalElement = document.querySelector('.summary-line--total strong');
    const itemCount = document.querySelector('.section-heading span');
    
    // Atualizar número de itens
    if (itemCount) {
        const totalItems = document.querySelectorAll('.qty-number').length;
        itemCount.textContent = `${totalItems} ITENS`;
    }
    
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    if (totalElement) {
        const shipping = 25.00;
        const totalWithShipping = total + shipping;
        totalElement.textContent = `R$ ${totalWithShipping.toFixed(2).replace('.', ',')}`;
    }
}
function updateSubtotal() {
    const prices = document.querySelectorAll('.item-actions strong');
    let total = 0;
    prices.forEach(price => {
        const value = parseFloat(price.textContent.replace('R$ ', '').replace(',', '.'));
        total += value;
    });
    
    const subtotalElement = document.querySelector('.summary-line:first-child strong');
    const totalElement = document.querySelector('.summary-line--total strong');
    
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    if (totalElement) {
        const shipping = 25.00;
        const totalWithShipping = total + shipping;
        totalElement.textContent = `R$ ${totalWithShipping.toFixed(2).replace('.', ',')}`;
    }
}

// ============================================
// 4. RESUMO (resumo.html)
// ============================================
function initResumo() {
    // FINALIZAR COMPRA → endereco.html
    const checkoutBtn = document.querySelector('.checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            navigateTo('endereco.html');
        });
    }
    
    // VOLTAR → index.html
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('index.html');
        });
    }
    
    // EDITAR Pagamento → pagamento.html
    // EDITAR Endereço → endereco.html
    document.querySelectorAll('.info-card__header button').forEach((btn) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.info-card');
            if (card.classList.contains('payment-card')) {
                navigateTo('pagamento.html');
            } else if (card.classList.contains('shipping-card')) {
                navigateTo('endereco.html');
            }
        });
    });
}

// ============================================
// 5. ENDEREÇO (endereco.html)
// ============================================
function initEndereco() {
    // IR PARA PAGAMENTO → pagamento.html
    const checkoutLink = document.querySelector('.checkout-link');
    if (checkoutLink) {
        checkoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('pagamento.html');
        });
    }
    
    // VOLTAR → resumo.html
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('resumo.html');
        });
    }
    
    // Seleção de método de entrega
    document.querySelectorAll('.shipping-option').forEach((option) => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.shipping-option').forEach(opt => {
                opt.classList.remove('shipping-option--active');
            });
            this.classList.add('shipping-option--active');
            
            const priceElement = this.querySelector('.shipping-option__row strong');
            const price = priceElement.textContent;
            const summaryShipping = document.querySelector('.summary-line--accent');
            if (summaryShipping) {
                summaryShipping.textContent = price;
            }
        });
    });
}

// ============================================
// 6. PAGAMENTO (pagamento.html)
// ============================================
function initPagamento() {
    // AVANÇAR → confirmacao.html
    const nextButton = document.querySelector('.footer-action__button--next');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            navigateTo('confirmacao.html');
        });
    }
    
    // VOLTAR (ambos os botões) → endereco.html
    const backButtons = document.querySelectorAll('.back-button, .footer-action__button--back');
    backButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            navigateTo('endereco.html');
        });
    });
    
    // Seleção de método de pagamento
    document.querySelectorAll('.payment-method').forEach((method) => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('payment-method--active');
            });
            this.classList.add('payment-method--active');
        });
    });
}

// ============================================
// 7. CONFIRMAÇÃO (confirmacao.html)
// ============================================
function initConfirmacao() {
    // PÁGINA INICIAL → paginainicial.html
    const ctaLink = document.querySelector('.confirmation-cta');
    if (ctaLink) {
        ctaLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('paginainicial.html');
        });
    }
    
    // VOLTAR → pagamento.html
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('pagamento.html');
        });
    }
}

// ============================================
// INICIALIZAÇÃO - Executa conforme a página atual
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('📄 Página atual:', currentPage);
    
    switch(currentPage) {
        case 'paginainicial.html':
        case '':
            initPaginaInicial();
            break;
        case 'detalhesdisco.html':
            initDetalhesDisco();
            break;
        case 'index.html':
            initCarrinho();
            break;
        case 'resumo.html':
            initResumo();
            break;
        case 'endereco.html':
            initEndereco();
            break;
        case 'pagamento.html':
            initPagamento();
            break;
        case 'confirmacao.html':
            initConfirmacao();
            break;
        default:
            console.log('⚠️ Página não identificada:', currentPage);
    }
});