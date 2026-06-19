// ============================================
// ARQUIVO: script.js
// TODAS AS FUNÇÕES DE NAVEGAÇÃO E INTERAÇÃO
// ============================================

// ============================================
// FUNÇÃO PARA NAVEGAR CORRETAMENTE NO GITHUB PAGES
// ============================================
function navigateTo(url) {
    console.log('🔗 Navegando para:', url);
    console.log('📍 URL atual:', window.location.href);
    
    // Se estiver no GitHub Pages
    if (window.location.hostname === 'thaisdmota.github.io') {
        // Pega o caminho base (ex: /musicstack/ ou /MusicStackIHC/)
        const path = window.location.pathname;
        const baseMatch = path.match(/^\/[^\/]+\//);
        if (baseMatch) {
            // Remove a barra inicial do url se tiver
            const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
            const destino = baseMatch[0] + cleanUrl;
            console.log('✅ Navegando para (GitHub Pages):', destino);
            window.location.href = destino;
            return;
        }
    }
    // Fallback: navegação normal
    console.log('✅ Navegando para (fallback):', url);
    window.location.href = url;
}

/**
 * Função para voltar à página anterior
 */
function goBack(url) {
    navigateTo(url);
}

// ============================================
// 1. PÁGINA INICIAL (paginainicial.html)
// ============================================
function initPaginaInicial() {
    console.log('🏠 Inicializando Página Inicial...');
    
    const heroCta = document.querySelector('.hero-cta');
    console.log('🔍 Hero CTA:', heroCta);
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🚀 EXPLORAR clicado!');
            navigateTo('detalhesdisco.html');
        });
    }
    
    const cartButton = document.querySelector('.cart-button');
    console.log('🔍 Botão carrinho (header):', cartButton);
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🛒 Carrinho (header) clicado!');
            navigateTo('index.html');
        });
    }
    
    const bottomCart = document.querySelector('.bottom-nav__item[href="../index.html"]');
    console.log('🔍 Bottom nav cart:', bottomCart);
    if (bottomCart) {
        bottomCart.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🛒 Carrinho (bottom nav) clicado!');
            navigateTo('index.html');
        });
    }
}

// ============================================
// 2. DETALHES DO DISCO (detalhesdisco.html)
// ============================================
function initDetalhesDisco() {
    console.log('💿 Inicializando Detalhes do Disco...');
    
    const goToHome = () => {
        console.log('⬅️ Voltando para página inicial');
        navigateTo('paginainicial.html');
    };

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
    
    const cartLink = document.querySelector('.cart-link');
    console.log('🔍 Cart link:', cartLink);
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🛒 Carrinho clicado!');
            navigateTo('index.html');
        });
    }
}

// ============================================
// 3. CARRINHO (index.html) - CORRIGIDO COM LOGS
// ============================================
function initCarrinho() {
    console.log('🛒 Inicializando Carrinho...');
    console.log('📍 Página atual:', window.location.href);
    
    // IR PARA CHECKOUT → resumo.html
    const checkoutBtn = document.querySelector('.checkout-button');
    console.log('🔍 Botão checkout encontrado?', checkoutBtn);
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🛒 IR PARA CHECKOUT clicado!');
            navigateTo('resumo.html');
        });
    } else {
        console.log('❌ ERRO: Botão checkout NÃO encontrado! Verifique se a classe .checkout-button existe no HTML.');
    }
    
    // VOLTAR → detalhesdisco.html
    const backButton = document.querySelector('.icon-button');
    console.log('🔍 Botão voltar encontrado?', backButton);
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('⬅️ VOLTAR clicado!');
            navigateTo('detalhesdisco.html');
        });
    } else {
        console.log('❌ ERRO: Botão voltar NÃO encontrado! Verifique se a classe .icon-button existe no HTML.');
    }

    // Botões de quantidade (- e +)
    const qtyButtons = document.querySelectorAll('.qty-button');
    console.log('🔍 Botões de quantidade encontrados:', qtyButtons.length);
    
    qtyButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log(`➕ Botão quantidade ${index} clicado!`);
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
                console.log('💾 Preço base salvo:', basePrice);
            }
            
            // Aumentar ou diminuir
            if (this.classList.contains('qty-button--plus')) {
                qty++;
                console.log('➕ Aumentando quantidade para:', qty);
            } else {
                if (qty > 1) {
                    qty--;
                    console.log('➖ Diminuindo quantidade para:', qty);
                } else {
                    console.log('⚠️ Quantidade mínima é 1');
                }
            }
            
            // Atualizar quantidade
            qtyElement.textContent = qty;
            
            // Calcular novo preço
            const newPrice = basePrice * qty;
            priceElement.textContent = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
            console.log('💰 Novo preço:', priceElement.textContent);
            
            // Atualizar subtotal
            updateSubtotal();
        });
    });
    
    // Inicializar data-base para cada item
    document.querySelectorAll('.item-actions').forEach((itemActions, index) => {
        const priceElement = itemActions.querySelector('strong');
        const qtyElement = itemActions.querySelector('.qty-number');
        const qty = parseInt(qtyElement.textContent);
        const currentPrice = parseFloat(priceElement.textContent.replace('R$ ', '').replace(',', '.'));
        const basePrice = currentPrice / qty;
        priceElement.setAttribute('data-base', basePrice);
        console.log(`📦 Item ${index+1}: preço base = R$ ${basePrice.toFixed(2)}`);
    });
    
    console.log('✅ Carrinho inicializado com sucesso!');
}

/**
 * Atualiza o subtotal e total no carrinho
 */
