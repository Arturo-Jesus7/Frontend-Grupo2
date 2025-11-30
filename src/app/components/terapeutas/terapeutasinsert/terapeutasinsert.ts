import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarios } from '../../../models/Usuarios';
import { Roles } from '../../../models/Roles';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { rolesservice } from '../../../services/rolesservices';
import { Terapeutasservice } from '../../../services/terapeutasservice';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-terapeutasinsert',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule, // Añadido MatSnackBarModule
  ],
  templateUrl: './terapeutasinsert.html',
  styleUrl: './terapeutasinsert.css',
})
export class Terapeutasinsert {
  form: FormGroup = new FormGroup({});
  readonly minDate = new Date();
  edicion: boolean = false;
  id: number = 0;
  ter: Usuarios = new Usuarios();

  listaRoles: Roles[] = [];

  private _snackBar = inject(MatSnackBar); // Añadida inyección de MatSnackBar

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Traumatologo', viewValue: 'Traumatologo' },
    { value: 'Cirujano', viewValue: 'Cirujano' },

  ];
  constructor(
    private teS: Terapeutasservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: rolesservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', Validators.required],
      nameusuario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      apellidousuario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      estado: [false, Validators.required],
      fecha: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$'), Validators.minLength(8), Validators.maxLength(8)]],
      especialidad: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      numerocolegiatura: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(5), Validators.maxLength(10)]],
      apoderadousuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],  
      FK: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ter.idUsuario = this.form.value.codigo;
      this.ter.username = this.form.value.username;
      this.ter.password = this.form.value.password;
      this.ter.nameUsuario = this.form.value.nameusuario;
      this.ter.apellidoUsuario = this.form.value.apellidousuario;
      this.ter.enabled = this.form.value.estado;
      this.ter.fechaNacimiento = this.form.value.fecha;
      this.ter.DNIUsuario= this.form.value.dni;
      this.ter.especialidadUsuario =this.form.value.especialidad
      this.ter.numerocolegiatura=this.form.value.numerocolegiatura
      this.ter.apoderadoUsuario=this.form.value.apoderadousuario
      this.ter.roles.idRol = this.form.value.FK;
      if (this.edicion) {
        this.teS.update(this.ter).subscribe(() => {
          this._snackBar.open('Se Actualizó correctamente', 'Cerrar', { duration: 3000 }); // Añadido Snackbar para actualización
          this.teS.list().subscribe((data) => {
            this.teS.setList(data);
          });
        });
      } else {
        this.teS.insert(this.ter).subscribe((data) => {
          this._snackBar.open('Se Registró correctamente', 'Cerrar', { duration: 3000 }); // Añadido Snackbar para registro
          this.teS.list().subscribe((data) => {
            this.teS.setList(data);
          });
        });
      }
      this.router.navigate(['terapeutas']);
    }
  }
  init() {
    if (this.edicion) {
      this.teS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          nameusuario: new FormControl(data.nameUsuario),
          apellidousuario: new FormControl(data.apellidoUsuario),
          estado: new FormControl(data.enabled),
          fecha: new FormControl(data.fechaNacimiento),
          dni: new FormControl(data.DNIUsuario),
          especialidad: new FormControl(data.especialidadUsuario),
          numerocolegiatura: new FormControl(data.numerocolegiatura),
          apoderadousuario: new FormControl(data.apoderadoUsuario),
          FK:new FormControl(data.roles.idRol),
        });
      });
    }
  }

  cancelar(): void { // Añadido el método cancelar
      this.router.navigate(['terapeutas']);
  }
}
