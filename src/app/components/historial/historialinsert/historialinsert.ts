import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Historial } from '../../../models/Historial';
import { Usuarios } from '../../../models/Usuarios';
import { HistorialService } from '../../../services/historialservice';
import { UsuariosService } from '../../../services/usuariosservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importaciones de Snackbar

@Component({
  selector: 'app-historialinsert',
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
  templateUrl: './historialinsert.html',
  styleUrl: './historialinsert.css',
})
export class Historialinsert {
form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  his: Historial = new Historial();

  listaUsuarios: Usuarios[] = [];
  
  private _snackBar = inject(MatSnackBar); // Inyección de MatSnackBar

  constructor(
    private hS: HistorialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService
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
      documentacionHistorial: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]], 	 
      FK:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.his.idHistorial = this.form.value.codigo;
      this.his.documentacionHistorial = this.form.value.documentacionHistorial;
      this.his.usuario.idUsuario = this.form.value.FK;
      if (this.edicion) {
        this.hS.update(this.his).subscribe(() => {
          this._snackBar.open('Se Actualizó correctamente', 'Cerrar', { duration: 3000 }); // Snackbar de actualización
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });
      } else {
        this.hS.insert(this.his).subscribe((data) => {
          this._snackBar.open('Se Registró correctamente', 'Cerrar', { duration: 3000 }); // Snackbar de registro
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });
      }
      this.router.navigate(['historial']);
    }
  }
  init() {
    if (this.edicion) {
      this.hS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idHistorial),
          documentacionHistorial: new FormControl(data.documentacionHistorial),
          FK:new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
  
  cancelar(): void { 
      this.router.navigate(['historial']); 
  }
}