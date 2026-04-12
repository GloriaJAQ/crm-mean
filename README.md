# Sistema CRM Web Seguro — MEAN Stack

## URL del sistema
- Frontend: https://crm-frontend-sigma-five.vercel.app/
- Backend API: https://crm-backend-9vuwbo5dt-gloriajaqs-projects.vercel.app/

## Credenciales de prueba
| Rol   | Email           | Password  |
|-------|-----------------|-----------|
| Admin | admin@crm.com   | Admin123* |
| User  | user@test.com   | User123*  |
| Guest | guest@test.com  | Guest123* |

## API Endpoints

### Autenticación (pública)
| Método | Endpoint              | Body                              |
|--------|-----------------------|-----------------------------------|
| POST   | /api/auth/register    | nombre, email, password, rol      |
| POST   | /api/auth/login       | email, password → devuelve token  |

### Colecciones protegidas (requieren Bearer TOKEN)
| Método | Endpoint                | Auth mínima |
|--------|-------------------------|-------------|
| GET    | /api/clientes           | guest       |
| POST   | /api/clientes           | user        |
| PUT    | /api/clientes/:id       | user        |
| DELETE | /api/clientes/:id       | admin       |

> El mismo patrón aplica para: /api/productos, /api/ventas, /api/actividades, /api/tickets, /api/notificaciones, /api/users

## Stack
- MongoDB Atlas + Mongoose
- Express.js + Node.js
- Angular 17
- JWT + bcryptjs
- Vercel (deploy)

## Branching strategy
main ← develop ← feature/backend-auth
                ← feature/backend-crud
                ← feature/frontend-angular
                ← feature/deploy-config
                ← feature/docs
                ← feature/testing
