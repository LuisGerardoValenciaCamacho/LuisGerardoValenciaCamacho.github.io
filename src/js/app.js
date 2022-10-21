(function() {
    precionarBoton();
})();

function precionarBoton() {
    const btnCalular = document.querySelector("#btn-calcular")
    btnCalular.addEventListener("click", calcular);
}

function calcular(e) {
    const monto = document.querySelector("#monto").value;
    const anios = document.querySelector("#anios").value;
    let errores = [];
    if(monto == "") errores = ["El campo monto esta vacio"]
    if(anios == "") errores = [...errores, "El campo años esta vacio"];
    if(errores.length != 0) {
        mostrarAlertas(errores, "error")
    } else {
        calcularDespreciacion(monto, anios);
        mostrarAlertas(["Depreciacion Calculada"], "correcto");
    }
}

function calcularDespreciacion(monto, anios) {
    depreciacion = [];
    for(let i = 0; i < anios; i++) {
        depreciacion = [...depreciacion, (monto * ((anios - i) / calcularPeriodo(anios))).toPrecision(6)]
    }
    mostrarDepreciacion(depreciacion, anios);
}

function calcularPeriodo(anios) {
    let suma = 0;
    for (let i = anios; i > 0; i--) {
        suma += parseInt(i);
    }
    return suma;
}

function mostrarDepreciacion(depreciacion, anios) {
    const tabla = document.querySelector("#tabla");
    if(tabla.childNodes.length != 0) {
        limpiar(tabla);
        limpiar(tabla);
    }
    tabla.classList.add("tabla");
    const div = document.createElement("DIV");
    const divTitle = document.createElement("DIV");
    divTitle.classList.add("flex")
    const titleDepreciacion = document.createElement("P")
    titleDepreciacion.textContent = "Depreciacion";
    titleDepreciacion.classList.add("valor-title")
    const titleAnios = document.createElement("P");
    titleAnios.textContent = "Años";
    titleAnios.classList.add("anios-title")
    divTitle.appendChild(titleDepreciacion);
    divTitle.appendChild(titleAnios);
    div.appendChild(divTitle);
    depreciacion.forEach(valor => {
        const divValor = document.createElement("DIV");
        divValor.classList.add("flex");
        const pValor = document.createElement("P");
        pValor.textContent = `$ ${valor}`;
        pValor.classList.add("valor")
        divValor.appendChild(pValor);
        
        const pAnio = document.createElement("P");
        pAnio.textContent = anios;
        pAnio.classList.add("valor")
        divValor.appendChild(pAnio);
        anios -= 1;

        div.appendChild(divValor);
    })
    const btnLimpiar = document.createElement("button");
    btnLimpiar.textContent = "Limpiar";
    btnLimpiar.classList.add("btn");
    btnLimpiar.addEventListener("click", limpiarDepreciacion);
    tabla.appendChild(div);
    tabla.appendChild(btnLimpiar);
}

function mostrarAlertas(alertas, tipo) {
    const div = document.querySelector(".alertas");
    limpiar(div);
    const divAlertas = document.createElement("DIV");
    alertas.forEach(alerta => {
        const p = document.createElement("P");
        p.textContent = alerta;
        p.classList.add("alerta")
        p.classList.add(tipo);
        divAlertas.appendChild(p);
    });
    div.appendChild(divAlertas);
}

function limpiarDepreciacion() {
    const div = document.querySelector(".alertas");
    limpiar(div);
    const tabla = document.querySelector("#tabla");
    limpiar(tabla);
    limpiar(tabla);
    const monto = document.querySelector("#monto");
    monto.value = "";
    const anios = document.querySelector("#anios");
    anios.value = "";
}

function limpiar(element) {
    element.removeChild(element.lastChild);
}