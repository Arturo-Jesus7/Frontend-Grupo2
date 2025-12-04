import { Routes } from '@angular/router';
import { Autenticador } from './components/autenticador/autenticador';
import { Roles } from './components/roles/roles';
import { Rolesinsert } from './components/roles/rolesinsert/rolesinsert';
import { Usuarios } from './components/usuarios/usuarios';
import { Usuariosinsert } from './components/usuarios/usuariosinsert/usuariosinsert';
import { Citas } from './components/citas/citas';
import { Citasinsert } from './components/citas/citasinsert/citasinsert';
import { Alertas } from './components/alertas/alertas';
import { Alertasinsert } from './components/alertas/alertasinsert/alertasinsert';
import { Diagnosticos } from './components/diagnosticos/diagnosticos';
import { Diagnosticosinsert } from './components/diagnosticos/diagnosticosinsert/diagnosticosinsert';
import { Historial } from './components/historial/historial';
import { Historialinsert } from './components/historial/historialinsert/historialinsert';
import { Pagos } from './components/pagos/pagos';
import { Pagosinsert } from './components/pagos/pagosinsert/pagosinsert';
import { Sesiones } from './components/sesiones/sesiones';
import { Sesionesinsert } from './components/sesiones/sesionesinsert/sesionesinsert';
import { Tecnicas } from './components/tecnicas/tecnicas';
import { Tecnicasinsert } from './components/tecnicas/tecnicasinsert/tecnicasinsert';
import { Videoconferencias } from './components/videoconferencias/videoconferencias';
import { Videoconferenciasinsert } from './components/videoconferencias/videoconferenciasinsert/videoconferenciasinsert';
import { Menu } from './components/menu/menu';
import { seguridadGuard } from './guard/seguridad-guard';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LandingPage } from './components/landing/landing';
import { Terapeutas } from './components/terapeutas/terapeutas';
import { Terapeutasinsert } from './components/terapeutas/terapeutasinsert/terapeutasinsert';
import { Reportecitasporusuario } from './components/reportecitasporusuario/reportecitasporusuario';
import { Reportecitaspormes } from './components/reportecitaspormes/reportecitaspormes';
import { Reportecitasporpendiente } from './components/reportecitasporpendiente/reportecitasporpendiente';
import { Reportemascitasagendadas } from './components/reportemascitasagendadas/reportemascitasagendadas';
import { Reporteprogresodelusuario } from './components/reporteprogresodelusuario/reporteprogresodelusuario';
import { Reportealertasporcita } from './components/reportealertasporcita/reportealertasporcita';
import { VideoCall } from './components/video-call/video-call';
export const routes: Routes = [
  { path: '', component: LandingPage },

  { path: 'login', component: Autenticador },

  {
    path: 'app/menu',
    component: Menu,
  },

  {
    path: 'roles',
    component: Roles,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Rolesinsert },
      { path: 'edits/:id', component: Rolesinsert },
    ],
  },

  {
    path: 'usuarios',
    component: Usuarios,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Usuariosinsert },
      { path: 'edits/:id', component: Usuariosinsert },
    ],
  },

  {
    path: 'terapeutas',
    component: Terapeutas,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Terapeutasinsert },
      { path: 'edits/:id', component: Terapeutasinsert },
    ],
  },

  {
    path: 'citas',
    component: Citas,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Citasinsert },
      { path: 'edits/:id', component: Citasinsert },
    ],
  },

  {
    path: 'alertas',
    component: Alertas,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Alertasinsert },
      { path: 'edits/:id', component: Alertasinsert },
    ],
  },

  {
    path: 'diagnosticos',
    component: Diagnosticos,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Diagnosticosinsert },
      { path: 'edits/:id', component: Diagnosticosinsert },
    ],
  },

  {
    path: 'historial',
    component: Historial,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Historialinsert },
      { path: 'edits/:id', component: Historialinsert },
    ],
  },

  {
    path: 'pagos',
    component: Pagos,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Pagosinsert },
      { path: 'edits/:id', component: Pagosinsert },
    ],
  },

  {
    path: 'sesiones',
    component: Sesiones,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Sesionesinsert },
      { path: 'edits/:id', component: Sesionesinsert },
    ],
  },

  {
    path: 'tecnicas',
    component: Tecnicas,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Tecnicasinsert },
      { path: 'edits/:id', component: Tecnicasinsert },
    ],
  },

  {
    path: 'videoconferencias',
    component: Videoconferencias,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Videoconferenciasinsert },
      { path: 'edits/:id', component: Videoconferenciasinsert },
    ],
  },
  {
    path: 'por-usuario',
    component: Reportecitasporusuario,
    canActivate: [seguridadGuard],
  },
  {
    path: 'por-mes',
    component: Reportecitaspormes,
    canActivate: [seguridadGuard],
  },
  {
    path: 'citas-por-pendiente',
    component: Reportecitasporpendiente,
    canActivate: [seguridadGuard],
  },
  {
    path: 'mas-citas-agendadas-por-usuario',
    component: Reportemascitasagendadas,
    canActivate: [seguridadGuard],
  },
  {
    path: 'progreso-del-usuario',
    component: Reporteprogresodelusuario,
    canActivate: [seguridadGuard],
  },
    {
    path: 'alerta-por-cita',
    component: Reportealertasporcita,
    canActivate: [seguridadGuard],
  },
  {
    path:'videocall',component:VideoCall
  },
];
