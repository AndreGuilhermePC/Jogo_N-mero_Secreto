let listaDeNumerosSorteados = [];
let numeroDeElementos = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 50!'); 
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolido = parseInt(Math.random() * numeroDeElementos + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(numeroEscolido == quantidadeDeElementosNaLista){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolido);
        return numeroEscolido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'PARABÉNS, ACERTOU!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas!' : 'tentativa!';
        let textoParagrafo = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', textoParagrafo);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
           exibirTextoNaTela('p', 'Chute é menor que o número secreto!!');
        }else{
            exibirTextoNaTela('p', 'Chute é maior que o número secreto!!');
        }
    tentativas++;
    limparCampo();
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas++;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

