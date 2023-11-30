import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioPaciente = document.querySelector('#Formulario-Paciente');

    formularioPaciente.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioPaciente['Nombre-Paciente'].value;
        const EDAD = parseInt(formularioPaciente['Edad-Paciente'].value);
        const ENFERMEDAD = formularioPaciente['Enfermedad-Paciente'].value;
        const DOCTOR_A_CARGO = formularioPaciente['DoctorACargo-Paciente'].value;
        const FECHA_INGRESO = formularioPaciente['FechaIngreso-Paciente'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoPacienteRef = await addDoc(collection(db, 'Pacientes'), {
                Nombre: NOMBRE,
                Edad: EDAD,
                Enfermedad: ENFERMEDAD,
                DoctorACargo: DOCTOR_A_CARGO,
                FechaIngreso: FECHA_INGRESO
            });

            // Muestra un mensaje si todo sale bien
            alert(`El paciente ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioPaciente.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el paciente:', 'noValido');
        }
    });
});
