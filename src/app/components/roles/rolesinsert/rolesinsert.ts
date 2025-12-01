import { Component, OnInit, inject } from '@angular/core'; // Añadido 'inject'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from '../../../models/Roles';
import { rolesservice } from '../../../services/rolesservices';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importaciones de Snackbar

@Component({
  selector: 'app-rolesinsert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule // Módulo de Snackbar añadido
  ],
  templateUrl: './rolesinsert.html',
    providers: [provideNativeDateAdapter()],

  styleUrl: './rolesinsert.css',
})
export class Rolesinsert implements OnInit{
  form: FormGroup = new FormGroup({});
  rol:Roles = new Roles();
  edicion:boolean=false;
  id:number=0;
  
  private _snackBar = inject(MatSnackBar); 

  constructor(
    private rS:rolesservice,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]], 	 
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo;
      this.rol.nameRole = this.form.value.nombre;
      if (this.edicion) {
        this.rS.update(this.rol).subscribe((data) => {
          this._snackBar.open('Se Actualizó correctamente', 'Cerrar', { duration: 3000 }); // Snackbar de actualización
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((data) => {
          this._snackBar.open('Se Registró correctamente', 'Cerrar', { duration: 3000 }); // Snackbar de registro
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          nombre: new FormControl(data.nameRole),
        });
      });
    }
  }
  
  cancelar(): void { 
      this.router.navigate(['roles']); 
  }
}