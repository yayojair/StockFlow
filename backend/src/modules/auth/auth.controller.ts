import { type Request, type Response } from 'express';
import { AppErrors } from '../../common/errors/app.error';
import { type LoginRequest } from '../dto/login/login.request';
import { type LoginResponse } from '../dto/login/login.response';
import { AuthService } from './auth.service';


export const login_controller = async (req: Request, res: Response ) => {
  try {
    const login_request: LoginRequest = req.body;
    const service: LoginResponse = await AuthService.login_Service(login_request);
    res.status(200).json({statusCode:200, user:service});
  } catch (error) {
    if(error instanceof AppErrors){
      res.status(error.statusCode).json({error:error.message});
    }else{
      res.status(500).json({ error: "Error en el servidor" });
    }
    
  }
};

