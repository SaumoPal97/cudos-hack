import dirtImg from "./images/dirt.jpg";
import grassImg from "./images/grass.jpg";
import glassImg from "./images/glass.png";
import logImg from "./images/log.jpg";
import woodImg from "./images/wood.png";
import blockImg from "./images/block.png";
import appleImg from "./images/apple.jpeg";
import newtonImg from "./images/newton.jpeg";
import { TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";

export const dirt = new TextureLoader().load(dirtImg);
export const grass = new TextureLoader().load(grassImg);
export const glass = new TextureLoader().load(glassImg);
export const wood = new TextureLoader().load(woodImg);
export const log = new TextureLoader().load(logImg);
export const block = new TextureLoader().load(blockImg);
export const nft1 = new TextureLoader().load(
  "https://bafybeiczeprpyktbhkjpk5eptkimpcgrikunfg4qiqcivhzmqhx5seqtye.ipfs.infura-ipfs.io/"
);
export const nft2 = new TextureLoader().load(
  "https://bafybeidmom45vu5vwrm2rqu6vxruy5f7wrugllhqfufhqmm6dknpwbbo3a.ipfs.infura-ipfs.io/"
);
export const apple = new TextureLoader().load(appleImg);
export const newton = new TextureLoader().load(newtonImg);

dirt.magFilter = NearestFilter;
dirt.minFilter = LinearMipMapLinearFilter;
grass.magFilter = NearestFilter;
grass.minFilter = LinearMipMapLinearFilter;
glass.magFilter = NearestFilter;
glass.minFilter = LinearMipMapLinearFilter;
wood.magFilter = NearestFilter;
wood.minFilter = LinearMipMapLinearFilter;
log.magFilter = NearestFilter;
log.minFilter = LinearMipMapLinearFilter;
block.magFilter = NearestFilter;
block.minFilter = LinearMipMapLinearFilter;
nft1.magFilter = NearestFilter;
nft1.minFilter = LinearMipMapLinearFilter;
nft2.magFilter = NearestFilter;
nft2.minFilter = LinearMipMapLinearFilter;
apple.magFilter = NearestFilter;
apple.minFilter = LinearMipMapLinearFilter;
newton.magFilter = NearestFilter;
newton.minFilter = LinearMipMapLinearFilter;
