
// 全局变量定义
    var canvas=document.getElementById('canvas')
    var earser=document.getElementById('eraser')
    var brush=document.getElementById('brush')
    var ctx=canvas.getContext('2d')
    ctx.fillStyle = 'blue';
ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.lineWidth=4
    var lastPoint={x:undefined, y:undefined}
    var liTags=document.getElementById('colors').getElementsByTagName('li')
    var colorHash={
        0:'black',
        1:'red',
        2:'blue',
        3:'green',
        4:'yellow'
    }
    var indexOfWhoActive =0
    var using = false  
    var eraserEnabled=false
    setCanvasSize()
//特效检查 
    if(document.body.ontouchstart!==undefined){
        document.body.ontouchstart=function(e){
            e.preventDefault()
        }
        listenTouch(canvas)
    }else{
        listenMouse(canvas)
    }
  
//绑定监听事件    

for(let i=0; i<liTags.length; i++){
    liTags[i].onclick=function(){
        liTags[indexOfWhoActive].classList.remove('active')
        indexOfWhoActive=i
        console.log(i)
        liTags[i].classList.add('active')
        ctx.strokeStyle=colorHash[i]  
    }
}
thick.onclick=function(){
    ctx.lineWidth=6
    thick.classList.add('active')
    thin.classList.remove('active')

}
thin.onclick=function(){
    ctx.lineWidth=4
    thick.classList.remove('active')
    thin.classList.add('active')

}
    clear.onclick=function(){
        ctx.clearRect(0,0,canvas.width,canvas.height)      
    }

    download.onclick=function(){
        var url =canvas.toDataURL("image/png")
        var a =document.createElement('a')
        document.body.appendChild(a)
        a.href=url
        a.download='imgFromCanvas'
        a.target='_blank'
        a.click()
    }
    window.onresize=function(){
        setCanvasSize()
    }
    eraser.onclick=function(){
        eraserEnabled=true
        eraser.classList.add('active')
        brush.classList.remove('active')
        
    }
    brush.onclick=function(){
        eraserEnabled=false
        brush.classList.add('active')
        eraser.classList.remove('active')
    }

//定义函数
function listenTouch(canvas){
    
    canvas.ontouchstart=function(e){
        var x =e.touches[0].clientX
        var y =e.touches[0].clientY
        using=true
            if(eraserEnabled){
                ctx.clearRect(x,y,20,20)
            }else{
            lastPoint={x:x, y:y}
            }
 
        }
        canvas.ontouchmove=function(e){
            var x =e.touches[0].clientX
            var y =e.touches[0].clientY
            if(!using){return}
            if(eraserEnabled){
                ctx.clearRect(x,y,20,20)
            }else{
                var newPoint={x:x, y:y}
                drawLine(lastPoint.x,lastPoint.y,x,y)
                lastPoint=newPoint
            }
        }
        canvas.ontouchend=function(e){
            using=false
        }
}
    
    
    function listenMouse(canvas){
        canvas.onmousedown=function(e){
        var x =e.clientX
        var y =e.clientY
        using=true
            if(eraserEnabled){
                ctx.clearRect(x,y,20,20)
            }else{
            lastPoint={x:x, y:y}
            }
 
        }
        canvas.onmousemove=function(e){
            var x =e.clientX
            var y =e.clientY
            
            if(!using){return}
            if(eraserEnabled){
                ctx.clearRect(x,y,20,20)
            }else{
                var newPoint={x:x, y:y}
                drawLine(lastPoint.x,lastPoint.y,x,y)
                lastPoint=newPoint
            }
        }
        canvas.onmouseup=function(e){
            using=false
        }
    }

    function setCanvasSize(){
        var pageWidth=document.documentElement.clientWidth
        var pageHeight=document.documentElement.clientHeight
        canvas.width=pageWidth
        canvas.height=pageHeight
    }
    function drawCircle(x,y){
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, 2 * Math.PI)
        ctx.fill()
    }
    function drawLine(beforeX,beforeY,afterX,afterY){
        ctx.beginPath()
        ctx.moveTo(beforeX,beforeY)
        ctx.lineTo(afterX,afterY)
        ctx.closePath()
        ctx.stroke()
    }
