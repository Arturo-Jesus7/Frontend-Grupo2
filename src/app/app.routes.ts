import { Routes } from '@angular/router';
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
import { Tratamientos } from './components/tratamientos/tratamientos';
import { Tratamientosinsert } from './components/tratamientos/tratamientosinsert/tratamientosinsert';
import { Videoconferencias } from './components/videoconferencias/videoconferencias';
import { Videoconferenciasinsert } from './components/videoconferencias/videoconferenciasinsert/videoconferenciasinsert';
import { VideoCall } from './components/video-call/video-call';

export const routes: Routes = [
    {path:'roles',component:Roles,
        children:[
            {path:'nuevo',component:Rolesinsert},
            {path:'edits/:id',component:Rolesinsert}
        ]

    },
      {path:'usuarios',component:Usuarios,
        children:[
            {path:'nuevo',component:Usuariosinsert},
            {path:'edits/:id',component:Usuariosinsert}
        ]

    },
      {path:'citas',component:Citas,
        children:[
            {path:'nuevo',component:Citasinsert},
            {path:'edits/:id',component:Citasinsert}
        ]

    },
      {path:'alertas',component:Alertas,
        children:[
            {path:'nuevo',component:Alertasinsert},
            {path:'edits/:id',component:Alertasinsert}
        ]

    },
      {path:'diagnosticos',component:Diagnosticos,
        children:[
            {path:'nuevo',component:Diagnosticosinsert},
            {path:'edits/:id',component:Diagnosticosinsert}
        ]

    },
      {path:'historial',component:Historial,
        children:[
            {path:'nuevo',component:Historialinsert},
            {path:'edits/:id',component:Historialinsert}
        ]

    },
      {path:'pagos',component:Pagos,
        children:[
            {path:'nuevo',component:Pagosinsert},
            {path:'edits/:id',component:Pagosinsert}
        ]

    },
      {path:'sesiones',component:Sesiones,
        children:[
            {path:'nuevo',component:Sesionesinsert},
            {path:'edits/:id',component:Sesionesinsert}
        ]

    },
      {path:'tecnicas',component:Tecnicas,
        children:[
            {path:'nuevo',component:Tecnicasinsert},
            {path:'edits/:id',component:Tecnicasinsert}
        ]

    },
      {path:'tratamientos',component:Tratamientos,
        children:[
            {path:'nuevo',component:Tratamientosinsert},
            {path:'edits/:id',component:Tratamientosinsert}
        ]

    },
      {path:'videoconferencias',component:Videoconferencias,
        children:[
            {path:'nuevo',component:Videoconferenciasinsert},
            {path:'edits/:id',component:Videoconferenciasinsert}
        ]

    },{
      path:'videocall',component: VideoCall,
    },

];
