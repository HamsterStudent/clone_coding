// (function() {})(); 와 같은 형태
// 이렇게 하는 이유? : 전역변수 사용을 피하려고 / 이름간 충돌이 발생할 수 있음 / 자바스크립트 자체에서 전역변수 사용은 바람직하지 않음
(() => {

    let yOffset = 0;  //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅( 서로 다른 기기에 전부 대응하기 위해 )
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for ( let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
    }
    
    function scrollLoop(){ //애니메이션 활성화시킬 씬이 몇번째 씬인지 알아내는
        // console.log(yOffset);
        prevScrollHeight = 0; //scrollHeight의 값 누적을 막기 위해
        for(let i = 0; i < currentScene; i++) {
            // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        }
        if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return //스크롤시 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지(모바일)
            currentScene--;
        }

        console.log(currentScene)
    }


    window.addEventListener( 'resize', setLayout )

    window.addEventListener( 'scroll', ()=> { //스크롤은 복잡하게 동작하기 때문에 여러 함수 사용
        yOffset = window.pageYOffset;
        scrollLoop();

    });

    setLayout();
    
})();