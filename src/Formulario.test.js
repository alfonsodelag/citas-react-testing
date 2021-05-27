// ! Aqui ponemos <Formulario /> para decirle que estamos probando este componente
// ! Esto va a describir o agrupar todo lo que hace esta prueba
// ! Puedes poner "test" o "it"
import React from 'react';
import { render, screen } from '@testing-library/react';
import Formulario from './components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

// Una función spy es como una funcion que no existe, que replica otra
const crearCita = jest.fn(); // ! Automaticamente jest buscarala funcion de crearCita en el proyecto

test('<Formulario /> Cargar el formulario y revisar que todo sea correcto', () => {
    // ! Este codigo nos servira para confirmar que el test esta recibiendo el componente
    // // Aqui estamos montando el componente Formulario en la prueba. Como es un componente de react, debemos importar React
    // const wrapper = render(<Formulario />);
    // // Una forma de confirmar que realmnente se está montando el componente es usando el .debug()
    // wrapper.debug();

    // ! Ahora vamos a confirmar si el <h2>Crear Cita</h2> de Formulario.js le aparecerá al usuario final o no
    render(<Formulario crearCita={crearCita} />);
    // ! Ahora escribas lo que esperas que haga la aplicación
    // ! Aqui estamos diciendo, yo espero que este true, sea true
    // expect(true).toBe(true)
    // expect(2+2).toBe(4)
    expect(screen.getByText('Crear Cita')).toBeInTheDocument(); // Va a pasar la prueba porque 'Crear Cita' si esta en Formulario.js

    // ! Validando titulos del heading
    const titulo = screen.getByTestId('titulo');
    expect(titulo.tagName).toBe('H2');
    // ! Tambien podemos poner un falso positivo con el ".not"
    expect(titulo.tagName).not.toBe('H1');

    // Revisando el contenido del texto
    expect(titulo.textContent).toBe('Crear Cita'); // ! Aqui pasara la prueba, pero no lo haria si pusieramos 'Crear NUEVA Cita' por ejemplo

    // ! Validando Botón de Submit
    expect(screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
    expect(screen.getByTestId('btn-submit').textContent).toBe('Agregar Cita');
    expect(screen.getByTestId('btn-submit').textContent).not.toBe('Agregar Nueva Cita');
});

test('<Formulario /> Validación de Formulario', () => {
    render(
        <Formulario
            crearCita={crearCita}
        />
    );

    // Click en el botón de Submit
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    // Revisar por alerta
    const alerta = screen.getByTestId('alerta');
    expect(alerta).toBeInTheDocument();
    expect(alerta.textContent).toBe('Todos los campos son obligatorios');
    expect(alerta.tagName).toBe('P');
    expect(alerta.tagName).not.toBe('BUTTON');
});

test('<Formulario /> Validación de Formulario', () => {
    render(
        <Formulario
            crearCita={crearCita}
        />
    );

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

    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    // Revisar por alerta
    // ! Si puede ser que exista o no el elemento usa query
    const alerta = screen.queryByTestId('alerta');
    expect(alerta).not.toBeInTheDocument();

    // Crear cita y comprobar que la funcion se haya creado
    expect(crearCita).toHaveBeenCalled();
    // Cuantas veces se llama la funcion
    expect(crearCita).toHaveBeenCalledTimes(1);
});

