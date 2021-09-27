import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent implements OnInit {
  estadosCiviles: any[] = ['Single', 'Married','Divorced'];
  idEmpleado: any;
  accion = 'Create';
  myForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private empleadoService: EmpleadoService,
              private route: Router, 
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    });
    const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if(this.idEmpleado !== undefined){
      this.accion = 'Edit';
    }
    this.esEditar();
  }

  guardarEmpleado() {
    //Console.log para ver los valores del elemento form al hacer click en aceptar
    console.log(this.myForm);
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      correo: this.myForm.get('correo').value,
      fechaIngreso: this.myForm.get('fechaIngreso').value,
      telefono: this.myForm.get('telefono').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value
    };

    if(this.idEmpleado !== undefined){
      this.editarEmpleado(empleado);
    }else{
      this.agregarEmpleado(empleado);
    }
  }

  agregarEmpleado(empleado: Empleado){
    this.empleadoService.agregarEmpleado(empleado);
    this.snackBar.open('The employee was sucessfully registered', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  editarEmpleado(empleado: Empleado){
    this.empleadoService.editEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('The employee was sucessfully edited', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  esEditar() {
    const empleado: Empleado = this.empleadoService.getEmpleado(this.idEmpleado);
    if(empleado !== undefined){
      this.myForm.patchValue({
        nombreCompleto: empleado.nombreCompleto,
        correo: empleado.correo,
        fechaIngreso: empleado.fechaIngreso,
        telefono: empleado.telefono,
        estadoCivil: empleado.estadoCivil,
        sexo: empleado.sexo
      });
    }
  }



}
