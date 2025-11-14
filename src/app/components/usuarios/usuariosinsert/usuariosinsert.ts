import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Roles } from '../../../models/Roles';
import { UsuariosService } from '../../../services/usuariosservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { rolesservice } from '../../../services/rolesservices';

@Component({
  selector: 'app-usuariosinsert',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './usuariosinsert.html',
  styleUrl: './usuariosinsert.css',
})
export class Usuariosinsert {
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  usu: Usuarios = new Usuarios();

  listaRoles: Roles[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Traumatologo', viewValue: 'Traumatologo' },
    { value: 'Cirujano', viewValue: 'Cirujano' },
  
  ];
  constructor(
    private uS: UsuariosService,
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
      username: ['', Validators.required],
      password: ['', Validators.required],
      nameusuario: ['', Validators.required],
      apellidousuario: ['', Validators.required],
      estado: [false, Validators.required],
      fecha: ['', Validators.required],
      dni:['',Validators.required],
      especialidad: ['', Validators.required],
      numerocolegiatura: ['', Validators.required],
      apoderadousuario: ['', Validators.required],   
      FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.usu.idUsuario = this.form.value.codigo;
      this.usu.username = this.form.value.username;
      this.usu.password = this.form.value.password;
      this.usu.nameUsuario = this.form.value.nameusuario;
      this.usu.apellidoUsuario = this.form.value.apellidousuario;
      this.usu.enabled = this.form.value.estado;
      this.usu.fechaNacimiento = this.form.value.fecha;
      this.usu.DNIUsuario= this.form.value.dni;
      this.usu.especialidadUsuario =this.form.value.especialidad
      this.usu.numerocolegiatura=this.form.value.numerocolegiatura
      this.usu.apoderadoUsuario=this.form.value.apoderadousuario
      this.usu.roles.idRol = this.form.value.FK;
      if (this.edicion) {
        this.uS.update(this.usu).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usu).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
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
}
