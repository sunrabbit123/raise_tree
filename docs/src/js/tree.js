import { Branch } from './branch.js';
import { TREE_DEPTH } from './config.js';

export class Tree {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = []; // 가지들을 담을 공간
    this.depth = TREE_DEPTH;
    
    this.cntDepth = 0;
    this.animation = null;
    
    this.init();
  }

  init() {
    for (let i = 0; i < this.depth; i++){ this.branches.push([]);}
    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw(this.ctx);
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;
    
    const len = depth === 0 ? this.random(10, 13) : this.random(0, 11);
    const depthConverse = this.depth - depth;
    
    const endX = startX + this.cos(angle) * len * depthConverse;
    const endY = startY + this.sin(angle) * len * depthConverse;
    const nextDepth = depth + 1;
    
    this.branches[depth].push(new Branch(startX, startY, endX, endY, depthConverse));
    
    this.createBranch(endX, endY, angle - this.random(15, 23), nextDepth);
    this.createBranch(endX, endY, angle + this.random(15, 23), nextDepth);
  }

  draw() {
    if(this.cntDepth === this.depth){ cancelAnimationFrame(this.animation); }
    
    for (let i = this.cntDepth; i < this.branches.length; i++) {
      let pass = true;

      for (let j = 0; j < this.branches[i].length; j++) {
        pass = this.branches[i][j].draw(this.ctx);
      }

      if (!pass) break;
      this.cntDepth++;
    }
    
    this.animation = requestAnimationFrame(this.draw.bind(this));
  }
  
  cos(angle){ return Math.cos(this.degToRad(angle)); }
  sin(angle){ return Math.sin(this.degToRad(angle)); }
  degToRad(angle){ return (angle / 180.0) * Math.PI; }
  random(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
}
