import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  listEmpleados: Empleado[] = [
    { nombreCompleto: 'Diann Erlandson', correo: 'derlandson@gmail.com', telefono: 3512473652, 
      sexo: 'Female', fechaIngreso: new Date(), estadoCivil: 'Single' 
    },
    { nombreCompleto: 'Sadie Wile', correo: 'swile@gmail.com', telefono: 3512473652, 
      sexo: 'Female', fechaIngreso: new Date(), estadoCivil: 'Single' 
    },
    { nombreCompleto: 'Billy Bourbeau', correo: 'bourbeau@gmail.com', telefono: 3512473652, 
      sexo: 'Male', fechaIngreso: new Date(), estadoCivil: 'Married' 
    },
    { nombreCompleto: 'Melina Trinidad', correo: 'mtrinidad@gmail.com', telefono: 3512473652, 
      sexo: 'Female', fechaIngreso: new Date(), estadoCivil: 'Single' 
    },
    { nombreCompleto: 'Charlene Bendel', correo: 'cbendel@gmail.com', telefono: 3512473652, 
      sexo: 'Female', fechaIngreso: new Date(), estadoCivil: 'Single' 
    },
    { nombreCompleto: 'Cornell Stanforth', correo: 'cstanforth@gmail.com', telefono: 3512473652, 
      sexo: 'Male', fechaIngreso: new Date(), estadoCivil: 'Divorced' 
    },
  ]
  constructor() { }

  getEmpleados() {
    return this.listEmpleados.slice();
  }

  eliminarEmpleado(index: number) {
    //Borrar desde el index pasado por parametro un solo elemento
    this.listEmpleados.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    //unshift agrega el objeto al principio del array, push al ultimo
    this.listEmpleados.unshift(empleado);
  }

  getEmpleado(index: number){
    return this.listEmpleados[index];
  }

  editEmpleado(empleado: Empleado, idEmpleado: number){
    this.listEmpleados[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleados[idEmpleado].correo = empleado.correo;
    this.listEmpleados[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleados[idEmpleado].telefono = empleado.telefono;
    this.listEmpleados[idEmpleado].estadoCivil = empleado.estadoCivil;
    this.listEmpleados[idEmpleado].sexo = empleado.sexo;
  }
}
