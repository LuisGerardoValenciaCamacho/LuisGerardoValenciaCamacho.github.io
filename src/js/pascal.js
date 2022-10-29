(function() {
    precionarBoton();
})();

function precionarBoton() {
    const btn = document.querySelector("#btn-pascal")
    btn.addEventListener("click", obtenerFilas);
}

function obtenerFilas() {
    const filas = document.querySelector("#filas").value;
    if(filas == "") {
        mostrarAlertas("El campo fila esta vacio", "error");
    } else {
        console.error(calcularFactorial(filas));
        calcularFilas(filas);
    }
}

function calcularFilas(filas) {
    for(let i=0; i<filas; i++) {
        let fila = []
        let filaInterna = []
        for(let j=0; j<=i; j++) {
            filaInterna = [...filaInterna, (calcularFactorial(i) / (calcularFactorial(j)*calcularFactorial(i-j)))]
        }
        fila = [...fila, filaInterna]
        console.log(fila);
        imprimirFila(fila);
    }
    mostrarAlertas("Triángulo de Pascal calculado", "correcto")
    const pascal = document.querySelector("#pascal");
    const btn = document.createElement("BUTTON");
    btn.textContent = "Limpiar"
    btn.classList.add("btn");
    btn.classList.add("btn-secundario");
    btn.addEventListener("click", limpiarCompleto);
    pascal.appendChild(btn);
}

function imprimirFila(fila) {
    const pascal = document.querySelector("#pascal");
    fila.forEach(valor => {
        const div = document.createElement("DIV");
        div.classList.add("fila-flex")
        valor.forEach(numero => {
            const p = document.createElement("P");
            p.textContent = numero
            div.appendChild(p);
        })
        pascal.appendChild(div);
    })
}

function calcularFactorial(m) {
    let resultado = 1;
    for(let i=1; i<=m; i++) {
        resultado*=i;
    }
    return resultado;
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

function limpiarCompleto() {
    const div = document.querySelector(".alertas");
    limpiar(div);
    const pascal = document.querySelector("#pascal");
    const cantidad = pascal.childNodes.length;
    for(let i=0; i<cantidad; i++) {
        pascal.removeChild(pascal.firstChild);
    }
    const filas = document.querySelector("#filas");
    filas.value = "";
}