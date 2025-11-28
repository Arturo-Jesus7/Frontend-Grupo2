import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Tratamientos } from '../../../models/Tratamientos';
import { Historial } from '../../../models/Historial';
import { TratamientossService } from '../../../services/tratamientosservice';
import { HistorialService } from '../../../services/historialservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tratamientosinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './tratamientosinsert.html',
  styleUrl: './tratamientosinsert.css',
})
export class Tratamientosinsert {
  form: FormGroup = new FormGroup({});
  readonly minDate = new Date(); 

  edicion: boolean = false;
  id: number = 0;
  tra: Tratamientos = new Tratamientos();

  listaHistorial: Historial[] = [];

  private _snackBar = inject(MatSnackBar);

  constructor(
    private tS: TratamientossService,
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
        const hoy = new Date().toISOString().substring(0, 10);

    this.form = this.formBuilder.group({
      codigo: [''],
objetivoTratamiento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s.,;:\\-]+$')]],
  
planTratamiento: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s.,;:\\-]+$')]],
  
fechainicio: [hoy, [Validators.required,]],
  
fechafin: ['', [Validators.required,]],
  
terapeutaTratamiento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
  
progresoTratamiento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s.,;:\\-]+$'),Validators.min(1), Validators.max(100)]],
      FK:['',Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tra.idTratamiento = this.form.value.codigo;
      this.tra.objetivoTratamiento = this.form.value.objetivoTratamiento;
      this.tra.planTratamiento = this.form.value.planTratamiento;
      this.tra.FechaInicioTratamiento = this.form.value.fechainicio;
      this.tra.FechaFinTratamiento = this.form.value.fechafin;
      this.tra.terapeutaTratamiento = this.form.value.terapeutaTratamiento;
      this.tra.progresoTratamiento = this.form.value.progresoTratamiento;
      this.tra.historial.idHistorial = this.form.value.FK;
      if (this.edicion) {
        this.tS.update(this.tra).subscribe(() => {
          this._snackBar.open('Se Actualizó correctamente', 'Cerrar', { duration: 3000 });
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tra).subscribe((data) => {
          this._snackBar.open('Se Registró correctamente', 'Cerrar', { duration: 3000 });
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['tratamientos']);
    }
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTratamiento),
          objetivoTratamiento: new FormControl(data.objetivoTratamiento),
          planTratamiento: new FormControl(data.planTratamiento),
          fechainicio: new FormControl(data.FechaInicioTratamiento),
          fechafin: new FormControl(data.FechaFinTratamiento),
          terapeutaTratamiento: new FormControl(data.terapeutaTratamiento),
          progresoTratamiento: new FormControl(data.progresoTratamiento),
          FK:new FormControl(data.historial.idHistorial),
        });
      });
    }
  }
  
  cancelar(): void {
      this.router.navigate(['tratamientos']); 
  }
}