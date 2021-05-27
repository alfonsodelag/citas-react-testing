import React from 'react';
import { render, screen } from '@testing-library/react';
import Formulario from './components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from './App';

test('<App /> La aplicación funciona bien la primera vez', () => {
    render(<App />);

    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes');
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1');
    expect(screen.getByText('Administrador de Pacientes').tagName).toBe('H1');

    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    expect(screen.getByText('No hay citas')).toBeInTheDocument();


});

test('<App /> Agregar una cita y verificar el Heading que es dinámico ', () => {
    render(<App />);

    // ! 1) Escribimos en el formulario.....
    userEvent.type(screen.getByTestId('mascota'), 'Hook');
    userEvent.type(screen.getByTestId('propietario'), 'Alfonso');
    userEvent.type(screen.getByTestId('fecha'), '2021-09-10');
    userEvent.type(screen.getByTestId('hora'), '10:30');
    userEvent.type(screen.getByTestId('sintomas'), 'Solo duerme');

    // fireEvent.change(screen.getByTestId('mascota'), {
    //     // El value: 'Hook' Escribirá "Hook" en el input Nombre de Mascota del formulario Crear Cita 
    //     target: { value: 'Hook' }
    // });

    // fireEvent.change(screen.getByTestId('propietario'), {
    //     // El value: 'Hook' Escribirá "Hook" en el input Nombre de Mascota del formulario Crear Cita 
    //     target: { value: 'Alfonso' }
    // });

    // ! 2) ...Y presionamos Submit
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);


    // ! 3) Luego volvemos a crear otra cita pero ahora dice Hook 2...
    userEvent.type(screen.getByTestId('mascota'), 'Hook 2');
    userEvent.type(screen.getByTestId('propietario'), 'Alfonso');
    userEvent.type(screen.getByTestId('fecha'), '2021-09-10');
    userEvent.type(screen.getByTestId('hora'), '10:30');
    userEvent.type(screen.getByTestId('sintomas'), 'Solo duerme');

    // ! 4) ...Y volvemos a presionar el botón Submit
    userEvent.click(btnSubmit);


    // Revisar por alerta
    // ! Si puede ser que exista o no el elemento usa query
    const alerta = screen.queryByTestId('alerta');
    expect(alerta).not.toBeInTheDocument();

    // Revisar por el título dinámico...
    expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas')
    expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas')
});

test('<App /> Verificar las Citas en el DOM', async () => {
    render(<App />);

    const citas = await screen.findAllByTestId('cita');

    console.log(citas.toString());

    // ! Snapshot crea un archivo para verificar su contenido
    /* Va a leer todo el archivo que tenga el test id y el snapshot nos creara un archivo nuevo
    en el cual podemos verificar el contenido */
    // expect(citas).toMatchSnapshot();

    // expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');
    expect(screen.getByTestId('btn-eliminar')).toBeInTheDocument();
    expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');

    // Verificar alguna cita
    expect(screen.getByText('Hook')).toBeInTheDocument();
});


test('<App /> Eliminar la Cita', async () => {
    render(<App />);

    const btnEliminar = screen.getAllByTestId('btn-eliminar');
    expect(screen.getAllByTestId('btn-eliminar')).toBeInTheDocument();
    expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');

    // Simular el Click
    userEvent.click(btnEliminar);

    // El botón ya no deberá estar
    expect(btnEliminar).not.toBeInTheDocument();

    expect(screen.queryByText('Hook')).toBeInTheDocument();
    expect(screen.queryByTestId('cita')).not.toBeInTheDocument();

});