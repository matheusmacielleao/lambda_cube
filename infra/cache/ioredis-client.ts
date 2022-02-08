import *  as Redis from "ioredis";

export const ioredisClient = () => {return new Redis()};