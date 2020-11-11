const cellSize=30,SIZE=50,lerp=(e,t,n)=>e*(1-n)+t*n;let canvas,ctx,stage,output,rootElement,numCirclesX,numCirclesY,circles,circle1,circle2,pointA,pointB,fill="#E0C3FC";function init(){rootElement=document.documentElement;let e=window.getComputedStyle(rootElement);fill=e.getPropertyValue("--c2"),canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),stage=new createjs.Stage("canvas"),stage.enableMouseOver(10),createjs.Touch.enable(stage),stage.mouseMoveOutside=!0,handleResize()}function addCircle(e,t,n,i){let a=new createjs.Shape;return a.graphics.beginFill(i).drawCircle(0,0,n),a.x=e,a.y=t,a.name="circle",stage.addChild(a),a}function makeCircles(){circles=[];for(let e=0;e<numCirclesY;e+=1)for(let t=0;t<numCirclesX;t+=1){const n=addCircle(30*t+15,30*e+15,2,fill);circles.push(n)}}function addControl(e,t){let n=addCircle(e,t,10,"black");return n.on("pressmove",drag),n.cursor="grab",n.graphics.endFill(),n.graphics.setStrokeStyle(1),n.graphics.beginStroke("#FFFFFF"),n.graphics.drawCircle(0,0,10),n}function loop(){circles.forEach(e=>{let t=project(new createjs.Point(e.x,e.y),new createjs.Point(pointA.x,pointA.y),new createjs.Point(pointB.x,pointB.y)),n=(i=0,a=21,r=t.t,i*(1-r)+a*r);var i,a,r;e.graphics.clear(),e.graphics.beginFill(fill).drawCircle(0,0,n)})}function drag(e){e.target.x=e.stageX,e.target.y=e.stageY,loop(),stage.update()}function sizeCanvas(){stage.canvas.width=window.innerWidth,stage.canvas.height=window.innerHeight}function handleResize(){stage.removeAllChildren(),sizeCanvas(),numCirclesX=Math.ceil(innerWidth/30),numCirclesY=Math.ceil(innerHeight/30),makeCircles(),pointA=addControl(canvas.width/3,canvas.height/5),pointB=addControl(2*canvas.width/3,4*canvas.height/5),loop(),stage.update()}function throttled(e){let t=!1;return n=>{t||(window.requestAnimationFrame(()=>{e(n),t=!1}),t=!0)}}function project(e,t,n){var i=n.x-t.x,a=n.y-t.y,r=i*i+a*a,c=(e.x-t.x)*i+(e.y-t.y)*a,l=Math.min(1,Math.max(0,c/r));return c=(n.x-t.x)*(e.y-t.y)-(n.y-t.y)*(e.x-t.x),{point:{x:t.x+i*l,y:t.y+a*l},left:c<1,dot:c,t:l}}window.addEventListener("resize",throttled(handleResize));