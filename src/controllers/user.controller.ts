import { Request, Response, NextFunction } from "express";
import { registerUsers } from "../services";

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password, email, last_name, first_name } = req.body;
  
     await registerUsers({
      username,
        password,
        email,
        last_name,
        first_name
     })
  
      res.status(201).json({ url: 'register'});
      
    } catch (error) {
      next(error);
    }
  };