// Datos

// 10 posiciones para los nombres
let nombres = ["", "", "", "", "", "", "", "", "", ""];

// Matriz de 10 filas y 3 columnas
let notas = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

// Contador de alumnos
let contador = 0;


// Validaciones

// Revisión de notas
function validarNota(nota, numeroCertamen) {
    if (nota === "") {
        return "Falta la nota del certamen " + numeroCertamen + ".";
    }

    if (isNaN(nota)) {
        return "La nota del certamen " + numeroCertamen + " debe ser un número.";
    }

    let numero = Number(nota);
    if (numero < 0 || numero > 100) {
        return "La nota del certamen " + numeroCertamen + " debe estar entre 0 y 100.";
    }

    return "";
}

// Revisión del nombre y las 3 notas
function validarDatos(nombre, nota1, nota2, nota3) {
    if (nombre === "") {
        return "Debes escribir el nombre del alumno.";
    }

    let error = validarNota(nota1, 1);
    if (error !== "") {
        return error;
    }

    error = validarNota(nota2, 2);
    if (error !== "") {
        return error;
    }

    error = validarNota(nota3, 3);
    if (error !== "") {
        return error;
    }

    return "";
}


// Guardar datos y mensajes

function guardarAlumno(nombre, nota1, nota2, nota3) {
    nombres[contador] = nombre;
    notas[contador][0] = nota1;
    notas[contador][1] = nota2;
    notas[contador][2] = nota3;
    contador = contador + 1;
}

// Mensajes
function mostrarMensaje(texto, tipo) {
    let mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
}

// Ejecuciones cada que se agrega un alumno
function agregarAlumno(evento) {
    // Limitacion de carga de la pagina 
    evento.preventDefault();

    // Leer lo que escribió el usuario
    let nombre = document.getElementById("nombre").value.trim();
    let nota1 = document.getElementById("nota1").value.trim();
    let nota2 = document.getElementById("nota2").value.trim();
    let nota3 = document.getElementById("nota3").value.trim();

    // Validacion
    let error = validarDatos(nombre, nota1, nota2, nota3);
    if (error !== "") {
        mostrarMensaje(error, "error");
        return;
    }

    // Guardado de las notas
    guardarAlumno(nombre, Number(nota1), Number(nota2), Number(nota3));
    mostrarMensaje("Alumno " + nombre + " agregado correctamente.", "exito");

    // Limpieza del formulario
    document.getElementById("formulario").reset();

    // Actualizar el contador o terminar si ya están los 10
    if (contador < 10) {
    document.getElementById("contador").textContent = "Alumno " + (contador + 1) + " de 10";
    } else {
    document.getElementById("contador").textContent = "¡Los 10 alumnos fueron ingresados!";
    document.getElementById("boton").disabled = true;

    // Procesamiento de los resultados
    procesarResultados();
    }
}


// Cálculos

// Promedio de las notas
function calcularPromedio(arreglo) {
    let suma = arreglo.reduce((acumulador, numero) => acumulador + numero, 0);
    return suma / arreglo.length;
}

// Promedio de los alumnos
function calcularPromediosAlumnos() {
    let promedios = notas.map(fila => calcularPromedio(fila));
    return promedios;
}

// Promedio del certamen
function obtenerColumna(numeroColumna) {
    let columna = notas.map(fila => fila[numeroColumna]);
    return columna;
}

// Alumnos aprobados
function contarAprobados(promedios) {
    let aprobados = promedios.filter(promedio => promedio >= 55);
    return aprobados.length;
}

// Alumnos reprobados
function contarReprobados(promedios) {
    let reprobados = promedios.filter(promedio => promedio < 55);
    return reprobados.length;
}


// Ordenar

// Ordena los alumnos de mayor a menor promedio de la nota
function ordenarAlumnos(promedios) {
    let alumnos = [];

    for (let i = 0; i < 10; i++) {
        alumnos.push({ nombre: nombres[i], promedio: promedios[i] });
    }

    alumnos.sort((a, b) => b.promedio - a.promedio);
    return alumnos;
}


// Mostrar resultados

// Muestra la tabla con el nombre, las 3 notas y el promedio de cada alumno
function mostrarTablaAlumnos(promedios) {
    let tabla = document.getElementById("tablaAlumnos");
    tabla.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        let fila = "<tr>" +
            "<td>" + nombres[i] + "</td>" +
            "<td>" + notas[i][0] + "</td>" +
            "<td>" + notas[i][1] + "</td>" +
            "<td>" + notas[i][2] + "</td>" +
            "<td><strong>" + promedios[i].toFixed(1) + "</strong></td>" +
            "</tr>";

        tabla.innerHTML = tabla.innerHTML + fila;
    }
}

// Muestra los promedios del curso y la cantidad de aprobados y reprobados
function mostrarResumen(promedioC1, promedioC2, promedioC3, promedioGeneral, aprobados, reprobados) {
    document.getElementById("promC1").textContent = promedioC1.toFixed(1);
    document.getElementById("promC2").textContent = promedioC2.toFixed(1);
    document.getElementById("promC3").textContent = promedioC3.toFixed(1);
    document.getElementById("promGeneral").textContent = promedioGeneral.toFixed(1);
    document.getElementById("aprobados").textContent = aprobados;
    document.getElementById("reprobados").textContent = reprobados;
}

// Muestra la lista de alumnos ordenada por promedio
function mostrarListaOrdenada(alumnosOrdenados) {
    let lista = document.getElementById("listaOrdenada");
    lista.innerHTML = "";
    alumnosOrdenados.forEach(alumno => {
        lista.innerHTML = lista.innerHTML + "<li>" + alumno.nombre + " — " + alumno.promedio.toFixed(1) + "</li>";
    });
}


// Procesar todo

// Hace todos los cálculos y muestra los resultados en la página
function procesarResultados() {
    let promedios = calcularPromediosAlumnos();

    let promedioC1 = calcularPromedio(obtenerColumna(0));
    let promedioC2 = calcularPromedio(obtenerColumna(1));
    let promedioC3 = calcularPromedio(obtenerColumna(2));
    let promedioGeneral = calcularPromedio(promedios);

    let aprobados = contarAprobados(promedios);
    let reprobados = contarReprobados(promedios);

    let alumnosOrdenados = ordenarAlumnos(promedios);

    document.getElementById("aviso").textContent = "Resultados de los 10 alumnos ingresados.";
    mostrarTablaAlumnos(promedios);
    mostrarResumen(promedioC1, promedioC2, promedioC3, promedioGeneral, aprobados, reprobados);
  //mostrarListaOrdenada(alumnosOrdenados);
}


// Evento del formulario
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", agregarAlumno);