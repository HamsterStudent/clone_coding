// 전역변수 사용을 회피하기 위해서 즉시실행 익명 함수를 만든다.
// 화살표함수를 만들고 -> 괄호로 감싸준 후 -> 실행
// 내부에 함수를 만들면 지역변수가 되어 밖에서 실행이 안됨. 누구나 접근할 수 있는 변수(전역변수)를 쓰는 건 충돌 위험이 있어서 피하는 게 좋음.
(() => {

    const actions = {
        birdFlies(key){
            if(key){
                document.querySelector('[data-num="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            }else{
                document.querySelector('[data-num="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key){
            if(key){
                document.querySelector('[data-num="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            }else{
                document.querySelector('[data-num="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    const io = new IntersectionObserver((enteries, observer)=>{
        ioIndex = enteries[0].target.dataset.num*1
        //index는 숫자로 바꾸는 게 편하기 때문에 *1을 해줌
        // console.log(ioIndex)
    });
    //어떠한 요소가 눈에 보이는 지 아닌지 체크하는 역할

    for(let i=0; i<stepElems.length; i++){
        io.observe(stepElems[i]);
        // stepElems[i].setAttribute('data-index', i);
        // graphicElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.num = i;
        graphicElems[i].dataset.num = i;
        //리스트 두개를 한번에 쓰려면 리스트 두개의 값이 같아야 함.. 안그럼 에러가난다
    }

    function activate(action){
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);
        }
    }

    function inactivate(action){
        currentItem.classList.remove('visible')
        if(action){
            actions[action](false);
        }
    }


    window.addEventListener('scroll', ()=>{
        let step;
        let boundingRect;

        // for(let i=0; i<stepElems.length; i++){
        for(let i= ioIndex-1; i < ioIndex+2; i++){
            step = stepElems[i];

            if(!step)continue;

            boundingRect = step.getBoundingClientRect();
            // console.log(boundingRect.top);

            if(boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8){
                // console.log(step.dataset.num);

                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.num]
                activate(currentItem.dataset.action);
                }
        }

    });

    window.addEventListener('load', ()=>{
        setTimeout(()=>scrollTo(0, 0), 100);
    })

    activate();

})();
