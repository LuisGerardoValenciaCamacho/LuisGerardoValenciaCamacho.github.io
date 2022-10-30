(function () {
    const btn = document.querySelector("#btn-calcular");
    btn.addEventListener("click", obtenerNumero);
})();

let numerosPrimarios = ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
let numerosNaturales = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let numerosIrregulares = ["once", "doce", "trece", "catorce", "quince"];
let numerosDecenas = ["diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
let numerosCentenas = ["cien", "ciento", "cientos"]

function obtenerNumero() {
    const numero = document.querySelector("#numero").value;
    if(numero == "") {
        mostrarAlertas("El campo Número esta vacio", "error");
    } else if(numero > 9999999) {
        mostrarAlertas("El número debe de ser menor a 9,999,999", "error");
    } else {
        convertir(separarNumero(numero));
        mostrarAlertas("Conversión Realizada", "correcto")
    }
}

function imprimir(resultadoValor) {
    const resultado = document.querySelector("#resultado");
    if(resultado.childNodes.length != 0) {
        resultado.removeChild(resultado.firstChild);
        resultado.removeChild(resultado.firstChild);
    }
    const div = document.createElement("DIV");
    div.classList.add("fila-flex")
    const p = document.createElement("P");
    p.textContent = resultadoValor;
    div.appendChild(p);
    resultado.appendChild(div);
    const btn = document.createElement("BUTTON");
    btn.textContent = "Limpiar"
    btn.classList.add("btn");
    btn.classList.add("btn-secundario");
    btn.addEventListener("click", limpiarCompleto);
    resultado.appendChild(btn);
}

function limpiar(objeto) {
    objeto.remove(objeto.childNodes.lastChild);
}

function limpiarCompleto() {
    const resultado = document.querySelector("#resultado");
    resultado.removeChild(resultado.firstChild);
    resultado.removeChild(resultado.firstChild);
    limpiar(document.querySelector(".alertas"));
    const numero = document.querySelector("#numero");
    numero.value = "";
}

function convertir(numeros) {
    let resultado = "";
    switch(numeros.length) {
        case 1:
            resultado = encontrarNumero(numeros[0]);
            break;
        case 2:
            resultado = encontrarDecena(numeros)
            break;
        case 3:
            if(numeros[0] == 1) {
                resultado = numerosCentenas[0]
                if(numeros[1] != 0 && numeros[1] != 0) {
                    resultado = numerosCentenas[1]
                    resultado += " " + encontrarDecena([numeros[1], numeros[2]])
                } else {
                    resultado = numerosCentenas[1];
                    resultado += " " + encontrarNumero(numeros[2]);
                }
            } else {
                resultado = encontrarCentenas(numeros);
            }
            break;
        case 4:
            if(numeros[0] == 1) resultado = "mil " + encontrarCentenas([numeros[1], numeros[2], numeros[3]]);
            else resultado = encontrarNumero(numeros[0]) + " mil " + encontrarCentenas([numeros[1], numeros[2], numeros[3]]);
            break;
        case 5:
            resultado = `${encontrarDecena([numeros[0], numeros[1]])} mil ${encontrarCentenas([numeros[2], numeros[3], numeros[4]])}`
            break;
        case 6:
            resultado = `${encontrarCentenas([numeros[0] ,numeros[1], numeros[2]])} mil ${encontrarCentenas([numeros[3], numeros[4], numeros[5]])}`
            break;
        case 7:
            if(numeros[0] == 1) resultado = "un millon " + encontrarCentenasMiles([numeros[1], numeros[2], numeros[3], numeros[4], numeros[5], numeros[6]]);
            else resultado = encontrarNumero(numeros[0]) + " millones " + encontrarCentenasMiles([numeros[1], numeros[2], numeros[3], numeros[4], numeros[5], numeros[6]]);
            break;
    }
    imprimir(resultado);
    
}

function encontrarCentenasMiles(numeros) {
    return `${encontrarCentenas([numeros[0] ,numeros[1], numeros[2]])} mil ${encontrarCentenas([numeros[3], numeros[4], numeros[5]])}`
}

function encontrarCentenas(numeros) {
    if(numeros[0] == 0 && numeros[1] == 0 && numeros[2] == 0) {
        return "";
    } else if(numeros[0] == 0) {
        return encontrarDecena([numeros[1], numeros[2]])
    } else if(numeros[0] == 1 && numeros[1] == 0 && numeros[2] == 0) {
        return numerosCentenas[0];
    }
    return (numeros[0] != 1) ? encontrarNumero(numeros[0]) + " " + numerosCentenas[2] + " " + encontrarDecena([numeros[1], numeros[2]]) : numerosCentenas[1] + " " + encontrarDecena([numeros[1], numeros[2]]);
}

function encontrarDecena(numeros) {
    let resultado = "";
    if(numeros[1] == 0) resultado = encontrarNumero(numeros[0])
    else if(numeros[1] == 1 && numeros[0] == 1) return numerosIrregulares[0];
    else if(numeros[1] == 2 && numeros[0] == 1) return numerosIrregulares[1];
    else if(numeros[1] == 3 && numeros[0] == 1) return numerosIrregulares[2];
    else if(numeros[1] == 4 && numeros[0] == 1) return numerosIrregulares[3];
    else if(numeros[1] == 5 && numeros[0] == 1) return numerosIrregulares[4];
    for(let i=0; i<=9; i++) {
        if(numeros[0] == i+1) {
            resultado = numerosDecenas[i];
        }
    }
    for(let i=1; i<=9; i++) {
        if(numeros[1] == i) {
            resultado += " y " + encontrarNumero(i);
        }
    }
    return resultado;
}

function encontrarNumero(numero) {
    for(let i=0; i<numerosNaturales.length; i++) {
        if(numerosNaturales[i] == numero) {
            return numerosPrimarios[i];
        }
    }
}

function separarNumero(numero) {
    return numero.toString().split('').map(Number);
}

function mostrarAlertas(alerta, tipo) {
    const div = document.querySelector(".alertas");
    limpiar(div);
    const divAlertas = document.createElement("DIV");
    const p = document.createElement("P");
    p.textContent = alerta;
    p.classList.add("alerta")
    p.classList.add(tipo);
    divAlertas.appendChild(p);
    div.appendChild(divAlertas);
}

function limpiar(element) {
    element.removeChild(element.lastChild);
}