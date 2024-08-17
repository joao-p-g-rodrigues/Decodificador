const textArea = document.querySelector(".text-area");
const mensagem = document.querySelector(".mensagem");

// As "chaves" de criptografia que utilizaremos são:
// A letra "e" é convertida para "enter"
// A letra "i" é convertida para "imes"
// A letra "a" é convertida para "ai"
// A letra "o" é convertida para "ober"
// A letra "u" é convertida para "ufat"
// Deve funcionar apenas com letras minúsculas
// Não devem ser utilizados letras com acentos nem caracteres especiais
// Deve ser possível converter uma palavra para a versão criptografada e também retornar 
// uma palavra criptografada para a versão original.

function validarTexto(texto) {
    // Regex para permitir apenas letras minúsculas e espaços
    const regex = /^[a-z\s]*$/;
    return regex.test(texto);
}

function btnEncripitar() {
    const texto = textArea.value;

    if (!validarTexto(texto)) {
        alert("Por favor, insira apenas letras minúsculas sem acentos ou caracteres especiais.");
        return;
    }

    const textoEncriptado = encriptar(texto);

    mensagem.value = textoEncriptado;

    textArea.value = "";
    // Remover a imagem de fundo ao exibir o texto
    if (textoEncriptado) {
        mensagem.classList.add("com-texto");
        document.querySelector(".btn-copiar").classList.remove("oculto"); // Mostra o botão
    } else {
        mensagem.classList.remove("com-texto");
        document.querySelector(".btn-copiar").classList.add("oculto"); // Oculta o botão
    }
}

function encriptar(stringEncriptada) {

    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    // console.table(matrizCodigo);
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {

        if (stringEncriptada.includes(matrizCodigo[i][0])) {

            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);

        }
    }

    return stringEncriptada;

}

function btnDesencripitar() {
    const texto = textArea.value;

    if (!validarTexto(texto)) {
        alert("Por favor, insira apenas letras minúsculas sem acentos ou caracteres especiais.");
        return;
    }

    const textoDesencriptado = desencriptar(texto);

    mensagem.value = textoDesencriptado;

    textArea.value = "";
    // Remover a imagem de fundo ao exibir o texto
    if (textoDesencriptado) {
        mensagem.classList.add("com-texto");
        document.querySelector(".btn-copiar").classList.remove("oculto"); // Mostra o botão
    } else {
        mensagem.classList.remove("com-texto");
        document.querySelector(".btn-copiar").classList.add("oculto"); // Oculta o botão
    }

}

function desencriptar(stringDesencriptada) {

    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {

        if (stringDesencriptada.includes(matrizCodigo[i][1])) {

            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);

        }
    }

    return stringDesencriptada;

}

// function copiarTexto() {  
//     // Seleciona o texto na área de mensagem  
//     mensagem.select();   
//     // Copia o texto selecionado  
//     document.execCommand("copy");   
//     // Alerta ao usuário  
//     alert("Texto copiado para a área de transferência!");   
// }  
function copiarTexto() {
    navigator.clipboard.writeText(mensagem.value).then(() => {
        // Alterar o texto do botão para "Copiado!"
        const btnCopiar = document.querySelector(".btn-copiar");
        btnCopiar.textContent = "Copiado!";

        // Restaurar o texto original após 2 segundos
        setTimeout(() => {
            btnCopiar.textContent = "Copiar";

            // Limpar o campo de mensagem
            mensagem.value = "";

            // Restaurar a imagem de fundo
            mensagem.classList.remove("com-texto");
            
            // Ocultar o botão de copiar
            btnCopiar.classList.add("oculto");
        }, 2000);
    });
}