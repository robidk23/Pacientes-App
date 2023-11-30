import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Pacientes = document.querySelector('.Pacientes');
const FormularioActualizarPaciente = document.querySelector('#Formulario-ActualizarPaciente');

const obtenerPaciente = (id) => getDoc(doc(db, 'Pacientes', id));

let id = '';

// Nueva función para actualizar paciente
const actualizarPaciente = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Pacientes', id), nuevosValores);
        alert('Paciente actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el paciente', 'error');
    }
};

export const MostrarListaPacientes = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Paciente = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre del paciente: ${Paciente.Nombre} </h5>
                    <p> Edad: ${Paciente.Edad} </p>
                    <p> Enfermedad: ${Paciente.Enfermedad} </p>
                    <p> Doctor a cargo: ${Paciente.DoctorACargo} </p>
                    <p> Fecha de ingreso: ${Paciente.FechaIngreso} </p>
                    <button class="btn btn-dark w-100 mb-2 botoneSinSesion Eliminar-Paciente" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-100 mb-2 botoneSinSesion Actualizar-Paciente" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarPaciente"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Pacientes.innerHTML = html;

        const BotonesEliminar = Pacientes.querySelectorAll('.Eliminar-Paciente');

        // ELIMINAR PACIENTES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Pacientes', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el paciente:', 'error');
                }
            });
        });

        const BotonesActualizar = Pacientes.querySelectorAll('.Actualizar-Paciente');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerPaciente(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarPaciente['Actualizar-Nombre'];
                const EDAD = FormularioActualizarPaciente['Actualizar-Edad'];
                const ENFERMEDAD = FormularioActualizarPaciente['Actualizar-Enfermedad'];
                const DOCTOR_A_CARGO = FormularioActualizarPaciente['Actualizar-DoctorACargo'];
                const FECHA_INGRESO = FormularioActualizarPaciente['Actualizar-FechaIngreso'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                EDAD.value = DATOSDOCUMENTO.Edad;
                ENFERMEDAD.value = DATOSDOCUMENTO.Enfermedad;
                DOCTOR_A_CARGO.value = DATOSDOCUMENTO.DoctorACargo;
                FECHA_INGRESO.value = DATOSDOCUMENTO.FechaIngreso;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el paciente al enviar el formulario
        FormularioActualizarPaciente.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarPaciente['Actualizar-Nombre'].value;
                const EDAD = FormularioActualizarPaciente['Actualizar-Edad'].value;
                const ENFERMEDAD = FormularioActualizarPaciente['Actualizar-Enfermedad'].value;
                const DOCTOR_A_CARGO = FormularioActualizarPaciente['Actualizar-DoctorACargo'].value;
                const FECHA_INGRESO = FormularioActualizarPaciente['Actualizar-FechaIngreso'].value;

                await actualizarPaciente(id, {
                    Nombre: NOMBRE,
                    Edad: EDAD,
                    Enfermedad: ENFERMEDAD,
                    DoctorACargo: DOCTOR_A_CARGO,
                    FechaIngreso: FECHA_INGRESO,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarPaciente');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Pacientes.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
