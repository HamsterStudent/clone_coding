window.addEventListener('load', ()=>{
    rollingEyes()
})

function rollingEyes(){
    var eyeball = function(selector){
        const eye = document.querySelector(selector);
        const iris = eye.querySelector('.iris');
        const eyeArea = eye.getBoundingClientRect();
    
        const rolling = function( mouseX, mouseY ){
            const angle = Math.atan2( mouseY - (eyeArea.y + eyeArea.height * 0.5) , mouseX - (eyeArea.x + eyeArea.width * 0.5));
            // console.log(angle)
            iris.style.transform = 'rotate(' +( 180 * angle / Math.PI - 90) + 'deg)';
        };
        return{
            rolling: rolling
        };
    };

    var eye01 = eyeball('.eye01');
    var eye02 = eyeball('.eye02');
    


window.addEventListener('mousemove', function(e){
    eye01.rolling(e.pageX, e.pageY)
    eye02.rolling(e.pageX, e.pageY)
})
}
