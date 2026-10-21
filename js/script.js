// Respuestas y explicaciones para que el quiz también sirva como repaso.
const respuestasQuiz = [
    {
        respuesta: "a",
        explicacion: "El monolito se construye y despliega como una unidad, aunque internamente pueda organizarse en módulos."
    },
    {
        respuesta: "b",
        explicacion: "Los módulos pueden estar separados en el código, pero la aplicación se publica como una unidad."
    },
    {
        respuesta: "c",
        explicacion: "Un proyecto monolítico puede comenzar con una configuración y un despliegue más directos."
    },
    {
        respuesta: "a",
        explicacion: "Al crecer, las dependencias entre módulos pueden aumentar el acoplamiento y hacer los cambios más difíciles."
    },
    {
        respuesta: "b",
        explicacion: "Los microservicios se organizan como servicios independientes que pueden desplegarse y escalarse por separado."
    }
];

const quizForm = document.querySelector("#quizForm");
const quizResult = document.querySelector("#quizResult");
const resetQuizButton = document.querySelector("#resetQuiz");
const currentYear = document.querySelector("#currentYear");

// Actualiza el año automáticamente para no tener que editarlo cada enero.
if (currentYear) {
    currentYear.textContent = new Date().getFullYear().toString();
}

if (quizForm && quizResult && resetQuizButton) {
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const respuestasSeleccionadas = respuestasQuiz.map((_, indice) => {
            const seleccionada = quizForm.querySelector(`input[name="pregunta${indice + 1}"]:checked`);
            return seleccionada ? seleccionada.value : null;
        });

        const primeraSinResponder = respuestasSeleccionadas.findIndex((respuesta) => respuesta === null);

        if (primeraSinResponder !== -1) {
            quizResult.innerHTML = `
                <h3>Falta una respuesta</h3>
                <p>Responde las cinco preguntas antes de comprobar el resultado.</p>
            `;
            quizResult.hidden = false;
            resetQuizButton.hidden = true;
            quizResult.focus();
            quizForm.querySelector(`input[name="pregunta${primeraSinResponder + 1}"]`).focus();
            return;
        }

        const puntaje = respuestasSeleccionadas.reduce((total, respuesta, indice) => (
            total + (respuesta === respuestasQuiz[indice].respuesta ? 1 : 0)
        ), 0);
        const porcentaje = Math.round((puntaje / respuestasQuiz.length) * 100);
        const resumenRespuestas = respuestasQuiz.map((pregunta, indice) => {
            const fueCorrecta = respuestasSeleccionadas[indice] === pregunta.respuesta;
            const estado = fueCorrecta ? "Correcta" : "Para repasar";
            const clase = fueCorrecta ? "answer-correct" : "answer-incorrect";
            return `<li><strong class="${clase}">${estado}.</strong> ${pregunta.explicacion}</li>`;
        }).join("");

        let retroalimentacion;
        if (puntaje === respuestasQuiz.length) {
            retroalimentacion = "¡Excelente! Dominas los conceptos principales.";
        } else if (puntaje >= 3) {
            retroalimentacion = "¡Buen trabajo! Revisa las explicaciones para afianzar lo aprendido.";
        } else {
            retroalimentacion = "Sigue aprendiendo: repasa las secciones y vuelve a intentarlo.";
        }

        quizResult.innerHTML = `
            <h3>Obtuviste ${puntaje} de ${respuestasQuiz.length} (${porcentaje}%)</h3>
            <p>${retroalimentacion}</p>
            <ol>${resumenRespuestas}</ol>
        `;
        quizResult.hidden = false;
        resetQuizButton.hidden = false;
        quizResult.focus();
    });

    resetQuizButton.addEventListener("click", () => {
        quizForm.reset();
        quizResult.hidden = true;
        quizResult.textContent = "";
        resetQuizButton.hidden = true;
        quizForm.querySelector('input[name="pregunta1"]').focus();
    });

    // Al cambiar una respuesta se limpia el aviso de validación incompleta.
    quizForm.addEventListener("change", (event) => {
        if (event.target instanceof HTMLInputElement && event.target.type === "radio") {
            const resultadoPendiente = quizResult.querySelector("h3");
            if (resultadoPendiente && resultadoPendiente.textContent === "Falta una respuesta") {
                quizResult.hidden = true;
            }
        }
    });
}
