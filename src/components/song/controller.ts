import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { url } from "inspector";

const prisma = new PrismaClient();

export const getSong = async (req:Request, res:Response): Promise<void> =>{
    if (!req.body.tokendata) {
        try{
            const element = await prisma.songs.findMany({
                where: {
                    private: false
                }
            });
    
            res.status(200).json({
                ok:true,
                login: false,
                message: "You only can see the public songs.",
                results: element,
            });

        }catch(error){
            res.status(500).json({
                ok:false,
                login: false,
                message: error,
            });
            console.log(error)
        }
    } else{
        try{
            const element = await prisma.songs.findMany();
    
            res.status(200).json({
                ok:true,
                results: element,
                
            });
        }
    
        catch(error){
            res.status(500).json({
                ok:false,
                message: error,
            });
            console.log(error)
        }
    }
    

};

export const postSong = async (req:Request, res:Response): Promise<void> =>{
    try {
        const data = req.body;

        let element;

        if (data.private) {
            element = await prisma.songs.create({
                data: {
                    name: data.name,
                    artist: data.artist,
                    album: data.album,
                    year: data.year,
                    genere: data.genere,
                    duration: data.duration,
                },
                select: {
                    private: true
                }
            });
        } else {
            element = await prisma.songs.create({
                data: {
                    name: data.name,
                    artist: data.artist,
                    album: data.album,
                    year: data.year,
                    genere: data.genere,
                    duration: data.duration,
                    private: data.private
                }
            });
        }

        res.status(201).json({
            ok:true,
            results:element,
        });


    }catch(error){
        res.status(500).json({
            ok:false,
            message: error,
        });
        console.log(error)
    };
};

export const getIdSong = async (req: Request, res:Response) => {
    if (!req.body.tokendata){
        try {
            const urlId = req.params.id;
            const element = await prisma.songs.findUnique({
                where: {
                    id: Number(urlId),
                }
            });

            if (element?.private === false) {
                res.status(200).json({
                    ok:true,
                    login: false,
                    message: "Public song.",
                    song: element,
                });
            } else {
                res.status(500).json({
                    ok:false,
                    login: false,
                    message: "Error.You only can see the public songs.",
                });
            };

        } catch (error) {
            res.status(500).json({
                ok:false,
                message: error,
            });
        };
    } else {
        try{
            const urlId = req.params.id;
            const element = await prisma.songs.findUnique({
                where: {
                    id: Number(urlId),
                }
            });
    
            res.status(200).json({
                ok:true,
                results: element
            });
        }catch(error){
            res.status(500).json({
                ok:false,
                message: error,
            });
        };
    }
    

};