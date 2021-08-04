// 전역변수 사용을 회피하기 위해서 즉시실행 익명 함수를 만든다.
// 화살표함수를 만들고 -> 괄호로 감싸준 후 -> 실행
// 내부에 함수를 만들면 지역변수가 되어 밖에서 실행이 안됨. 누구나 접근할 수 있는 변수(전역변수)를 쓰는 건 충돌 위험이 있어서 피하는 게 좋음.
(() => {
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');

    for(let i=0; i<stepElems.length; i++){
        // stepElems[i].setAttribute('data-index', i);
        // graphicElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.num = i;
        graphicElems[i].dataset.num = i;
    }

    window.addEventListener('scroll', ()=>{
        let step;
        let boundingRect;

        for(let i=0; i<stepElems.length; i++){
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            console.log(boundingRect);
        }
    });

})();
