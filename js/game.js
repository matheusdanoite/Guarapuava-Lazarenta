document.addEventListener('DOMContentLoaded', () => {

    if (document.body.classList.contains('divine-scene')) {
        const divineLight = document.createElement('div');
        divineLight.id = 'divine-light';
        document.body.appendChild(divineLight);
    }
    
    const isGamePage = document.body.classList.contains('game-screen1') ||
                       document.body.classList.contains('game-screen2') ||
                       document.body.classList.contains('game-screen3') ||
                       document.body.classList.contains('game-screen4');

    if (isGamePage) {
        
        const currentPath = window.location.pathname.split("/").pop();
        let meltPercent = parseInt(localStorage.getItem('meltPercentage') || '0');

        switch(currentPath) {
            case '1.html':
                meltPercent = 0;
                break;
            case '13.html':
                meltPercent = 25;
                break;
            case '14.html':
                meltPercent = 50;
                break;
            case '15.html':
                meltPercent = 75;
                break;
            case '16.html':
                meltPercent = 99;
                const snowmanSprite = document.querySelector('img[src="imagens/sprite1.png"]');
                if (snowmanSprite) {
                    startMeltingEffect(snowmanSprite);
                }
                break;
            case '17.html':
                meltPercent = 100;
                break;
            case '18.html':
                meltPercent = 100;
                break;
            default:
                meltPercent += 1;
        }

        if (meltPercent > 100) meltPercent = 100;
        localStorage.setItem('meltPercentage', meltPercent.toString()); 

        const meltIndicatorContainer = document.createElement('div');
        meltIndicatorContainer.id = 'melt-indicator-container';
        meltIndicatorContainer.innerHTML = `
            <span id="melt-indicator-text">Derretendo: ${meltPercent}%</span>
            <div id="melt-indicator-bar-background">
                <div id="melt-indicator-bar-fill"></div>
            </div>
        `;

        const containerDiv = document.querySelector('.container');
        if (containerDiv) {
            containerDiv.appendChild(meltIndicatorContainer);
        }

        const fillBar = document.getElementById('melt-indicator-bar-fill');
        if (fillBar) {
            fillBar.style.width = meltPercent + '%';
            if (meltPercent > 75) {
                fillBar.style.backgroundColor = '#d93636'; 
            } else if (meltPercent > 40) {
                fillBar.style.backgroundColor = '#ff9a3b'; 
            }
        }
    }
    const userForm = document.getElementById('user-form');
    const userInfoDiv = document.getElementById('userInfo');
    const eyelidTop = document.getElementById('eyelid-top');
    const dialogParas = document.querySelectorAll('.dialog-box p');

    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const nome = document.getElementById('nome').value;
            const bairro = document.getElementById('bairro').value;
            const senha = document.getElementById('senha').value;
            const frio = document.getElementById('frio').value;
            const calor = document.getElementById('calor').value;
            const vento = document.getElementById('vento').value;

            const userData = {
                nome: nome,
                bairro: bairro,
                senha: senha,
                frio: frio,
                calor: calor,
                vento: vento
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = this.action;
        });
    } 
    
    else if (userInfoDiv) {
        const userDataString = localStorage.getItem('userData');
        let mensagem = '';

        if (userDataString) {
            const userData = JSON.parse(userDataString);

            const apiKey = 'API_CHAVE';

            const bairroMap = {
                'alto_da_xv': 'Alto da XV, Guarapuava, PR',
                'batel': 'Batel, Guarapuava, PR',
                'bonsucesso': 'Bonsucesso, Guarapuava, PR',
                'boqueirao': 'Boqueirão, Guarapuava, PR',
                'cascavel': 'Cascavel, Guarapuava, PR',
                'centro': 'Centro, Guarapuava, PR',
                'cidade_dos_lagos': 'Cidade dos Lagos, Guarapuava, PR',
                'conradinho': 'Conradinho, Guarapuava, PR',
                'estados': 'Dos Estados, Guarapuava, PR',
                'industrial': 'Industrial, Guarapuava, PR',
                'americas': 'Jardim das Américas, Guarapuava, PR',
                'jordao': 'Jordão, Guarapuava, PR',
                'morro_alto': 'Morro Alto, Guarapuava, PR',
                'primavera': 'Primavera, Guarapuava, PR',
                'santa_cruz': 'Santa Cruz, Guarapuava, PR',
                'santana': 'Santana, Guarapuava, PR',
                'sao_cristovao': 'São Cristóvão, Guarapuava, PR',
                'trianon': 'Trianon, Guarapuava, PR',
                'vila_bela': 'Vila Bela, Guarapuava, PR',
                'vila_carli': 'Vila Carli, Guarapuava, PR',
                'outro': 'Guarapuava, PR'
            };

            const searchTerm = bairroMap[userData.bairro] || 'Guarapuava, PR';
            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(searchTerm)}&zoom=15&size=640x640&maptype=satellite&style=feature:all|element:labels|visibility:off&key=${apiKey}`;

            if (apiKey !== 'COLE_SUA_CHAVE_DA_API_AQUI') {
                document.body.style.backgroundImage = `url('${mapUrl}')`;
                document.body.classList.add('map-background');
            }

            const frioVal = parseInt(userData.frio, 10);
            const calorVal = parseInt(userData.calor, 10);
            const ventoVal = parseInt(userData.vento, 10);
            let preferencia = '';

            if (frioVal >= calorVal && frioVal >= ventoVal) {
                preferencia = 'frio';
            } else if (calorVal >= frioVal && calorVal >= ventoVal) {
                preferencia = 'calor';
            } else {
                preferencia = 'vento';
            }

            const bairroFormatado = userData.bairro.replace(/_/g, ' ');
            mensagem = `Olá ${userData.nome}, parece que você mora no bairro ${bairroFormatado}, seu segredo da vez é que ${userData.senha}, e você gosta mais de ${preferencia}.`;
            
        } else {
            mensagem = 'Nenhuma informação encontrada. Por favor, preencha o formulário primeiro.';
        }

        const p = document.createElement('p');
        userInfoDiv.appendChild(p);
        typeWriter(p, mensagem, 30, null);
    } 

    else if (eyelidTop) {
        const eyelidBottom = document.getElementById('eyelid-bottom');
        const whiteFadeScreen = document.getElementById('white-fade-screen');

        setTimeout(() => {
            eyelidTop.style.height = '0';
            eyelidBottom.style.height = '0';
        }, 500); 

        setTimeout(() => {
            if (whiteFadeScreen) {
                whiteFadeScreen.style.opacity = '0';
            }
        }, 3000); 

        setTimeout(() => {
            if (whiteFadeScreen) {
                whiteFadeScreen.style.display = 'none';
            }
        }, 4500); 
    }

    else if (dialogParas.length > 0) {
        startTypewriterLogic(dialogParas);
    }
});

function startTypewriterLogic(dialogParas) {
    if (!dialogParas || dialogParas.length === 0) return;
    const texts = [];
    dialogParas.forEach(p => { texts.push(p.innerText); });
    dialogParas.forEach(p => { p.innerHTML = ''; });
    const targetElement = dialogParas[0];
    let currentTextIndex = 0;
    const speed = 30;
    function typeNextLine() {
        if (currentTextIndex < texts.length) {
            if (currentTextIndex > 0) {
                targetElement.innerHTML += '<br><br>';
            }
            const textToType = texts[currentTextIndex];
            currentTextIndex++; 
            typeWriter(targetElement, textToType, speed, typeNextLine);
        }
    }
    typeNextLine();
}

function typeWriter(element, text, speed, callback) {
    const span = document.createElement('span');
    element.appendChild(span);
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            span.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) {
                callback();
            }
        }
    }, speed);
}

function startMeltingEffect(spriteElement) {
    const wrapper = document.createElement('div');
    wrapper.className = 'melting-sprite-container';
    
    spriteElement.className = 'melting-sprite';

    if (spriteElement.parentNode.classList.contains('sprite-area')) {
        spriteElement.parentNode.insertBefore(wrapper, spriteElement);
        wrapper.appendChild(spriteElement);
    } else {
        spriteElement.parentNode.insertBefore(wrapper, spriteElement);
        wrapper.appendChild(spriteElement);
    }

    setInterval(() => {
        const allDrips = wrapper.querySelectorAll('.drip');
        allDrips.forEach(drip => {
            let currentTop = parseFloat(drip.dataset.top || '0');
            
            const speed = parseFloat(drip.dataset.speed || '3');
            
            currentTop += speed;

            drip.style.transform = `translateY(${currentTop}px)`;
            drip.dataset.top = currentTop;

            if (currentTop > 180) {
                drip.remove();
            }
        });
    }, 30); 

    setInterval(() => {
        const drip = document.createElement('div');
        drip.className = 'drip';

        const randomLeft = Math.random() * 60 + 20;
        drip.style.left = randomLeft + '%';

        const randomSpeed = Math.random() * 2 + 2;
        drip.dataset.speed = randomSpeed;
        
        drip.dataset.top = '0'; 

        wrapper.appendChild(drip);
    }, 300);
}