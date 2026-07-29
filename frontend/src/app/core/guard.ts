import { inject } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

export const authGuard = () => {
    const token_service = inject(TokenService);
    const router = inject(Router);
    if(token_service.obtenerToken()){
        return true;
    }
    router.navigate(['/login']);
    return false;
}
