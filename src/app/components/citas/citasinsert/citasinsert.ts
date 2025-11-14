import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Citas } from '../../../models/Citas';
import { Usuarios } from '../../../models/Usuarios';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuariosservice';
import { CitasService } from '../../../services/citasservice';

@Component({
  selector: 'app-citasinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './citasinsert.html',
  styleUrl: './citasinsert.css',
})
export class Citasinsert {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  cit: Citas = new Citas();

  listaUsuarios: Usuarios[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Completada', viewValue: 'Completada' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Cancelada', viewValue: 'Cancelada' },
  ];
  constructor(
    private cS: CitasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      estadoCita: ['', Validators.required],
      fecha: ['', Validators.required],
      motivoCita: ['', Validators.required],
      videoCita: ['', Validators.required],
      favoritoCita: [false, Validators.required],
      FK1:['',Validators.required],
      FK2:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.cit.idCita = this.form.value.codigo;
      this.cit.estadoCita = this.form.value.estadoCita;
      this.cit.fechaCita = this.form.value.fecha;
      this.cit.motivoCita = this.form.value.motivoCita;
      this.cit.videoCita = this.form.value.videoCita;
      this.cit.favoritoCita = this.form.value.favoritoCita;
      this.cit.usuarioPaciente.idUsuario = this.form.value.FK1;
      this.cit.usuarioTerapeuta.idUsuario = this.form.value.FK2;
      if (this.edicion) {
        this.cS.update(this.cit).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.cit).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['citas']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCita),
          estadoCita: new FormControl(data.estadoCita),
          fecha: new FormControl(data.fechaCita),
          motivoCita: new FormControl(data.motivoCita),
          videoCita: new FormControl(data.videoCita),
          favoritoCita: new FormControl(data.favoritoCita),
          FK1:new FormControl(data.usuarioPaciente.idUsuario),         
          FK2:new FormControl(data.usuarioTerapeuta.idUsuario),
        });
      });
    }
  }
}
