import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Diagnosticos } from '../../../models/Diagnosticos';
import { Historial } from '../../../models/Historial';
import { DiagnosticosService } from '../../../services/diagnosticosservice';
import { HistorialService } from '../../../services/historialservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-diagnosticosinsert',
  imports: [ MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './diagnosticosinsert.html',
  styleUrl: './diagnosticosinsert.css',
})
export class Diagnosticosinsert {
form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  dia: Diagnosticos = new Diagnosticos();

  listaHistorial: Historial[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Grave', viewValue: 'Grave' },
    { value: 'Moderada', viewValue: 'Moderada' },
    { value: 'Leve', viewValue: 'Leve' },
  ];
  constructor(
    private dS: DiagnosticosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private hS: HistorialService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.hS.list().subscribe((data) => {
      this.listaHistorial = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      descripcionDiagnostico: ['', Validators.required],
      terapeutaDiagnostico: ['', Validators.required],
      severidadDiagnostico: ['', Validators.required],
      firmaDiagnostico: [, Validators.required],
      FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.dia.idDiagnostico = this.form.value.codigo;
      this.dia.fechaRegistroDiagnostico = this.form.value.fecha;
      this.dia.descripcionDiagnostico = this.form.value.descripcionDiagnostico;
      this.dia.terapeutaDiagnostico = this.form.value.terapeutaDiagnostico;
      this.dia.severidadDiagnostico = this.form.value.severidadDiagnostico;
      this.dia.firmaDiagnostico = this.form.value.firmaDiagnostico;
      this.dia.historial.idHistorial = this.form.value.FK;
      if (this.edicion) {
        this.dS.update(this.dia).subscribe(() => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      } else {
        this.dS.insert(this.dia).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['diagnosticos']);
    }
  }
  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDiagnostico),
          fecha: new FormControl(data.fechaRegistroDiagnostico),
          descripcionDiagnostico: new FormControl(data.descripcionDiagnostico),
          terapeutaDiagnostico: new FormControl(data.terapeutaDiagnostico),
          severidadDiagnostico: new FormControl(data.severidadDiagnostico),
          firmaDiagnostico: new FormControl(data.firmaDiagnostico),
          FK:new FormControl(data.historial.idHistorial),
        });
      });
    }
  }
}
