import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Alertas } from '../../../models/Alertas';
import { Citas } from '../../../models/Citas';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertasService } from '../../../services/alertasservice';
import { CitasService } from '../../../services/citasservice';

@Component({
  selector: 'app-alertasinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './alertasinsert.html',
  styleUrl: './alertasinsert.css',
})
export class Alertasinsert {
form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  ale: Alertas = new Alertas();

  listaCita: Citas[] = [];

  constructor(
    private aS: AlertasService,
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
      canalAlerta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
  
  tituloAlerta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s]+$')]],
  
  mensajeAlerta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150), Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s.,;:\\-]+$')]],    FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ale.idAlerta = this.form.value.codigo;
      this.ale.canalAlerta = this.form.value.canalAlerta;
      this.ale.tituloAlerta = this.form.value.tituloAlerta;
      this.ale.mensajeAlerta = this.form.value.mensajeAlerta;
      this.ale.citas.idCita = this.form.value.FK;
      if (this.edicion) {
        this.aS.update(this.ale).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.ale).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['alertas']);
    }
  }
  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idAlerta),
          canalAlerta: new FormControl(data.canalAlerta),
          tituloAlerta: new FormControl(data.tituloAlerta),
          mensajeAlerta: new FormControl(data.mensajeAlerta),
          FK:new FormControl(data.citas.idCita),
        });
      });
    }
  }
}
