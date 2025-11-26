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
import { Sesiones } from '../../../models/Sesiones';
import { UsuariosService } from '../../../services/usuariosservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitasService } from '../../../services/citasservice';
import { SesionesService } from '../../../services/sesionesservice';

@Component({
  selector: 'app-sesionesinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './sesionesinsert.html',
  styleUrl: './sesionesinsert.css',
})
export class Sesionesinsert {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  ses: Sesiones = new Sesiones();
  readonly minDate = new Date(); 

  listaCita: Citas[] = [];

  constructor(
    private sS: SesionesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cS: CitasService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.cS.list().subscribe((data) => {
      this.listaCita = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
numeroSesion: ['', [Validators.required, Validators.min(1), Validators.max(999), Validators.pattern('^[0-9]+$')]],     
 fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ses.idSesion = this.form.value.codigo;
      this.ses.numeroSesion = this.form.value.numeroSesion;
      this.ses.fechaInicioSesion = this.form.value.fechainicio;
      this.ses.fechaFinSesion = this.form.value.fechafin;
      this.ses.citas.idCita = this.form.value.FK;
      if (this.edicion) {
        this.sS.update(this.ses).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.ses).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['sesiones']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idSesion),
          username: new FormControl(data.numeroSesion),
          password: new FormControl(data.fechaInicioSesion),
          nameusuario: new FormControl(data.fechaFinSesion),
          FK:new FormControl(data.citas.idCita),
        });
      });
    }
  }
}
