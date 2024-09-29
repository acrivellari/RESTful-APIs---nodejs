import { Request, Response } from "express";
import { dbConnection } from "../database/connection";
import { getUserByUsername, User } from "../database/users";
import { databaseError, badFormatPayload, wrongCredentials, notFound } from "../database/errors";
import { sha3_256 } from "js-sha3";
import { generateToken, verifyToken } from "../model/jwtUtils";


export async function getUserInfo(request: Request, response: Response) 
{
    if (request.headers.authorization == undefined) {
        response.status(401).json({payload:null, error: 'Token not provided'});
        return;
    }
    const token = request.headers.authorization.split(' ')[1];
    const username = verifyToken(token);
    if (username == null) {
        response.status(401).json();
        return;
    }
    
    console.log("API /api/user");
    getUserByUsername(dbConnection, username).then(
        (user) => {
            if (user == null) {
                response.status(404).json({ 'payload': null, 'error': notFound });
                return;
            }
            const payload = { 'username': user.Username(), 'name': user.Name(), 'surname': user.Surname(), 'email': user.Email() };
            response.status(200).json({ 'payload': payload, 'error': null});
        },
        (_err) => response.status(400).json({ 'payload': null, 'error': databaseError })
    );

}

export async function login(request: Request, response: Response) : Promise<void>
{
    console.log("API /api/user/login ");
    if (!('username' in request.body) ||  !('password' in request.body)) {
        response.status(400);
        response.send({ 'payload': null, 'error': badFormatPayload});
        return;
    } 
    getUserByUsername(dbConnection, request.body.username).then(
        (user) => {
            if (user !== null && user.Username() == request.body.username && user.Password() == sha3_256(request.body.password)) {
                const token = generateToken(user);
                if (token != null)
                {
                    response.status(200).json({ 'payload': { 'token': token }, error: null });  
                    return;
                }
                response.status(500).json();
                return;
            } 
            response.status(401).json({ 'payload': null, 'error': wrongCredentials });
        },
        (err) => {
            response.status(400).json({ 'payload': null, 'error': databaseError});
            console.log(err);
        }
    );
}