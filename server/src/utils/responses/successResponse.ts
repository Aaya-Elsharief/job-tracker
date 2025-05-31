import { Response } from "express";
import  HttpStatus  from "http-status";

export const SuccessResponse = ( res : Response, data: any = {}) => {
  res.status( HttpStatus.OK).json( {
      statusCode : HttpStatus.OK ,
      status: true,
      data,
    });
  };