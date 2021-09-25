// (function() {})(); 와 같은 형태
// 이렇게 하는 이유? : 전역변수 사용을 피하려고 / 이름간 충돌이 발생할 수 있음 / 자바스크립트 자체에서 전역변수 사용은 바람직하지 않음
(() => {

    let yOffset = 0;  //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
    let enterNewScene = false; //새로운 씬이 시작되는 순간 true

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅( 서로 다른 기기에 전부 대응하기 위해 )
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity: [0, 1]
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

        //새로고침해도 스크롤 섹션이 그 위치에 있게 세팅
        yOffset = window.pageYOffset;
        let totalScrollheight = 0;
        for(let i = 0; i < sceneInfo.length; i++){
            totalScrollheight += sceneInfo[i].scrollHeight;
            if(totalScrollheight >=  yOffset){
                currentScene = i;
                break;
            }
        }
        //스크롤 될 때 id값을 show-scene-현재색션값 으로 설정
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    
    function scrollLoop(){ //애니메이션 활성화시킬 씬이 몇번째 씬인지 알아내는 함수
        enterNewScene = false;
        prevScrollHeight = 0; //scrollHeight의 값 누적을 막기 위해
        for(let i = 0; i < currentScene; i++) {
            // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        //스크롤이 일정 크기 이상이면 다음 씬으로 넘어감
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true; 
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        //스크롤이 일정 크기 이하라면 이전 씬으로 넘어감
        if(yOffset < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return //스크롤시 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        // console.log(currentScene)

        if(enterNewScene) return;
        playAnimation();
    }

    function calcValues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤 섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrollRatio * (values[1] - values[0]) + values[0];

        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        console.log(currentScene);

        // console.log( currentScene, currentYOffset);

        switch (currentScene) {
            case 0:
                // console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in);
                break;
            case 1:
                // console.log('1 play');
                break;
            case 2:
                // console.log('2 play');
                break;
            case 3:
                // console.log('3 play');
                break;
        }
    }

    

    window.addEventListener( 'scroll', ()=> { //스크롤은 복잡하게 동작하기 때문에 여러 함수 사용
        yOffset = window.pageYOffset;
        scrollLoop();

    });
    
    window.addEventListener('load', setLayout);
    window.addEventListener( 'resize', setLayout )


})();