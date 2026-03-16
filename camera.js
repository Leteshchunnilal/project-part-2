class Camera{
  constructor(c){
    this.obj = document.querySelector(c);
    this.dy = 0.1;
    this.jumping = false;
    this.landed = true;
  }
  initJump(){
    this.jumping = true;
    this.landed = false;
    this.y = this.obj.object3D.position.y;
  }
  jump(){
    if(this.jumping){
      this.dy -= 0.002;
      this.y += camera.dy;
      this.obj.object3D.position.y = this.y;
      if(this.dy < 0){
        this.jumping = false;
      }     
    }else if(!this.jumping && !this.landed && Math.abs(this.obj.body.velocity.y) <= 0.001){
      this.landed = true;
      this.dy = 0.1;
    }
  }
}