function navigateTo(url) {
    console.log('🔗 Navegando para:', url);
    
    if (window.location.hostname === 'thaisdmota.github.io') {
        const path = window.location.pathname;
        const baseMatch = path.match(/^\/[^\/]+\//);
        if (baseMatch) {
            const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
            const destino = baseMatch[0] + cleanUrl;
            console.log('✅ Navegando para (GitHub Pages):', destino);
            window.location.href = destino;
            return;
        }
    }
    window.location.href = url;
}

// ============================================
// 1. PÁGINA INICIAL (index.html)
// ============================================
function initPaginaInicial() {
    console.log('🏠 Inicializando Página Inicial...');
    
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('detalhesdisco.html');
        });
    }
    
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('carrinho.html');
        });
    }
    
    const bottomCart = document.querySelector('.bottom-nav__item[href="carrinho.html"]');
    if (bottomCart) {
        bottomCart.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('carrinho.html');
        });
    }
}

// ============================================
// 2. DETALHES DO DISCO (detalhesdisco.html)
// ============================================
function initDetalhesDisco() {
    console.log('💿 Inicializando Detalhes do Disco...');
    
    const goToHome = () => navigateTo('index.html');
    
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
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('carrinho.html');
        });
    }
}

// ============================================
// 3. CARRINHO (carrinho.html) - CORRIGIDO
// ============================================
function initCarrinho() {
    console.log('🛒 Inicializando Carrinho...');
    
    // IR PARA CHECKOUT → resumo.html
    const checkoutBtn = document.querySelector('.checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('resumo.html');
        });
    }
    
    // VOLTAR → INDEX.HTML (página inicial)
    const backButton = document.querySelector('.icon-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('index.html');
        });
    }

    // INICIALIZAR data-base para cada item
    document.querySelectorAll('.item-actions').forEach((itemActions) => {
        const priceElement = itemActions.querySelector('strong');
        const qtyElement = itemActions.querySelector('.qty-number');
        const qty = parseInt(qtyElement.textContent);
        const currentPrice = parseFloat(priceElement.textContent.replace('R$ ', '').replace(',', '.'));
        const basePrice = currentPrice / qty;
        priceElement.setAttribute('data-base', basePrice);
        console.log(`📦 Item: preço base = R$ ${basePrice.toFixed(2)}`);
    });

    // Botões de quantidade
    const qtyButtons = document.querySelectorAll('.qty-button');
    console.log('🔍 Botões de quantidade encontrados:', qtyButtons.length);
    
    qtyButtons.forEach((btn) => {
        btn.removeEventListener('click', handleQuantityClick);
        btn.addEventListener('click', handleQuantityClick);
    });
    
    // Botão de aplicar cupom
    const couponBtn = document.querySelector('.coupon-row button');
    if (couponBtn) {
        couponBtn.addEventListener('click', function() {
            const input = document.querySelector('#coupon');
            const couponCode = input.value.trim().toUpperCase();
            
            if (couponCode === 'VIPGOLD') {
                const discountRow = document.querySelector('.summary-line--discount');
                const discountElement = discountRow ? discountRow.querySelector('strong') : null;
                
                if (discountElement) {
                    const subtotalElement = document.querySelector('.summary-line:first-child strong');
                    if (subtotalElement) {
                        const subtotal = parseFloat(subtotalElement.textContent.replace('R$ ', '').replace(',', '.'));
                        const discountAmount = subtotal * 0.10;
                        discountElement.textContent = `- R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
                        alert('✅ Cupom VIPGOLD aplicado com sucesso! Desconto de 10%');
                        updateSubtotal();
                    }
                }
            } else if (couponCode) {
                alert('❌ Cupom inválido. Tente VIPGOLD');
            } else {
                alert('⚠️ Por favor, insira um código de cupom');
            }
        });
    }
    
    console.log('✅ Carrinho inicializado com sucesso!');
}

// Função para manipular clique nos botões de quantidade
function handleQuantityClick() {
    console.log('🔄 Clique no botão de quantidade');
    const itemActions = this.closest('.item-actions');
    const qtyElement = itemActions.querySelector('.qty-number');
    const priceElement = itemActions.querySelector('strong');
    
    let qty = parseInt(qtyElement.textContent);
    let basePrice = parseFloat(priceElement.getAttribute('data-base'));
    
    if (!basePrice || isNaN(basePrice)) {
        const currentPrice = parseFloat(priceElement.textContent.replace('R$ ', '').replace(',', '.'));
        basePrice = currentPrice / qty;
        priceElement.setAttribute('data-base', basePrice);
    }
    
    if (this.classList.contains('qty-button--plus')) {
        qty++;
        console.log('➕ Aumentando para:', qty);
    } else {
        if (qty > 1) {
            qty--;
            console.log('➖ Diminuindo para:', qty);
        } else {
            console.log('⚠️ Quantidade mínima é 1');
            return;
        }
    }
    
    qtyElement.textContent = qty;
    const newPrice = basePrice * qty;
    priceElement.textContent = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
    console.log('💰 Novo preço:', priceElement.textContent);
    
    updateSubtotal();
}

// ============================================
// updateSubtotal - CORRIGIDO
// ============================================
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
    const discountElement = document.querySelector('.summary-line--discount strong');
    
    // Atualizar número de itens
    if (itemCount) {
        let totalItems = 0;
        document.querySelectorAll('.qty-number').forEach(el => {
            totalItems += parseInt(el.textContent);
        });
        itemCount.textContent = `${totalItems} ITENS`;
    }
    
    // Atualizar subtotal
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    // Calcular desconto (se existir)
    let discount = 0;
    if (discountElement) {
        const discountText = discountElement.textContent.replace('R$ ', '').replace(',', '.').trim();
        if (discountText && !isNaN(parseFloat(discountText))) {
            discount = parseFloat(discountText);
        }
    }
    
    // Calcular total final
    if (totalElement) {
        const shipping = 25.00;
        let totalFinal = total + shipping + discount;
        if (totalFinal < 0) totalFinal = 0;
        totalElement.textContent = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
    }
}

// ============================================
// 4. RESUMO (resumo.html)
// ============================================
function initResumo() {
    console.log('📋 Inicializando Resumo...');
    
    const checkoutBtn = document.querySelector('.checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            navigateTo('endereco.html');
        });
    }
    
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('carrinho.html');
        });
    }
    
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
    const checkoutLink = document.querySelector('.checkout-link');
    if (checkoutLink) {
        checkoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('pagamento.html');
        });
    }
    
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
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
            }
        });
    });
}

// ============================================
// 6. PAGAMENTO (pagamento.html)
// ============================================
function initPagamento() {
    const nextButton = document.querySelector('.footer-action__button--next');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            navigateTo('confirmacao.html');
        });
    }
    
    const backButtons = document.querySelectorAll('.back-button, .footer-action__button--back');
    backButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            navigateTo('endereco.html');
        });
    });
    
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
    const ctaLink = document.querySelector('.confirmation-cta');
    if (ctaLink) {
        ctaLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('index.html');
        });
    }
    
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            navigateTo('pagamento.html');
        });
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('📄 Página atual:', currentPage);
    
    switch(currentPage) {
        case 'index.html':
        case '':
            console.log('🏠 Executando initPaginaInicial()');
            initPaginaInicial();
            break;
        case 'detalhesdisco.html':
            console.log('💿 Executando initDetalhesDisco()');
            initDetalhesDisco();
            break;
        case 'carrinho.html':
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
    }
});

console.log('✅ script.js carregado com sucesso!');
