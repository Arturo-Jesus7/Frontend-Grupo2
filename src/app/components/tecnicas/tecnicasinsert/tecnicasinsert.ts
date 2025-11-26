import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Tecnicas } from '../../../models/Tecnicas';
import { Sesiones } from '../../../models/Sesiones';
import { TecnicasService } from '../../../services/tecnicasservice';
import { SesionesService } from '../../../services/sesionesservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importaciones añadidas

@Component({
  selector: 'app-tecnicasinsert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule, // Módulo de Snackbar añadido
  ],
  templateUrl: './tecnicasinsert.html',
  styleUrl: './tecnicasinsert.css',
})
export class Tecnicasinsert {
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  tec: Tecnicas = new Tecnicas();

  listaSesiones: Sesiones[] = [];

  private _snackBar = inject(MatSnackBar); // Inyección de MatSnackBar

  constructor(
    private tS: TecnicasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sS: SesionesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.sS.list().subscribe((data) => {
      this.listaSesiones = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombreTecnica: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s]+$')]],
      descripcionTecnica: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s.,;:\\-]+$')]], FK: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.tec.idTecnica = this.form.value.codigo;
      this.tec.nombreTecnica = this.form.value.nombreTecnica;
      this.tec.descripcionTecnica = this.form.value.descripcionTecnica;
      this.tec.sesiones.idSesion = this.form.value.FK;
      if (this.edicion) {
        this.tS.update(this.tec).subscribe(() => {
          this._snackBar.open('Se Actualizó correctamente', 'Cerrar', { duration: 3000 }); // Snackbar de actualización
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tec).subscribe((data) => {
          this._snackBar.open('Se Registró correctamente', 'Cerrar', { duration: 3000 }); // Snackbar de registro
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['tecnicas']);
    }
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTecnica),
          nombreTecnica: new FormControl(data.nombreTecnica),
          descripcionTecnica: new FormControl(data.descripcionTecnica),
          FK: new FormControl(data.sesiones.idSesion),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['tecnicas']);
  }
}