function updateSubtotal() {
    console.log('🔄 Atualizando subtotal...');
    
    const prices = document.querySelectorAll('.item-actions strong');
    let total = 0;
    prices.forEach(price => {
        const value = parseFloat(price.textContent.replace('R$ ', '').replace(',', '.'));
        if (!isNaN(value)) {
            total += value;
        }
    });
    console.log('💰 Total dos itens:', total);
    
    const subtotalElement = document.querySelector('.summary-line:first-child strong');
    const totalElement = document.querySelector('.summary-line--total strong');
    const itemCount = document.querySelector('.section-heading span');
    
    // Atualizar número de itens (soma total de unidades)
    if (itemCount) {
        let totalItems = 0;
        document.querySelectorAll('.qty-number').forEach(el => {
            totalItems += parseInt(el.textContent);
        });
        itemCount.textContent = `${totalItems} ITENS`;
        console.log('📊 Total de itens:', totalItems);
    }
    
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        console.log('💰 Subtotal atualizado:', subtotalElement.textContent);
    }
    
    if (totalElement) {
        const shipping = 25.00;
        const totalWithShipping = total + shipping;
        totalElement.textContent = `R$ ${totalWithShipping.toFixed(2).replace('.', ',')}`;
        console.log('💰 Total com frete:', totalElement.textContent);
    }
}

// ============================================
// 4. RESUMO (resumo.html)
// ============================================
function initResumo() {
    console.log('📋 Inicializando Resumo...');
    
    const checkoutBtn = document.querySelector('.checkout-button');
    console.log('🔍 Botão finalizar compra:', checkoutBtn);
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            console.log('✅ FINALIZAR COMPRA clicado!');
            navigateTo('endereco.html');
        });
    }
    
    const backButton = document.querySelector('.back-button');
    console.log('🔍 Botão voltar:', backButton);
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('⬅️ VOLTAR clicado!');
            navigateTo('index.html');
        });
    }
    
    document.querySelectorAll('.info-card__header button').forEach((btn) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.info-card');
            if (card.classList.contains('payment-card')) {
                console.log('✏️ EDITAR Pagamento clicado!');
                navigateTo('pagamento.html');
            } else if (card.classList.contains('shipping-card')) {
                console.log('✏️ EDITAR Endereço clicado!');
                navigateTo('endereco.html');
            }
        });
    });
}

// ============================================
// 5. ENDEREÇO (endereco.html)
// ============================================
function initEndereco() {
    console.log('📍 Inicializando Endereço...');
    
    const checkoutLink = document.querySelector('.checkout-link');
    console.log('🔍 Link para pagamento:', checkoutLink);
    if (checkoutLink) {
        checkoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💳 IR PARA PAGAMENTO clicado!');
            navigateTo('pagamento.html');
        });
    }
    
    const backButton = document.querySelector('.back-button');
    console.log('🔍 Botão voltar:', backButton);
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('⬅️ VOLTAR clicado!');
            navigateTo('resumo.html');
        });
    }
    
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
                console.log('📦 Método de entrega selecionado:', price);
            }
        });
    });
}

// ============================================
// 6. PAGAMENTO (pagamento.html)
// ============================================
function initPagamento() {
    console.log('💳 Inicializando Pagamento...');
    
    const nextButton = document.querySelector('.footer-action__button--next');
    console.log('🔍 Botão avançar:', nextButton);
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            console.log('▶️ AVANÇAR clicado!');
            navigateTo('confirmacao.html');
        });
    }
    
    const backButtons = document.querySelectorAll('.back-button, .footer-action__button--back');
    console.log('🔍 Botões voltar:', backButtons.length);
    backButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            console.log('⬅️ VOLTAR clicado!');
            navigateTo('endereco.html');
        });
    });
    
    document.querySelectorAll('.payment-method').forEach((method) => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('payment-method--active');
            });
            this.classList.add('payment-method--active');
            console.log('💳 Método de pagamento selecionado:', this.querySelector('span:last-child').textContent);
        });
    });
}

// ============================================
// 7. CONFIRMAÇÃO (confirmacao.html)
// ============================================
function initConfirmacao() {
    console.log('🎉 Inicializando Confirmação...');
    
    const ctaLink = document.querySelector('.confirmation-cta');
    console.log('🔍 Link PÁGINA INICIAL:', ctaLink);
    if (ctaLink) {
        ctaLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🏠 PÁGINA INICIAL clicado!');
            navigateTo('paginainicial.html');
        });
    }
    
    const backButton = document.querySelector('.back-button');
    console.log('🔍 Botão voltar:', backButton);
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('⬅️ VOLTAR clicado!');
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
    console.log('📍 URL completa:', window.location.href);
    console.log('🔍 Pathname:', window.location.pathname);
    
    switch(currentPage) {
        case 'paginainicial.html':
        case '':
            console.log('🏠 Executando initPaginaInicial()');
            initPaginaInicial();
            break;
        case 'detalhesdisco.html':
            console.log('💿 Executando initDetalhesDisco()');
            initDetalhesDisco();
            break;
        case 'index.html':
            console.log('🛒 Executando initCarrinho()');
            initCarrinho();
            break;
        case 'resumo.html':
            console.log('📋 Executando initResumo()');
            initResumo();
            break;
        case 'endereco.html':
            console.log('📍 Executando initEndereco()');
            initEndereco();
            break;
        case 'pagamento.html':
            console.log('💳 Executando initPagamento()');
            initPagamento();
            break;
        case 'confirmacao.html':
            console.log('🎉 Executando initConfirmacao()');
            initConfirmacao();
            break;
        default:
            console.log('⚠️ Página não identificada:', currentPage);
            console.log('📌 Tente acessar: index.html, resumo.html, etc.');
    }
});

console.log('✅ script.js carregado com sucesso!');
console.log('📌 Versão com logs de debug - ' + new Date().toLocaleString());
