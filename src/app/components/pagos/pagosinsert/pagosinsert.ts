import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Pagos } from '../../../models/Pagos';
import { Citas } from '../../../models/Citas';
import { PagosService } from '../../../services/pagosservice';
import { CitasService } from '../../../services/citasservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pagosinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './pagosinsert.html',
  styleUrl: './pagosinsert.css',
})
export class Pagosinsert {
form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  pag: Pagos = new Pagos();
  readonly minDate = new Date(); 

  listaCita: Citas[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Completado', viewValue: 'Completado' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
  ];
  constructor(
    private pS: PagosService,
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
    const hoy = new Date().toISOString().substring(0, 10);
    this.form = this.formBuilder.group({
      codigo: [''],
     montoPago: ['', [Validators.required, Validators.min(1), Validators.max(10000), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
  
  passApiPago: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9]+$')]],
  
  fecha: [hoy, [Validators.required,]],
  
  estadoPago: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.pag.idPago = this.form.value.codigo;
      this.pag.montoPago = this.form.value.montoPago;
      this.pag.passApiPago = this.form.value.passApiPago;
      this.pag.fechaPago = this.form.value.fecha;
      this.pag.estadoPago = this.form.value.estadoPago;
      this.pag.citas.idCita = this.form.value.FK;
      if (this.edicion) {
        this.pS.update(this.pag).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.pag).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['pagos']);
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPago),
          montoPago: new FormControl(data.montoPago),
          passApiPago: new FormControl(data.passApiPago),
          fecha: new FormControl(data.fechaPago),
          estadoPago: new FormControl(data.estadoPago),
          FK:new FormControl(data.citas.idCita),
        });
      });
    }
  }
}
