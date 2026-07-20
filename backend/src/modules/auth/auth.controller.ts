import { type Request, type Response, type NextFunction} from 'express';
import { AuthService } from './auth.service';
import { type LoginRequest } from './dto/login.request';
import { type LoginResponse } from './dto/login.response';
import { AppErrors } from '../../common/errors/app.error';


export const login_controller = async (req: Request, res: Response ) => {
  try {
    const login_request: LoginRequest = req.body;
    const service: LoginResponse = await AuthService.login_Service(login_request);
    res.status(200).json(service);
  } catch (error) {
    if(error instanceof AppErrors){
      res.status(error.statusCode).json({error:error.message});
    }else{
      res.status(500).json({ error: "Error en el servidor" });
    }
    
  }
};

