import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Videoconferencias } from '../../../models/Videoconferencias';
import { Citas } from '../../../models/Citas';
import { VideoconferenciasService } from '../../../services/videoconferenciasservices';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitasService } from '../../../services/citasservice';

@Component({
  selector: 'app-videoconferenciasinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './videoconferenciasinsert.html',
  styleUrl: './videoconferenciasinsert.css',
})
export class Videoconferenciasinsert {
form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  vid: Videoconferencias = new Videoconferencias();

  listaCitas: Citas[] = [];

  constructor(
    private vS: VideoconferenciasService,
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
      this.listaCitas = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      proveedorVideoconferencia: ['', Validators.required],
      joinUrlVideoconferencia: ['', Validators.required],
      namestarUrlVideoconferenciausuario: ['', Validators.required],
      passApiVideoconferencia: ['', Validators.required], 
      FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.vid.idVideoconferencia = this.form.value.codigo;
      this.vid.proveedorVideoconferencia = this.form.value.proveedorVideoconferencia;
      this.vid.joinUrlVideoconferencia = this.form.value.joinUrlVideoconferencia;
      this.vid.starUrlVideoconferencia = this.form.value.starUrlVideoconferencia;
      this.vid.passApiVideoconferencia = this.form.value.passApiVideoconferencia;
      this.vid.citas.idCita = this.form.value.FK;
      if (this.edicion) {
        this.vS.update(this.vid).subscribe(() => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
      } else {
        this.vS.insert(this.vid).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
      }
      this.router.navigate(['videoconferencia']);
    }
  }
  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idVideoconferencia),
          username: new FormControl(data.proveedorVideoconferencia),
          password: new FormControl(data.joinUrlVideoconferencia),
          nameusuario: new FormControl(data.starUrlVideoconferencia),
          apellidousuario: new FormControl(data.passApiVideoconferencia),
          FK:new FormControl(data.citas.idCita),
        });
      });
    }
  }
}
