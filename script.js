var topo = document.getElementById("topo");
var links = document.getElementsByClassName("link-menu");
var secoes = document.getElementsByTagName("section");
var temaBotao = document.getElementById("temaBotao");
var bolinha = document.getElementById("bolinha");
var temaTexto = document.getElementById("temaTexto");

function aoRolar() {
  if (window.scrollY > 10) {
    topo.classList.add("rolou");
  } else {
    topo.classList.remove("rolou");
  }

  var atual = "";

  for (var i = 0; i < secoes.length; i++) {
    if (window.scrollY >= secoes[i].offsetTop - 150) {
      atual = secoes[i].id;
    }
  }

  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove("ativo");

    if (links[j].getAttribute("href") == "#" + atual) {
      links[j].classList.add("ativo");
    }
  }
}

window.onscroll = aoRolar;
aoRolar();

temaBotao.onclick = function () {
  document.body.classList.toggle("escuro");

  if (document.body.classList.contains("escuro")) {
    bolinha.innerHTML = "🌙";
    temaTexto.innerHTML = "Escuro";
  } else {
    bolinha.innerHTML = "☀️";
    temaTexto.innerHTML = "Claro";
  }
};

var frase = "Desenvolvedor Web em formação";
var posicao = 0;

function digitar() {
  document.getElementById("digitando").innerHTML = frase.substring(0, posicao);
  posicao = posicao + 1;

  if (posicao <= frase.length) {
    setTimeout(digitar, 80);
  }
}

digitar();

var modal = document.getElementById("modal");

function abrirModal(titulo, texto) {
  document.getElementById("modalTitulo").innerHTML = titulo;
  document.getElementById("modalTexto").innerHTML = texto;
  modal.classList.add("aberto");
}

document.getElementById("fecharModal").onclick = function () {
  modal.classList.remove("aberto");
};

document.getElementById("abrirModalProjeto").onclick = function () {
  abrirModal("Portfólio pessoal", "Site feito com HTML, CSS e JavaScript. Tem menu de navegação, modo claro e escuro e formulário de contato com máscaras.");
};

var nome = document.getElementById("nome");
var telefone = document.getElementById("telefone");
var email = document.getElementById("email");
var mensagem = document.getElementById("mensagem");

nome.oninput = function () {
  var texto = "";

  for (var i = 0; i < nome.value.length; i++) {
    var letra = nome.value[i];

    if (isNaN(letra) || letra == " ") {
      texto = texto + letra;
    }
  }

  nome.value = texto;
};

telefone.oninput = function () {
  var numeros = "";

  for (var i = 0; i < telefone.value.length; i++) {
    var digito = telefone.value[i];

    if (!isNaN(digito) && digito != " ") {
      numeros = numeros + digito;
    }
  }

  var texto = "";

  if (numeros.length > 0) {
    texto = "(" + numeros.substring(0, 2);
  }

  if (numeros.length > 2) {
    texto = texto + ") " + numeros.substring(2, 7);
  }

  if (numeros.length > 7) {
    texto = texto + "-" + numeros.substring(7, 11);
  }

  telefone.value = texto;
};

email.oninput = function () {
  email.value = email.value.split(" ").join("").toLowerCase();
};

mensagem.oninput = function () {
  document.getElementById("contador").innerHTML = mensagem.value.length + " / 300";
};

document.getElementById("formulario").onsubmit = function (evento) {
  evento.preventDefault();

  var tudoCerto = true;

  document.getElementById("erroNome").innerHTML = "";
  document.getElementById("erroTelefone").innerHTML = "";
  document.getElementById("erroEmail").innerHTML = "";
  document.getElementById("erroMensagem").innerHTML = "";

  if (nome.value.length < 3) {
    document.getElementById("erroNome").innerHTML = "Digite seu nome.";
    tudoCerto = false;
  }

  if (telefone.value.length < 14) {
    document.getElementById("erroTelefone").innerHTML = "Digite o telefone com DDD.";
    tudoCerto = false;
  }

  if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
    document.getElementById("erroEmail").innerHTML = "Digite um e-mail válido.";
    tudoCerto = false;
  }

  if (mensagem.value.length < 10) {
    document.getElementById("erroMensagem").innerHTML = "Escreva pelo menos 10 letras.";
    tudoCerto = false;
  }

  if (tudoCerto) {
    abrirModal("Mensagem enviada!", "Obrigado pelo contato, " + nome.value + ".");
    document.getElementById("formulario").reset();
    document.getElementById("contador").innerHTML = "0 / 300";
  } else {
    abrirModal("Confira os campos", "Alguns campos estão incorretos. Corrija e envie de novo.");
  }
};